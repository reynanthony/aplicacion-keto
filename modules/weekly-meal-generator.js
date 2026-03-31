// ==================== GENERADOR DE PLAN SEMANAL KETO - KetoLab ====================
// Genera planes semanales personalizados basados en perfil y despensa

console.log('[WeeklyMealGenerator] Modulo cargado');

// ==================== CONFIGURACIÓN ====================

if (typeof getRecipesByMealType === 'undefined') {
  console.error('[WeeklyMealGenerator] ERROR: getRecipesByMealType no esta definido. Verifica que recipe-details.js se carga correctamente.');
}

var WEEKLY_PLAN_CONFIG = {
  daysPerWeek: 7,
  mealsPerDay: ['desayuno', 'almuerzo', 'cena', 'snacks'],
  mealDistribution: {
    desayuno: 0.20,
    almuerzo: 0.35,
    cena: 0.35,
    snacks: 0.10
  },
  minNetCarbsPerDay: 15,
  maxNetCarbsPerDay: 25,
  proteinMinPercent: 0.20,
  fatMinPercent: 0.65
};

function getRecipesByMealType(mealType) {
  if (typeof KETO_RECIPES !== 'undefined' && KETO_RECIPES) {
    return Object.keys(KETO_RECIPES)
      .filter(function(key) { return KETO_RECIPES[key].mealType === mealType; })
      .map(function(key) { return { id: key, ...KETO_RECIPES[key] }; });
  }
  return [];
}

function getRecipeById(recipeId) {
  if (typeof KETO_RECIPES !== 'undefined' && KETO_RECIPES && KETO_RECIPES[recipeId]) {
    return { id: recipeId, ...KETO_RECIPES[recipeId] };
  }
  return null;
}

function getAllRecipeIds() {
  if (typeof KETO_RECIPES !== 'undefined' && KETO_RECIPES) {
    return Object.keys(KETO_RECIPES);
  }
  return [];
}

function calculateRecipeMacros(recipe) {
  return {
    calories: recipe.calories,
    protein: recipe.protein,
    fat: recipe.fat,
    carbs: recipe.carbs,
    netCarbs: recipe.netCarbs || Math.max(0, recipe.carbs - (recipe.fiber || 0)),
    fiber: recipe.fiber || 0
  };
}

// ==================== SUBSTITUCION DE INGREDIENTES ====================

var userExcludedIngredients = [];

function loadUserExcludedIngredients() {
  var stored = safeParseJSON(localStorage.getItem("excludedIngredients"), []);
  userExcludedIngredients = stored;
  return stored;
}

function saveUserExcludedIngredients(list) {
  userExcludedIngredients = list;
  localStorage.setItem("excludedIngredients", JSON.stringify(list));
}

function excludeIngredient(foodId) {
  loadUserExcludedIngredients();
  if (!userExcludedIngredients.includes(foodId)) {
    userExcludedIngredients.push(foodId);
    saveUserExcludedIngredients(userExcludedIngredients);
  }
}

function includeIngredient(foodId) {
  loadUserExcludedIngredients();
  userExcludedIngredients = userExcludedIngredients.filter(function(id) { return id !== foodId; });
  saveUserExcludedIngredients(userExcludedIngredients);
}

function isIngredientExcluded(foodId) {
  loadUserExcludedIngredients();
  return userExcludedIngredients.includes(foodId);
}

function getAvailableIngredientsForCategory(category) {
  var allFoods = getAllFoods();
  loadUserExcludedIngredients();
  return allFoods.filter(function(f) {
    return f.category === category && !userExcludedIngredients.includes(f.id);
  });
}

function substituteIngredient(originalIngredient, category) {
  var available = getAvailableIngredientsForCategory(category);
  var sameCategory = available.filter(function(f) { return f.category === originalIngredient.category || category === f.category; });
  
  if (sameCategory.length === 0) sameCategory = available;
  
  var shuffled = shuffleArray([...sameCategory]);
  return shuffled[0] || null;
}

