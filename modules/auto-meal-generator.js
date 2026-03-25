// ==================== GENERADOR AUTOMÁTICO DE PLAN DE COMIDAS ====================
// Basado en recetas del usuario + stock de la despensa

var autoMealGenerator = (function() {
  'use strict';

  // Mapeo de ingredientes de recetas a IDs de alimentos en despensa
  var ingredientToFoodId = {
    'huevos': 'f1', 'pollo': 'f2', 'carne molida': 'f3', 'carne': 'f3',
    'salmon': 'f4', 'bacon': 'f5', 'cerdo': 'f6', 'res': 'f7', 'bistec': 'f7',
    'atun': 'f8', 'hígado': 'f9', 'pavo': 'f10', 'codornices': 'f11',
    'aguacate': 'f12', 'aceite de oliva': 'f13', 'manteca': 'f14', 'mantequilla': 'f14',
    'aceite de coco': 'f15', 'ghee': 'f16', 'almendras': 'f17', 'nueces': 'f18',
    'macadamia': 'f19', 'pecanas': 'f20', 'chia': 'f21', 'chía': 'f21',
    'linaza': 'f22', 'brocoli': 'f23', 'coliflor': 'f24', 'espinacas': 'f25',
    'champiñones': 'f26', 'hongos': 'f26', 'pimiento': 'f27', 'pepino': 'f28',
    'lechuga': 'f29', 'tomate': 'f30', 'cebolla': 'f31', 'ajo': 'f32',
    'calabacín': 'f33', 'zucchini': 'f33', 'apio': 'f34',
    'mozzarella': 'f35', 'cheddar': 'f36', 'parmesano': 'f37', 'queso crema': 'f38',
    'nata': 'f39', 'crema': 'f39', 'feta': 'f40', 'cacao': 'f41',
    'coco': 'f42', 'edamame': 'f43', 'mantequilla (café)': 'f44',
    'chocolate': 'f45'
  };

  function getAllRecipes() {
    var recipes = {};
    
    // Obtener recetas predefinidas
    if (typeof recipesDB !== 'undefined') {
      Object.keys(recipesDB).forEach(function(key) {
        recipes[key] = recipesDB[key];
      });
    }
    
    // Obtener recetas personalizadas del usuario
    var customRecs = safeParseJSON(localStorage.getItem('customRecipes'), []);
    customRecs.forEach(function(r) {
      recipes['custom_' + r.id] = r;
    });
    
    return recipes;
  }

  function getTargetMacros() {
    var macros = safeParseJSON(localStorage.getItem('keto_macros'), {});
    return {
      calories: parseInt(macros.calories) || 1800,
      protein: parseInt(macros.protein) || 120,
      fat: parseInt(macros.fat) || 140,
      carbs: parseInt(macros.carbs) || 25
    };
  }

  function getDespensaStock() {
    return safeParseJSON(localStorage.getItem('despensa'), {});
  }

  function getFoodName(foodId) {
    var foods = getAllFoods();
    var food = foods.find(function(f) { return f.id === foodId; });
    return food ? food.name : foodId;
  }

  function getAllFoods() {
    var stored = safeParseJSON(localStorage.getItem('ketoFoods'), []);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    // Default foods from plan.html
    return [
      {id: "f1", name: "Huevos", portion: 50, calories: 78, protein: 6, fat: 5, carbs: 0.6},
      {id: "f2", name: "Pechuga de pollo", portion: 100, calories: 165, protein: 31, fat: 3.6, carbs: 0},
      {id: "f3", name: "Carne molida 80/20", portion: 100, calories: 254, protein: 17, fat: 20, carbs: 0},
      {id: "f4", name: "Salmón", portion: 100, calories: 208, protein: 20, fat: 13, carbs: 0},
      {id: "f5", name: "Bacon", portion: 50, calories: 270, protein: 12, fat: 23, carbs: 1},
      {id: "f6", name: "Cerdo (lomo)", portion: 100, calories: 143, protein: 26, fat: 3.5, carbs: 0},
      {id: "f7", name: "Carne de res", portion: 100, calories: 271, protein: 26, fat: 18, carbs: 0},
      {id: "f8", name: "Atún", portion: 100, calories: 132, protein: 28, fat: 1, carbs: 0},
      {id: "f12", name: "Aguacate", portion: 100, calories: 160, protein: 2, fat: 15, carbs: 9},
      {id: "f13", name: "Aceite de oliva", portion: 15, calories: 119, protein: 0, fat: 13.5, carbs: 0},
      {id: "f14", name: "Mantequilla", portion: 15, calories: 102, protein: 0.1, fat: 11.5, carbs: 0},
      {id: "f15", name: "Aceite de coco", portion: 15, calories: 121, protein: 0, fat: 13.5, carbs: 0},
      {id: "f17", name: "Almendras", portion: 30, calories: 170, protein: 6, fat: 15, carbs: 6},
      {id: "f18", name: "Nueces", portion: 30, calories: 196, protein: 4.6, fat: 19.5, carbs: 4},
      {id: "f23", name: "Brócoli", portion: 100, calories: 34, protein: 2.8, fat: 0.4, carbs: 7},
      {id: "f24", name: "Coliflor", portion: 100, calories: 25, protein: 2, fat: 0.3, carbs: 5},
      {id: "f25", name: "Espinacas", portion: 100, calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6},
      {id: "f26", name: "Champiñones", portion: 100, calories: 22, protein: 3.1, fat: 0.3, carbs: 3.3},
      {id: "f30", name: "Tomate", portion: 100, calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9},
      {id: "f31", name: "Cebolla", portion: 100, calories: 40, protein: 1.1, fat: 0.1, carbs: 9.3},
      {id: "f32", name: "Ajo", portion: 3, calories: 4, protein: 0.2, fat: 0, carbs: 1},
      {id: "f33", name: "Calabacín", portion: 100, calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1},
      {id: "f35", name: "Queso mozzarella", portion: 100, calories: 280, protein: 28, fat: 17, carbs: 3.1},
      {id: "f36", name: "Queso cheddar", portion: 30, calories: 120, protein: 7, fat: 10, carbs: 0.4},
      {id: "f37", name: "Queso parmesano", portion: 30, calories: 111, protein: 10, fat: 7, carbs: 0.4},
      {id: "f38", name: "Queso crema", portion: 30, calories: 100, protein: 2, fat: 10, carbs: 0.4},
      {id: "f39", name: "Nata para cocinar", portion: 100, calories: 340, protein: 2, fat: 36, carbs: 3},
      {id: "f40", name: "Queso feta", portion: 30, calories: 75, protein: 4, fat: 6, carbs: 1}
    ];
  }

  // Verificar si los ingredientes de una receta están disponibles en la despensa
  function checkRecipeAvailability(recipe) {
    var despensa = getDespensaStock();
    var missingIngredients = [];
    var availableIngredients = [];
    
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      // Receta sin ingredientes específicos - asumimos disponible
      return { available: true, missing: [], availableList: [] };
    }
    
    recipe.ingredients.forEach(function(ingredient) {
      var ingStr = String(ingredient).toLowerCase();
      var foundFoodId = null;
      
      // Buscar coincidencia en el mapeo
      Object.keys(ingredientToFoodId).forEach(function(key) {
        if (ingStr.includes(key)) {
          foundFoodId = ingredientToFoodId[key];
        }
      });
      
      if (foundFoodId && despensa[foundFoodId] && despensa[foundFoodId].stock > 0) {
        availableIngredients.push({
          id: foundFoodId,
          name: ingredient,
          stock: despensa[foundFoodId].stock
        });
      } else if (foundFoodId) {
        missingIngredients.push({
          id: foundFoodId,
          name: ingredient,
          needed: 50 // cantidad típica
        });
      } else {
        // Ingrediente no mapeado - asumimos que está disponible
        availableIngredients.push({
          id: null,
          name: ingredient,
          stock: 999
        });
      }
    });
    
    return {
      available: missingIngredients.length === 0,
      missing: missingIngredients,
      availableList: availableIngredients
    };
  }

  function filterRecipesByAvailability(recipes) {
    var available = {};
    var unavailable = {};
    var partial = {};
    
    Object.keys(recipes).forEach(function(key) {
      var recipe = recipes[key];
      var availability = checkRecipeAvailability(recipe);
      
      if (availability.available) {
        available[key] = recipe;
      } else if (availability.availableList.length > 0) {
        partial[key] = { recipe: recipe, availability: availability };
      } else {
        unavailable[key] = { recipe: recipe, availability: availability };
      }
    });
    
    return { available: available, partial: partial, unavailable: unavailable };
  }

  function categorizeRecipes(recipes) {
    var categories = {
      desayuno: [],
      almuerzo: [],
      cena: [],
      snacks: []
    };
    
    Object.keys(recipes).forEach(function(key) {
      var recipe = recipes[key];
      var title = (recipe.title || '').toLowerCase();
      var category = recipe.category || '';
      
      if (category === 'desayuno' || title.includes('desayuno') || title.includes('huevo') || title.includes('cafe') || title.includes('batido') || title.includes('pancake') || title.includes('tortilla') || title.includes('omelette')) {
        categories.desayuno.push({ key: key, recipe: recipe });
      } else if (category === 'snacks' || title.includes('snack') || title.includes('ensalada')) {
        categories.snacks.push({ key: key, recipe: recipe });
      } else if (category === 'acompañamiento' || title.includes('acompañamiento') || title.includes('pure') || title.includes('arroz') || title.includes('verduras')) {
        categories.almuerzo.push({ key: key, recipe: recipe });
      } else {
        if (categories.almuerzo.length <= categories.cena.length) {
          categories.almuerzo.push({ key: key, recipe: recipe });
        } else {
          categories.cena.push({ key: key, recipe: recipe });
        }
      }
    });
    
    return categories;
  }

  function selectRecipesForPlan(categorized, targetMacros) {
    var plan = {
      desayuno: [],
      almuerzo: [],
      cena: [],
      snacks: []
    };
    
    var targets = {
      desayuno: { cal: targetMacros.calories * 0.30, prot: targetMacros.protein * 0.30 },
      almuerzo: { cal: targetMacros.calories * 0.35, prot: targetMacros.protein * 0.35 },
      cena: { cal: targetMacros.calories * 0.30, prot: targetMacros.protein * 0.30 },
      snacks: { cal: targetMacros.calories * 0.05, prot: targetMacros.protein * 0.05 }
    };
    
    ['desayuno', 'almuerzo', 'cena', 'snacks'].forEach(function(meal) {
      var options = categorized[meal];
      if (options.length > 0) {
        var selected = options[Math.floor(Math.random() * options.length)];
        var recipe = selected.recipe;
        
        var portion = Math.round((targets[meal].cal / recipe.calories) * 100);
        portion = Math.min(Math.max(portion, 50), 200);
        
        var ratio = portion / 100;
        
        plan[meal].push({
          id: selected.key,
          name: recipe.title,
          portion: portion,
          basePortion: 100,
          calories: Math.round(recipe.calories * ratio),
          protein: Math.round(recipe.protein * ratio * 10) / 10,
          fat: Math.round(recipe.fat * ratio * 10) / 10,
          carbs: Math.round(recipe.carbs * ratio * 10) / 10,
          isRecipe: true,
          icon: recipe.icon || 'restaurant',
          isAutoGenerated: true
        });
      }
    });
    
    return plan;
  }

  function calculatePlanMacros(plan) {
    var total = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    
    Object.keys(plan).forEach(function(meal) {
      plan[meal].forEach(function(item) {
        total.calories += item.calories || 0;
        total.protein += item.protein || 0;
        total.fat += item.fat || 0;
        total.carbs += item.carbs || 0;
      });
    });
    
    return total;
  }

  function checkMacroDeviations(result, target) {
    var warnings = [];
    var tolerance = 0.20;
    
    var deviationProtein = Math.abs(result.protein - target.protein) / target.protein;
    var deviationFat = Math.abs(result.fat - target.fat) / target.fat;
    var deviationCalories = Math.abs(result.calories - target.calories) / target.calories;
    
    if (deviationProtein > tolerance) {
      warnings.push({
        type: 'protein',
        message: 'Proteína (' + Math.round(result.protein) + 'g) está ' + Math.round(deviationProtein * 100) + '% ' + (result.protein > target.protein ? 'sobre' : 'bajo') + ' objetivo (' + target.protein + 'g)',
        severity: 'medium'
      });
    }
    
    if (deviationFat > tolerance) {
      warnings.push({
        type: 'fat',
        message: 'Grasas (' + Math.round(result.fat) + 'g) están ' + Math.round(deviationFat * 100) + '% ' + (result.fat > target.fat ? 'sobre' : 'bajo') + ' objetivo (' + target.fat + 'g)',
        severity: 'medium'
      });
    }
    
    if (deviationCalories > tolerance) {
      warnings.push({
        type: 'calories',
        message: 'Calorías (' + Math.round(result.calories) + ') están ' + Math.round(deviationCalories * 100) + '% ' + (result.calories > target.calories ? 'sobre' : 'bajo') + ' objetivo (' + target.calories + ')',
        severity: 'high'
      });
    }
    
    return warnings;
  }

  function generateMealPlan() {
    console.log('[AutoMealGenerator] Generando plan basado en despensa...');
    
    var recipes = getAllRecipes();
    var despensa = getDespensaStock();
    var despensaCount = Object.keys(despensa).filter(function(k) { return despensa[k].stock > 0; }).length;
    
    if (Object.keys(recipes).length === 0) {
      return {
        success: false,
        error: 'No hay recetas disponibles. Agrega recetas en la sección Recetas.'
      };
    }
    
    if (despensaCount === 0) {
      return {
        success: false,
        error: 'Tu despensa está vacía. Agrega alimentos en Compras para generar un plan.',
        despensaVacia: true
      };
    }
    
    var availability = filterRecipesByAvailability(recipes);
    var categorized = categorizeRecipes(availability.available);
    var targetMacros = getTargetMacros();
    var plan = selectRecipesForPlan(categorized, targetMacros);
    var resultMacros = calculatePlanMacros(plan);
    var warnings = checkMacroDeviations(resultMacros, targetMacros);
    
    // Agregar warning si hay recetas parciales
    var partialKeys = Object.keys(availability.partial);
    if (partialKeys.length > 0 && Object.keys(availability.available).length < 4) {
      warnings.push({
        type: 'despensa',
        message: 'Solo ' + Object.keys(availability.available).length + ' recetas是完全原料可用。Algunas recetas requieren ingredientes que no tienes.',
        severity: 'medium'
      });
    }
    
    var emptyMeals = [];
    Object.keys(plan).forEach(function(meal) {
      if (plan[meal].length === 0) {
        emptyMeals.push(meal);
      }
    });
    
    return {
      success: true,
      plan: plan,
      resultMacros: resultMacros,
      targetMacros: targetMacros,
      warnings: warnings,
      emptyMeals: emptyMeals,
      recipeCount: Object.keys(recipes).length,
      availableRecipeCount: Object.keys(availability.available).length,
      despensaCount: despensaCount,
      partialRecipes: availability.partial
    };
  }

  function saveGeneratedPlan(plan, dateKey) {
    if (!dateKey) {
      dateKey = new Date().toISOString().slice(0, 10);
    }
    localStorage.setItem('mealPlan_' + dateKey, JSON.stringify(plan));
    console.log('[AutoMealGenerator] Plan guardado para', dateKey);
  }

  return {
    generate: generateMealPlan,
    save: saveGeneratedPlan,
    getRecipes: getAllRecipes,
    getTargetMacros: getTargetMacros,
    getDespensaStock: getDespensaStock,
    checkRecipeAvailability: checkRecipeAvailability
  };
})();

// Funciones globales
function generateAutoMealPlan() {
  return autoMealGenerator.generate();
}

function saveGeneratedMealPlan(plan, dateKey) {
  autoMealGenerator.save(plan, dateKey);
}
