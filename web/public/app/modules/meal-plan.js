// ==================== MEAL PLAN — fuente única de verdad para mealPlan_<fecha> ====================
// Unifica la escritura/lectura entre Dashboard, Plan, Alimentos, Checklist y Macros.
// Convención: los items guardan valores base (para basePortion gramos) + portion (gramos consumidos).
// El escalado se hace SIEMPRE en itemTotals(), nunca antes de guardar.
var KetoMealPlan = (function() {
  'use strict';

  function emptyPlan() {
    return { desayuno: [], almuerzo: [], cena: [], snacks: [] };
  }

  function getPlan(dateKey) {
    var stored;
    try { stored = JSON.parse(localStorage.getItem('mealPlan_' + dateKey) || '{}'); }
    catch (e) { stored = {}; }
    if (!stored || Object.keys(stored).length === 0) {
      stored = emptyPlan();
      localStorage.setItem('mealPlan_' + dateKey, JSON.stringify(stored));
    }
    return stored;
  }

  function savePlan(dateKey, plan) {
    localStorage.setItem('mealPlan_' + dateKey, JSON.stringify(plan));
  }

  // food: {id,name,calories,protein,fat,carbs,portion} — valores SIN escalar, para `food.portion` gramos.
  // portionGrams: gramos realmente consumidos (puede ser distinto de food.portion).
  function addItem(dateKey, meal, food, portionGrams) {
    var plan = getPlan(dateKey);
    if (!plan[meal]) plan[meal] = [];
    plan[meal].push({
      id: food.id,
      name: food.name,
      baseCalories: parseFloat(food.calories) || 0,
      baseProtein: parseFloat(food.protein) || 0,
      baseFat: parseFloat(food.fat) || 0,
      baseCarbs: parseFloat(food.carbs) || 0,
      basePortion: parseFloat(food.portion) || 100,
      portion: parseFloat(portionGrams) || parseFloat(food.portion) || 100,
      addedAt: new Date().toISOString()
    });
    savePlan(dateKey, plan);
    return plan;
  }

  // Calcula los totales reales de un item, con compatibilidad hacia atrás para las 3 formas
  // legacy que existían antes de unificar (recetas con total final, items completos sin base*,
  // items delgados {id,portion} sin ningún campo nutricional).
  function itemTotals(item) {
    if (!item) return { calories: 0, protein: 0, fat: 0, carbs: 0 };

    // Recetas que ya guardan el total final (no se reescalan).
    if (item.isRecipe && item.calories !== undefined && item.baseCalories === undefined) {
      return {
        calories: Math.round(parseFloat(item.calories) || 0),
        protein: Math.round((parseFloat(item.protein) || 0) * 10) / 10,
        fat: Math.round((parseFloat(item.fat) || 0) * 10) / 10,
        carbs: Math.round((parseFloat(item.carbs) || 0) * 10) / 10
      };
    }

    var hasBase = item.baseCalories !== undefined;
    var portion = parseFloat(item.portion) || 100;
    // Legacy sin basePortion: se asume que los valores guardados ya corresponden a `portion`
    // (así escribían index.astro y alimentos.astro antes de unificar), ratio 1.
    var basePortion = parseFloat(item.basePortion) || (hasBase ? 100 : portion);
    var baseCal = hasBase ? parseFloat(item.baseCalories) : parseFloat(item.calories);
    var baseProt = hasBase ? parseFloat(item.baseProtein) : parseFloat(item.protein);
    var baseFat = hasBase ? parseFloat(item.baseFat) : parseFloat(item.fat);
    var baseCarbs = hasBase ? parseFloat(item.baseCarbs) : parseFloat(item.carbs);
    var ratio = basePortion > 0 ? portion / basePortion : 1;

    return {
      calories: Math.round((baseCal || 0) * ratio),
      protein: Math.round((baseProt || 0) * ratio * 10) / 10,
      fat: Math.round((baseFat || 0) * ratio * 10) / 10,
      carbs: Math.round((baseCarbs || 0) * ratio * 10) / 10
    };
  }

  return { getPlan: getPlan, savePlan: savePlan, addItem: addItem, itemTotals: itemTotals, emptyPlan: emptyPlan };
})();