function findAlternativeRecipe(recipe, mealType) {
  var recipes = getRecipesByMealType(mealType);
  loadUserExcludedIngredients();
  
  var validRecipes = recipes.filter(function(r) {
    var hasExcluded = false;
    if (r.ingredients) {
      r.ingredients.forEach(function(ing) {
        if (userExcludedIngredients.includes(ing.id)) {
          hasExcluded = true;
        }
      });
    }
    return !hasExcluded;
  });
  
  if (validRecipes.length === 0) return null;
  
  var shuffled = shuffleArray([...validRecipes]);
  return shuffled[0];
}

function regeneratePlanWithExclusions(weekPlan) {
  if (!weekPlan || !weekPlan.days) return weekPlan;
  
  var pantry = getPantry();
  
  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    if (!day || !day.meals) return;
    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (!meal || !meal.recipe) return;
      var hasExcluded = false;
      if (meal.recipe.ingredients) {
        meal.recipe.ingredients.forEach(function(ing) {
          if (userExcludedIngredients.includes(ing.id)) {
            hasExcluded = true;
          }
        });
      }
      
      if (hasExcluded) {
        var newRecipe = findAlternativeRecipe(meal.recipe, mealType);
        if (newRecipe) {
          meal.recipe = newRecipe;
          meal.actualMacros = calculateRecipeMacros(newRecipe);
        }
      }
    });
  });
  
  recalculateDayMacros(weekPlan);
  recalculateShoppingList(weekPlan, pantry);
  
  return weekPlan;
}

function recalculateDayMacros(weekPlan) {
  if (!weekPlan) return;
  weekPlan.totalMacros = { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 };
  
  Object.keys(weekPlan.days || {}).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    if (!day) return;
    day.dayMacros = { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 };
    
    Object.keys(day.meals || {}).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (!meal || !meal.recipe) return;
      day.dayMacros.calories += meal.recipe.calories || 0;
      day.dayMacros.protein += meal.recipe.protein || 0;
      day.dayMacros.fat += meal.recipe.fat || 0;
      day.dayMacros.carbs += meal.recipe.carbs || 0;
      day.dayMacros.netCarbs += meal.recipe.netCarbs || 0;
      
      weekPlan.totalMacros.calories += meal.recipe.calories || 0;
      weekPlan.totalMacros.protein += meal.recipe.protein || 0;
      weekPlan.totalMacros.fat += meal.recipe.fat || 0;
      weekPlan.totalMacros.carbs += meal.recipe.carbs || 0;
      weekPlan.totalMacros.netCarbs += meal.recipe.netCarbs || 0;
    });
    
    day.adherenceScore = calculateAdherenceScore(day.dayMacros, getUserMacroProfile());
  });
  
  weekPlan.averageMacros = {
    calories: Math.round(weekPlan.totalMacros.calories / 7),
    protein: Math.round(weekPlan.totalMacros.protein / 7),
    fat: Math.round(weekPlan.totalMacros.fat / 7),
    carbs: Math.round(weekPlan.totalMacros.carbs / 7),
    netCarbs: Math.round(weekPlan.totalMacros.netCarbs / 7)
  };
}

function recalculateShoppingList(weekPlan, pantry) {
  var newShoppingList = {};
  
  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal.recipe && meal.recipe.ingredients) {
        meal.recipe.ingredients.forEach(function(ing) {
          if (!newShoppingList[ing.id]) {
            newShoppingList[ing.id] = {
              id: ing.id,
              name: ing.name,
              quantity: 0,
              unit: ing.unit
            };
          }
          newShoppingList[ing.id].quantity += ing.quantity;
        });
      }
    });
  });
  
  Object.keys(newShoppingList).forEach(function(foodId) {
    var item = newShoppingList[foodId];
    var currentStock = pantry[foodId] ? pantry[foodId].stock : 0;
    item.inPantry = currentStock;
    item.toBuy = Math.max(0, item.quantity - currentStock);
  });
  
  weekPlan.shoppingList = newShoppingList;
}

