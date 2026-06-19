// ==================== GENERADOR DE PLAN SEMANAL KETO - KetoCore ====================
// Versión simplificada que lee directamente de KETO_RECIPES

var WEEKLY_PLAN_CONFIG = {
  daysPerWeek: 7,
  mealsPerDay: ['desayuno', 'almuerzo', 'cena', 'snacks'],
  mealDistribution: { desayuno: 0.20, almuerzo: 0.35, cena: 0.35, snacks: 0.10 }
};

// INGREDIENTES NO-KETO (excluir del generador)
var NON_KETO_INGREDIENTS = [
  'arroz', 'arroz integral', 'arroz jazmin', 'arroz bomba', 'fideos', 'pasta', 
  'pasta integral', 'espaghetti', 'fideos arroz', 'lentejas', 'frijoles', 
  'frijoles negros', 'frijoles rojos', 'garbanzos', 'habas', 'edamame',
  'pan', 'pan integral', 'pan rallado', 'tortilla grande', 'tortilla harina',
  'platano', 'mango', 'piña', 'papaya', 'uva', 'manzana', 'pera', 'higo', 'dátil',
  'miel', 'azucar', 'azúcar', 'jarabe', 'maicena', 'polenta', 'harina trigo',
  'galletas arroz', 'laminas lasaña', 'papa', 'patata', 'batata', 'camote',
  'pasas', 'salsa gochujang', 'salsa teriyaki', 'ketchup', 'barbacoa'
];

var ketoCache = {};

function isRecipeKetoSafe(recipe) {
  var key = recipe.id || recipe.title;
  if (key && ketoCache[key] !== undefined) return ketoCache[key];
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    if (key) ketoCache[key] = true;
    return true;
  }
  for (var i = 0; i < recipe.ingredients.length; i++) {
    var ingName = (recipe.ingredients[i].name || recipe.ingredients[i].nombre || '').toLowerCase();
    for (var j = 0; j < NON_KETO_INGREDIENTS.length; j++) {
      if (ingName.indexOf(NON_KETO_INGREDIENTS[j]) >= 0) {
        if (key) ketoCache[key] = false;
        return false;
      }
    }
  }
  if (key) ketoCache[key] = true;
  return true;
}

// Obtener perfil del usuario
function getUserMacroProfile() {
  var macros = safeParseJSON(localStorage.getItem("keto_macros"), {});
  var profile = safeParseJSON(localStorage.getItem("keto_profile"), {});
  
  return {
    calories: parseInt(macros.calories) || 1800,
    protein: parseInt(macros.protein) || 140,
    fat: parseInt(macros.fat) || 140,
    carbs: parseInt(macros.carbs) || 20,
    netCarbs: Math.max(5, (parseInt(macros.carbs) || 20) - 5),
    experience: profile.experience || 'intermedio'
  };
}

// Obtener despensa
function getPantry() {
  return safeParseJSON(localStorage.getItem("despensa"), {});
}

// Cache para recetas por tipo (no cambian en runtime)
var recipesCache = {};

function getRecipesByMealType(mealType) {
  if (recipesCache[mealType]) return recipesCache[mealType];
  
  var normalized = mealType === 'snacks' ? 'snack' : mealType;
  if (typeof KETO_RECIPES === 'undefined') {
    console.error('KETO_RECIPES NO ESTÁ DEFINIDO');
    return [];
  }
  var recipes = Object.keys(KETO_RECIPES)
    .filter(function(key) {
      var rt = KETO_RECIPES[key].mealType;
      return rt === mealType || rt === normalized;
    })
    .filter(function(key) {
      return isRecipeKetoSafe(KETO_RECIPES[key]);
    })
    .map(function(key) {
      var r = KETO_RECIPES[key];
      return {
        id: key,
        title: r.title,
        calories: r.calories || 0,
        protein: r.protein || 0,
        fat: r.fat || 0,
        carbs: r.carbs || 0,
        netCarbs: r.netCarbs || r.carbs || 0,
        mealType: r.mealType,
        ingredients: r.ingredients || []
      };
    });
  recipesCache[mealType] = recipes;
  return recipes;
}

// Obtener días de la semana
function getWeekDays() {
  var today = new Date();
  var dayOfWeek = today.getDay();
  var monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek <= 0 ? 6 : dayOfWeek - 1));
  
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// Calcular targets para cada comida
function calculateMealTargets(profile) {
  var targets = {};
  var totalCal = profile.calories;
  var totalProt = profile.protein;
  var totalFat = profile.fat;
  var totalCarbs = profile.carbs;
  
  Object.keys(WEEKLY_PLAN_CONFIG.mealDistribution).forEach(function(meal) {
    var pct = WEEKLY_PLAN_CONFIG.mealDistribution[meal];
    targets[meal] = {
      calories: Math.round(totalCal * pct),
      protein: Math.round(totalProt * pct),
      fat: Math.round(totalFat * pct),
      carbs: Math.round(totalCarbs * pct),
      netCarbs: Math.round(Math.max(1, (totalCarbs * pct) - 1))
    };
  });
  return targets;
}