// ==================== OBTENER PERFIL DE MACROS ====================

function getUserMacroProfile() {
  var macros = safeParseJSON(localStorage.getItem("keto_macros"), {});
  var profile = safeParseJSON(localStorage.getItem("keto_profile"), {});
  
  var targetCalories = parseInt(macros.calories) || 1800;
  var targetProtein = parseInt(macros.protein) || 140;
  var targetFat = parseInt(macros.fat) || 140;
  var targetCarbs = parseInt(macros.carbs) || 20;
  
  var experience = profile.experience || 'intermedio';
  var trainingGoal = profile.trainingGoal || 'mantener';
  
  if (experience === 'novato') {
    targetCarbs = Math.min(targetCarbs, 20);
  } else if (experience === 'avanzado') {
    targetCarbs = Math.min(targetCarbs, 30);
  }
  
  return {
    calories: targetCalories,
    protein: targetProtein,
    fat: targetFat,
    carbs: targetCarbs,
    netCarbs: Math.max(5, targetCarbs - 5),
    experience: experience,
    trainingGoal: trainingGoal
  };
}

// ==================== OBTENER DESPENSA ====================

function getPantry() {
  return safeParseJSON(localStorage.getItem("despensa"), {});
}

function getPantryFoods() {
  var pantry = getPantry();
  var allFoods = getAllFoods();
  var pantryFoods = [];
  
  allFoods.forEach(function(food) {
    var stock = pantry[food.id] ? pantry[food.id].stock : 0;
    pantryFoods.push({
      ...food,
      inStock: stock > 0,
      stockAmount: stock
    });
  });
  
  return pantryFoods;
}

function getAllFoods() {
  var stored = safeParseJSON(localStorage.getItem("ketoFoods"), null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  return getDefaultFoods();
}

function getDefaultFoods() {
  return [
    {id:"f1",name:"Huevos",portion:50,calories:78,protein:6,fat:5,carbs:0.6,category:"Proteínas"},
    {id:"f2",name:"Pechuga de pollo",portion:100,calories:165,protein:31,fat:3.6,carbs:0,category:"Proteínas"},
    {id:"f3",name:"Carne molida 80/20",portion:100,calories:254,protein:17,fat:20,carbs:0,category:"Proteínas"},
    {id:"f4",name:"Salmón",portion:100,calories:208,protein:20,fat:13,carbs:0,category:"Proteínas"},
    {id:"f5",name:"Bacon",portion:50,calories:270,protein:12,fat:23,carbs:1,category:"Proteínas"},
    {id:"f7",name:"Carne de res (bistec)",portion:100,calories:271,protein:26,fat:18,carbs:0,category:"Proteínas"},
    {id:"f8",name:"Atún",portion:100,calories:132,protein:28,fat:1,carbs:0,category:"Proteínas"},
    {id:"f10",name:"Pavo molido",portion:100,calories:149,protein:27,fat:3,carbs:0,category:"Proteínas"},
    {id:"f12",name:"Aguacate",portion:100,calories:160,protein:2,fat:15,carbs:9,fiber:7,category:"Grasas"},
    {id:"f13",name:"Aceite de oliva",portion:15,calories:119,protein:0,fat:13.5,carbs:0,category:"Grasas"},
    {id:"f14",name:"Mantequilla",portion:15,calories:102,protein:0.1,fat:11.5,carbs:0,category:"Grasas"},
    {id:"f15",name:"Aceite de coco",portion:15,calories:121,protein:0,fat:13.5,carbs:0,category:"Grasas"},
    {id:"f17",name:"Almendras",portion:30,calories:170,protein:6,fat:15,carbs:6,fiber:3.5,category:"Frutos secos"},
    {id:"f18",name:"Nueces",portion:30,calories:196,protein:4.6,fat:19.5,carbs:4,fiber:2,category:"Frutos secos"},
    {id:"f19",name:"Macadamia",portion:30,calories:204,protein:2.2,fat:21.5,carbs:4,fiber:2.4,category:"Frutos secos"},
    {id:"f20",name:"Pecanas",portion:30,calories:196,protein:2.6,fat:20,fiber:2.7,carbs:4,category:"Frutos secos"},
    {id:"f21",name:"Semillas de chía",portion:30,calories:138,protein:4.4,fat:9,fiber:10,carbs:12,category:"Semillas"},
    {id:"f23",name:"Brócoli",portion:100,calories:34,protein:2.8,fat:0.4,carbs:7,fiber:2.6,category:"Verduras"},
    {id:"f24",name:"Coliflor",portion:100,calories:25,protein:2,fat:0.3,carbs:5,fiber:2,category:"Verduras"},
    {id:"f25",name:"Espinacas",portion:100,calories:23,protein:2.9,fat:0.4,carbs:3.6,fiber:2.2,category:"Verduras"},
    {id:"f26",name:"Champiñones",portion:100,calories:22,protein:3.1,fat:0.3,carbs:3.3,category:"Verduras"},
    {id:"f27",name:"Pimiento rojo",portion:100,calories:31,protein:1,fat:0.3,carbs:6,category:"Verduras"},
    {id:"f28",name:"Pepino",portion:100,calories:15,protein:0.7,fat:0.1,carbs:3.6,category:"Verduras"},
    {id:"f29",name:"Lechuga",portion:100,calories:15,protein:1.4,fat:0.2,carbs:2.9,category:"Verduras"},
    {id:"f30",name:"Tomate",portion:100,calories:18,protein:0.9,fat:0.2,carbs:3.9,fiber:1.2,category:"Verduras"},
    {id:"f32",name:"Ajo",portion:3,calories:4,protein:0.2,fat:0,carbs:1,category:"Verduras"},
    {id:"f33",name:"Calabacín",portion:100,calories:17,protein:1.2,fat:0.3,carbs:3.1,category:"Verduras"},
    {id:"f35",name:"Queso mozzarella",portion:100,calories:280,protein:28,fat:17,carbs:3.1,category:"Lácteos"},
    {id:"f36",name:"Queso cheddar",portion:30,calories:120,protein:7,fat:10,carbs:0.4,category:"Lácteos"},
    {id:"f37",name:"Queso parmesano",portion:30,calories:111,protein:10,fat:7,carbs:0.4,category:"Lácteos"},
    {id:"f38",name:"Queso crema",portion:30,calories:100,protein:2,fat:10,carbs:0.4,category:"Lácteos"},
    {id:"f39",name:"Nata para cocinar",portion:100,calories:340,protein:2,fat:36,carbs:3,category:"Lácteos"},
    {id:"f40",name:"Queso feta",portion:30,calories:75,protein:4,fat:6,carbs:1,category:"Lácteos"},
    {id:"f43",name:"Chocolate negro 90%",portion:30,calories:150,protein:2.5,fat:13,carbs:4,fiber:3,category:"Otros"},
    {id:"f45",name:"Cordero",portion:100,calories:294,protein:25,fat:21,carbs:0,category:"Proteínas"},
    {id:"f46",name:"Solomillo de cerdo",portion:100,calories:143,protein:26,fat:3.5,carbs:0,category:"Proteínas"},
    {id:"f47",name:"Camarones",portion:100,calories:99,protein:24,fat:0.3,carbs:0.2,category:"Proteínas"},
    {id:"f48",name:"Berenjena",portion:100,calories:25,protein:1,fat:0.2,carbs:6,fiber:3,category:"Verduras"},
    {id:"f49",name:"Bacalao",portion:100,calories:82,protein:18,fat:0.7,carbs:0,category:"Proteínas"},
    {id:"f51",name:"Jamón serrano",portion:30,calories:99,protein:15,fat:5,carbs:0.5,category:"Proteínas"},
    {id:"f59",name:"Queso cottage",portion:100,calories:98,protein:11,fat:4.3,carbs:3.4,category:"Lácteos"},
    {id:"f60",name:"Yogur griego natural",portion:100,calories:97,protein:9,fat:5,carbs:3.6,category:"Lácteos"},
    {id:"f68",name:"Rúcula",portion:50,calories:12,protein:1.3,fat:0.2,carbs:2,category:"Verduras"},
    {id:"f77",name:"Espárragos",portion:100,calories:20,protein:2.2,fat:0.1,carbs:3.9,category:"Verduras"},
    {id:"f80",name:"Avellanas",portion:30,calories:178,protein:4,fat:17,carbs:5,fiber:3,category:"Frutos secos"},
    {id:"f82",name:"Semillas hemp",portion:30,calories:162,protein:9.5,fat:14.6,carbs:2.6,category:"Semillas"},
    {id:"f83",name:"Pepitas calabaza",portion:30,calories:151,protein:7,fat:13,carbs:2,category:"Semillas"},
    {id:"f84",name:"Stevia",portion:1,calories:0,protein:0,fat:0,carbs:0,category:"Edulz"},
    {id:"f85",name:"Eritritol",portion:10,calories:0,protein:0,fat:0,carbs:0,category:"Edulz"},
    {id:"f86",name:"Mayonesa casera",portion:15,calories:100,protein:0,fat:11,carbs:0,category:"Otros"},
    {id:"f87",name:"Mostaza Dijon",portion:5,calories:3,protein:0,fat:0,carbs:0.3,category:"Otros"},
    {id:"f88",name:"Vinagre manzana",portion:15,calories:3,protein:0,fat:0,carbs:0.1,category:"Otros"},
    {id:"f89",name:"Hummus bajo carb",portion:30,calories:45,protein:2,fat:3.5,carbs:3,fiber:2,category:"Otros"},
    {id:"f93",name:"Harina almendra",portion:30,calories:162,protein:6,fat:14,carbs:6,fiber:3,category:"Otros"},
    {id:"f95",name:"Café bulletproof",portion:250,calories:230,protein:0,fat:25,carbs:0,category:"Bebidas"},
    {id:"f96",name:"Canela",portion:5,calories:6,protein:0,fat:0,carbs:2,category:"Especias"},
    {id:"f97",name:"Proteína whey chocolate",portion:30,calories:110,protein:24,fat:1,carbs:2,category:"Suplementos"},
    {id:"f98",name:"Leche almendras",portion:100,calories:17,protein:0.6,fat:1.5,carbs:0.5,category:"Bebidas"},
    {id:"f99",name:"Tzatziki keto",portion:30,calories:45,protein:4,fat:3,carbs:1,category:"Otros"},
    {id:"f100",name:"Manzana verde",portion:100,calories:52,protein:0.3,fat:0.2,carbs:14,fiber:2.4,category:"Frutas"},
    {id:"f101",name:"Pasta curry",portion:10,calories:40,protein:0,fat:3,carbs:2,category:"Especias"},
    {id:"f102",name:"Crema coco",portion:30,calories:90,protein:1,fat:9,carbs:1,category:"Grasas"},
    {id:"f103",name:"Hierbas provenzales",portion:5,calories:5,protein:0,fat:0,carbs:1,category:"Especias"},
    {id:"f104",name:"Colágeno hidrolizado",portion:20,calories:80,protein:18,fat:0,carbs:0,category:"Suplementos"},
    {id:"f105",name:"Aceitunas kalamata",portion:50,calories:105,protein:1,fat:10,carbs:4,fiber:2,category:"Otros"}
  ];
}

function getFoodsWithKetoScore() {
  var foods = getAllFoods();
  return foods.map(function(f) {
    var netCarbs = Math.max(0, (f.carbs || 0) - (f.fiber || 0));
    var ketoScore = 5;
    if (netCarbs > 8) ketoScore = 1;
    else if (netCarbs > 5) ketoScore = 2;
    else if (netCarbs > 3) ketoScore = 3;
    else if (netCarbs > 1) ketoScore = 4;
    
    return {
      ...f,
      netCarbs: netCarbs,
      ketoScore: ketoScore
    };
  });
}

// ==================== GENERADOR DE PLAN ====================

function generateWeeklyPlan(options) {
  options = options || {};
  var profile = getUserMacroProfile();
  var pantry = getPantry();
  
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
    
    Object.keys(dayPlan.meals).forEach(function(mealType) {
      var meal = dayPlan.meals[mealType];
      if (meal.recipe) {
        weekPlan.totalMacros.calories += meal.recipe.calories;
        weekPlan.totalMacros.protein += meal.recipe.protein;
        weekPlan.totalMacros.fat += meal.recipe.fat;
        weekPlan.totalMacros.carbs += meal.recipe.carbs;
        weekPlan.totalMacros.netCarbs += meal.recipe.netCarbs;
        
        if (meal.recipe.ingredients) {
          meal.recipe.ingredients.forEach(function(ing) {
            if (!weekPlan.shoppingList[ing.id]) {
              weekPlan.shoppingList[ing.id] = {
                name: ing.name,
                quantity: 0,
                unit: ing.unit
              };
            }
            weekPlan.shoppingList[ing.id].quantity += ing.quantity;
          });
        }
      }
    });
  });
  
  weekPlan.averageMacros = {
    calories: Math.round(weekPlan.totalMacros.calories / 7),
    protein: Math.round(weekPlan.totalMacros.protein / 7),
    fat: Math.round(weekPlan.totalMacros.fat / 7),
    carbs: Math.round(weekPlan.totalMacros.carbs / 7),
    netCarbs: Math.round(weekPlan.totalMacros.netCarbs / 7)
  };
  
  return weekPlan;
}