// Variables globales para evitar repeticiones
var recentRecipes = [];

// Seleccionar mejor receta (con integración UserLearning)
function selectBestRecipeForMeal(mealType, target, pantry, usedRecipes) {
  var recipes = getRecipesByMealType(mealType);
  
  // Si no hay recetas, usar fallback simple
  if (!recipes || recipes.length === 0) {
    return getFallbackRecipe(mealType);
  }
  
  // Agregar recently used a usedRecipes
  recentRecipes.forEach(function(id) { usedRecipes[id] = true; });
  
  // Filtrar recetas que匹配an los macros objetivo
  var candidates = recipes.filter(function(r) {
    if (usedRecipes && usedRecipes[r.id]) return false;
    // Aceptar recetas dentro del 30% de los macros objetivo
    var calDiff = Math.abs(r.calories - target.calories) / target.calories;
    return calDiff < 0.5;
  });
  
  // Si no hay candidates dentro del rango, usar todos menos los usados
  if (candidates.length === 0) {
    candidates = recipes.filter(function(r) { return !usedRecipes || !usedRecipes[r.id]; });
  }
  
  // Si aún no hay, usar cualquier receta menos las más recientes
  if (candidates.length === 0) {
    candidates = recipes;
  }
  
  // -- Integración UserLearning: filtrar y ordenar por preferencias --
  var ul = (typeof window !== 'undefined' && window.UserLearning) ? window.UserLearning : null;
  
  if (ul) {
    // Excluir recetas fuertemente disliked (score < 20) si hay alternativas
    var scored = candidates.map(function(r) {
      return { receta: r, score: ul.calculateRecipeScore(r) };
    });
    var good = scored.filter(function(s) { return s.score >= 20; });
    if (good.length >= 2) {
      candidates = good.map(function(s) { return s.receta; });
    }
    
    // Ordenar combinando score de usuario + cercanía a macros
    candidates.sort(function(a, b) {
      var aScore = ul.calculateRecipeScore(a);
      var bScore = ul.calculateRecipeScore(b);
      var aMacro = Math.abs(a.calories - target.calories) + Math.abs(a.protein - target.protein) * 2;
      var bMacro = Math.abs(b.calories - target.calories) + Math.abs(b.protein - target.protein) * 2;
      // 60% preferencia usuario, 40% macros
      return (bScore - aScore) * 0.6 + (aMacro - bMacro) * 0.4 + (Math.random() - 0.5) * 20;
    });
  } else {
    // Sin UserLearning: orden original por macros
    candidates.sort(function(a, b) {
      var aDiff = Math.abs(a.calories - target.calories) + Math.abs(a.protein - target.protein) * 2;
      var bDiff = Math.abs(b.calories - target.calories) + Math.abs(b.protein - target.protein) * 2;
      return aDiff - bDiff + (Math.random() - 0.5) * 100;
    });
  }
  
  var choice = candidates[0];
  console.log('Elegida para ' + mealType + ':', choice ? choice.title : 'NULL');
  if (choice) recentRecipes.push(choice.id);
  if (recentRecipes.length > 40) recentRecipes = recentRecipes.slice(recentRecipes.length - 40);
  
  return choice;
}

function getFallbackRecipe(mealType) {
  var fallbacks = {
    desayuno: [
      { id: 'fb-desayuno-1', title: 'Huevos con Aguacate', calories: 450, protein: 18, fat: 38, carbs: 8, netCarbs: 4 },
      { id: 'fb-desayuno-2', title: 'Tortilla Española', calories: 320, protein: 22, fat: 24, carbs: 6, netCarbs: 3 },
      { id: 'fb-desayuno-3', title: 'Huevos con Bacon', calories: 380, protein: 20, fat: 32, carbs: 2, netCarbs: 1 }
    ],
    almuerzo: [
      { id: 'fb-almuerzo-1', title: 'Pollo con Brócoli', calories: 450, protein: 45, fat: 20, carbs: 8, netCarbs: 4 },
      { id: 'fb-almuerzo-2', title: 'Ensalada César', calories: 380, protein: 15, fat: 32, carbs: 6, netCarbs: 3 },
      { id: 'fb-almuerzo-3', title: 'Atún con Aguacate', calories: 420, protein: 35, fat: 28, carbs: 4, netCarbs: 2 }
    ],
    cena: [
      { id: 'fb-cena-1', title: 'Bistec con Espinacas', calories: 480, protein: 42, fat: 32, carbs: 4, netCarbs: 2 },
      { id: 'fb-cena-2', title: 'Salmón al Horno', calories: 420, protein: 38, fat: 26, carbs: 2, netCarbs: 1 },
      { id: 'fb-cena-3', title: 'Pollo al Ajillo', calories: 390, protein: 40, fat: 22, carbs: 4, netCarbs: 2 }
    ],
    snacks: [
      { id: 'fb-snacks-1', title: 'Almendras con Queso', calories: 200, protein: 8, fat: 18, carbs: 4, netCarbs: 2 },
      { id: 'fb-snacks-2', title: 'Huevos Cocidos', calories: 140, protein: 12, fat: 10, carbs: 1, netCarbs: 0 },
      { id: 'fb-snacks-3', title: 'Aguacate con Huevo', calories: 220, protein: 6, fat: 20, carbs: 4, netCarbs: 2 }
    ]
  };
  
  var options = fallbacks[mealType] || fallbacks.snacks;
  return options[Math.floor(Math.random() * options.length)];
}