function generateDayPlan(dateKey, profile, pantry) {
  var dayPlan = {
    date: dateKey,
    meals: {},
    dayMacros: { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 }
  };
  
  var mealTargets = calculateMealTargets(profile);
  
  WEEKLY_PLAN_CONFIG.mealsPerDay.forEach(function(mealType) {
    var target = mealTargets[mealType];
    var recipe = selectBestRecipeForMeal(mealType, target, pantry);
    
    if (recipe) {
      var scaledRecipe = scaleRecipeToTarget(recipe, target);
      
      dayPlan.meals[mealType] = {
        recipe: scaledRecipe,
        actualMacros: calculateRecipeMacros(scaledRecipe)
      };
      
      dayPlan.dayMacros.calories += scaledRecipe.calories;
      dayPlan.dayMacros.protein += scaledRecipe.protein;
      dayPlan.dayMacros.fat += scaledRecipe.fat;
      dayPlan.dayMacros.carbs += scaledRecipe.carbs;
      dayPlan.dayMacros.netCarbs += scaledRecipe.netCarbs;
    } else {
      dayPlan.meals[mealType] = {
        recipe: null,
        actualMacros: { calories: 0, protein: 0, fat: 0, carbs: 0 }
      };
    }
  });
  
  dayPlan.adherenceScore = calculateAdherenceScore(dayPlan.dayMacros, profile);
  
  return dayPlan;
}

function scaleRecipeToTarget(recipe, target) {
  var calorieRatio = target.calories / recipe.calories;
  var minRatio = 0.5;
  var maxRatio = 2.5;
  var finalRatio = Math.max(minRatio, Math.min(maxRatio, calorieRatio));
  
  var scaledRecipe = JSON.parse(JSON.stringify(recipe));
  var basePortion = recipe.basePortion || 100;
  var newPortion = Math.round(basePortion * finalRatio / 10) * 10;
  scaledRecipe.basePortion = newPortion;
  
  var ratio = newPortion / basePortion;
  scaledRecipe.calories = Math.round(recipe.calories * ratio);
  scaledRecipe.protein = Math.round(recipe.protein * ratio * 10) / 10;
  scaledRecipe.fat = Math.round(recipe.fat * ratio * 10) / 10;
  scaledRecipe.carbs = Math.round(recipe.carbs * ratio * 10) / 10;
  scaledRecipe.netCarbs = Math.round((recipe.netCarbs || recipe.carbs) * ratio * 10) / 10;
  scaledRecipe.fiber = Math.round((recipe.fiber || 0) * ratio * 10) / 10;
  
  if (scaledRecipe.ingredients) {
    scaledRecipe.ingredients = recipe.ingredients.map(function(ing) {
      return {
        id: ing.id,
        name: ing.name,
        quantity: Math.round(ing.quantity * ratio / 5) * 5,
        unit: ing.unit,
        optional: ing.optional
      };
    });
  }
  
  scaledRecipe.scaledFrom = recipe.calories;
  scaledRecipe.scaledTo = scaledRecipe.calories;
  
  return scaledRecipe;
}