// Generar plan de un día
function generateDayPlan(dateKey, profile, pantry) {
  var dayPlan = { date: dateKey, meals: {}, dayMacros: { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 } };
  var usedRecipes = {};
  var mealTargets = calculateMealTargets(profile);
  
  WEEKLY_PLAN_CONFIG.mealsPerDay.forEach(function(mealType) {
    var target = mealTargets[mealType];
    var recipe = selectBestRecipeForMeal(mealType, target, pantry, usedRecipes);
    
    if (recipe) {
      dayPlan.meals[mealType] = { recipe: recipe };
      dayPlan.dayMacros.calories += recipe.calories;
      dayPlan.dayMacros.protein += recipe.protein;
      dayPlan.dayMacros.fat += recipe.fat;
      dayPlan.dayMacros.carbs += recipe.carbs;
      dayPlan.dayMacros.netCarbs += recipe.netCarbs;
    }
  });
  
  return dayPlan;
}

// Generar plan semanal completo
function generateWeeklyPlan(options) {
  console.log('===== GENERANDO PLAN SEMANAL =====');
  console.log('KETO_RECIPES existe:', typeof KETO_RECIPES !== 'undefined');
  
  var profile = getUserMacroProfile();
  console.log('Perfil usuario:', profile);
  var pantry = getPantry();
  
  // Limpiar historial para nueva generación
  recentRecipes = [];
  
  var weekPlan = {
    generatedAt: new Date().toISOString(),
    profile: profile,
    days: {},
    shoppingList: {},
    totalMacros: { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 }
  };
  
  var weekDays = getWeekDays();
  
  weekDays.forEach(function(dateKey) {
    var dayPlan = generateDayPlan(dateKey, profile, pantry);
    weekPlan.days[dateKey] = dayPlan;
    
    // Agregar a totales
    Object.keys(dayPlan.meals).forEach(function(mealType) {
      var meal = dayPlan.meals[mealType];
      if (meal && meal.recipe) {
        weekPlan.totalMacros.calories += meal.recipe.calories;
        weekPlan.totalMacros.protein += meal.recipe.protein;
        weekPlan.totalMacros.fat += meal.recipe.fat;
        weekPlan.totalMacros.carbs += meal.recipe.carbs;
        weekPlan.totalMacros.netCarbs += meal.recipe.netCarbs;
      }
    });
  });
  
  console.log('[generateWeeklyPlan] Total semana:', weekPlan.totalMacros);
  
  // Calcular lista de compras
  calculateAndSetShoppingList(weekPlan);
  
  return weekPlan;
}

function calculateAndSetShoppingList(weekPlan) {
  var shoppingList = {};
  
  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal && meal.recipe && meal.recipe.ingredients) {
        meal.recipe.ingredients.forEach(function(ing) {
          var id = ing.id || ing.name;
          if (!shoppingList[id]) {
            shoppingList[id] = { name: ing.name, quantity: 0, unit: ing.unit, toBuy: 0 };
          }
          shoppingList[id].quantity += parseFloat(ing.quantity) || 0;
          shoppingList[id].toBuy += parseFloat(ing.quantity) || 0;
        });
      }
    });
  });
  
  weekPlan.shoppingList = shoppingList;
}

// Guardar/Cargar/Clear
function saveWeeklyPlan(weekPlan) {
  localStorage.setItem("weeklyPlan", JSON.stringify(weekPlan));
}

function loadWeeklyPlan() {
  return safeParseJSON(localStorage.getItem("weeklyPlan"), null);
}

function clearWeeklyPlan() {
  localStorage.removeItem("weeklyPlan");
  localStorage.removeItem("weeklyPlanGenerated");
  recentRecipes = [];
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateWeeklyPlan: generateWeeklyPlan,
    loadWeeklyPlan: loadWeeklyPlan,
    saveWeeklyPlan: saveWeeklyPlan,
    clearWeeklyPlan: clearWeeklyPlan,
    getUserMacroProfile: getUserMacroProfile,
    getPantry: getPantry,
    getWeekDays: getWeekDays
  };
}