function calculateMealTargets(profile) {
  var targets = {};
  var totalCalories = profile.calories;
  var proteinGrams = profile.protein;
  var fatGrams = profile.fat;
  var carbGrams = profile.carbs || 20;
  
  Object.keys(WEEKLY_PLAN_CONFIG.mealDistribution).forEach(function(meal) {
    var percentage = WEEKLY_PLAN_CONFIG.mealDistribution[meal];
    var mealCalories = totalCalories * percentage;
    var proteinCalories = proteinGrams * 4 * percentage;
    var fatCalories = fatGrams * 9 * percentage;
    var carbCalories = carbGrams * 4 * percentage;
    
    var proteinRatio = proteinCalories / 4;
    var fatRatio = fatCalories / 9;
    var carbRatio = carbCalories / 4;
    
    targets[meal] = {
      calories: Math.round(mealCalories),
      protein: Math.round(proteinRatio),
      fat: Math.round(fatRatio),
      carbs: Math.round(carbRatio),
      netCarbs: Math.round(Math.max(1, carbRatio - 1))
    };
  });
  
  return targets;
}

function selectBestRecipeForMeal(mealType, target, pantry) {
  var recipes = getRecipesByMealType(mealType);
  if (recipes.length === 0) return null;
  
  var shuffled = shuffleArray([...recipes]);
  var bestRecipe = null;
  var bestScore = -Infinity;
  
  shuffled.slice(0, 3).forEach(function(recipe) {
    var score = calculateRecipeScore(recipe, target, pantry);
    if (score > bestScore) {
      bestScore = score;
      bestRecipe = recipe;
    }
  });
  
  return bestRecipe;
}

function calculateRecipeScore(recipe, target, pantry) {
  var calorieDiff = Math.abs(recipe.calories - target.calories);
  var proteinDiff = Math.abs(recipe.protein - target.protein);
  var carbDiff = Math.abs(recipe.netCarbs - target.netCarbs);
  
  var calorieScore = (1 - calorieDiff / target.calories) * 30;
  var proteinScore = (1 - proteinDiff / Math.max(1, target.protein)) * 25;
  var carbScore = (1 - carbDiff / Math.max(1, target.netCarbs)) * 30;
  
  var pantryScore = 0;
  if (recipe.ingredients) {
    recipe.ingredients.forEach(function(ing) {
      var stock = pantry[ing.id] ? pantry[ing.id].stock : 0;
      if (stock >= ing.quantity) {
        pantryScore += 15;
      } else if (stock > 0) {
        pantryScore += 5;
      }
    });
    pantryScore = pantryScore / recipe.ingredients.length * 15;
  }
  
  var varietyBonus = Math.random() * 5;
  
  return calorieScore + proteinScore + carbScore + pantryScore + varietyBonus;
}

function calculateAdherenceScore(dayMacros, profile) {
  if (!profile || !dayMacros) {
    return { score: 'bajo', label: 'Bajo', color: '#ff4d00' };
  }
  var calPct = Math.min(100, (dayMacros.calories / (profile.calories || 1)) * 100);
  var protPct = Math.min(100, (dayMacros.protein / (profile.protein || 1)) * 100);
  var carbPct = dayMacros.netCarbs <= (profile.netCarbs || 25) ? 100 : 50;
  
  var score = (calPct * 0.4) + (protPct * 0.4) + (carbPct * 0.2);
  
  if (score >= 90) return { score: 'excelente', label: 'Excelente', color: '#22c55e' };
  if (score >= 75) return { score: 'bueno', label: 'Bueno', color: '#84cc16' };
  if (score >= 60) return { score: 'regular', label: 'Regular', color: '#ffb300' };
  return { score: 'bajo', label: 'Bajo', color: '#ff4d00' };
}

// ==================== UTILIDADES ====================

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

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function formatDate(dateKey) {
  var d = new Date(dateKey);
  var options = { weekday: 'short', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('es-ES', options);
}

function formatDateFull(dateKey) {
  var d = new Date(dateKey);
  var options = { weekday: 'long', day: 'numeric', month: 'long' };
  return d.toLocaleDateString('es-ES', options);
}

// ==================== LISTA DE COMPRAS ====================

function calculateShoppingList(weekPlan, pantry) {
  var shoppingList = {};
  
  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal.recipe && meal.recipe.ingredients) {
        meal.recipe.ingredients.forEach(function(ing) {
          if (!ing.optional) {
            if (!shoppingList[ing.id]) {
              var currentStock = pantry[ing.id] ? pantry[ing.id].stock : 0;
              shoppingList[ing.id] = {
                id: ing.id,
                name: ing.name,
                needed: 0,
                inPantry: currentStock,
                toBuy: 0,
                unit: ing.unit
              };
            }
            shoppingList[ing.id].needed += ing.quantity;
          }
        });
      }
    });
  });
  
  Object.keys(shoppingList).forEach(function(foodId) {
    var item = shoppingList[foodId];
    item.toBuy = Math.max(0, item.needed - item.inPantry);
  });
  
  return shoppingList;
}

function addShoppingToPantry(shoppingList) {
  var pantry = getPantry();
  
  Object.keys(shoppingList).forEach(function(foodId) {
    var item = shoppingList[foodId];
    if (item.toBuy > 0) {
      if (!pantry[foodId]) {
        pantry[foodId] = { stock: 0, lastUpdated: new Date().toISOString() };
      }
      pantry[foodId].stock += item.toBuy;
      pantry[foodId].lastUpdated = new Date().toISOString();
    }
  });
  
  localStorage.setItem("despensa", JSON.stringify(pantry));
  return pantry;
}

// ==================== GUARDAR Y CARGAR PLAN ====================

function saveWeeklyPlan(weekPlan) {
  localStorage.setItem("weeklyPlan", JSON.stringify(weekPlan));
  localStorage.setItem("weeklyPlanGenerated", new Date().toISOString());
}

function loadWeeklyPlan() {
  return safeParseJSON(localStorage.getItem("weeklyPlan"), null);
}

function clearWeeklyPlan() {
  localStorage.removeItem("weeklyPlan");
  localStorage.removeItem("weeklyPlanGenerated");
}

// ==================== EXPORTAR PARA USO ====================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WEEKLY_PLAN_CONFIG,
    getUserMacroProfile,
    getPantry,
    getPantryFoods,
    generateWeeklyPlan,
    calculateShoppingList,
    addShoppingToPantry,
    saveWeeklyPlan,
    loadWeeklyPlan,
    clearWeeklyPlan,
    getWeekDays,
    formatDate,
    formatDateFull
  };
}
