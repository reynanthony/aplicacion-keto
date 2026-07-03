// ==================== PLAN SHOPPING ====================
// Lista de compras y confirmación del plan semanal

function openWeeklyPlanPreview(weekPlan) {
  if (!weekPlan) {
    weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  }
  if (!weekPlan) {
    window.showToast('No hay plan semanal guardado. Genera uno nuevo.', 3000, 'warning');
    return;
  }

  var modal = document.getElementById('weeklyPlanPreviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'weeklyPlanPreviewModal';
    modal.className = 'fixed inset-0 z-[80] hidden';
    document.body.appendChild(modal);
  }

  modal.innerHTML = getWeeklyPlanPreviewHTML(weekPlan);
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  var btnVer = document.getElementById('btnVerPlanSemanal');
  if (btnVer) {
    btnVer.classList.remove('hidden');
  }
}

function closeWeeklyPlanPreview() {
  var modal = document.getElementById('weeklyPlanPreviewModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function getWeeklyPlanPreviewHTML(weekPlan) {
  var days = weekPlan.days || {};
  var dayKeys = Object.keys(days);
  var html = '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeWeeklyPlanPreview()"></div>' +
    '<div class="relative max-w-4xl w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] mx-auto mt-0 md:mt-10 bg-surface-container rounded-none md:rounded-2xl overflow-hidden flex flex-col">' +
    '<div class="flex items-center justify-between px-4 py-3 border-b border-white/10">' +
      '<h3 class="text-lg font-headline font-bold text-white">Vista previa semanal</h3>' +
      '<button onclick="closeWeeklyPlanPreview()" class="w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white">' +
        '<span class="material-symbols-outlined">close</span>' +
      '</button>' +
    '</div>' +
    '<div class="flex-1 overflow-y-auto p-4 space-y-4">';

  dayKeys.forEach(function(dateKey) {
    var day = days[dateKey];
    if (!day || !day.meals) return;

    var dateStr = new Date(dateKey + 'T12:00:00');
    var dayName = dateStr.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });

    html += '<div class="bg-surface-container-high rounded-xl p-3">' +
      '<h4 class="text-sm font-bold text-white mb-3 capitalize">' + dayName + '</h4>' +
      '<div class="space-y-2">';

    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal && meal.recipe) {
        var r = meal.recipe;
        var nivel = r.nivel_seguridad || (r.netCarbs && r.netCarbs < 10 ? 'seguro' : 'moderado');
        var color = nivel === 'seguro' ? 'text-green-400' : nivel === 'riesgo_alto' ? 'text-red-400' : 'text-yellow-400';

        html += '<div class="flex items-center justify-between text-xs py-1 border-b border-white/5">' +
          '<div class="flex items-center gap-2">' +
            '<span class="material-symbols-outlined text-sm text-on-surface-variant">' + getMealIcon(mealType) + '</span>' +
            '<span class="text-white/70 capitalize">' + mealType + '</span>' +
          '</div>' +
          '<div class="flex items-center gap-3">' +
            '<span class="text-white font-medium">' + (r.title || 'Receta') + '</span>' +
            '<span class="' + color + '">' + (r.netCarbs || 0).toFixed(1) + 'g CN</span>' +
          '</div>' +
        '</div>';
      }
    });

    html += '</div></div>';
  });

  html += '</div>' +
    '<div class="px-4 py-3 border-t border-white/10 bg-surface-container-high">' +
      '<button onclick="closeWeeklyPlanPreview(); openPlanInspectorReview();" class="w-full py-3 rounded-xl bg-primary-container text-white font-bold hover:opacity-90 transition-all">' +
        'REVISAR CON INSPECTOR' +
      '</button>' +
    '</div>' +
  '</div>';

  return html;
}

function getMealIcon(mealType) {
  var icons = { desayuno: 'sunny', almuerzo: 'lunch_dining', cena: 'dinner_dining', snacks: 'bakery_dining' };
  return icons[mealType] || 'restaurant';
}

function openShoppingConfirmation() {
  closeWeeklyPlanPreview();

  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan) return;

  var pantry = typeof getPantry === 'function' ? getPantry() : {};
  var shoppingList = typeof calculateShoppingList === 'function'
    ? calculateShoppingList(weekPlan, pantry)
    : weekPlan.shoppingList;

  var modal = document.getElementById('shoppingConfirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shoppingConfirmationModal';
    modal.className = 'fixed inset-0 z-[85] hidden';
    document.body.appendChild(modal);
  }

  var toBuy = Object.keys(shoppingList).filter(function(k) { return shoppingList[k].toBuy > 0; });
  var totalToBuy = toBuy.length;

  modal.innerHTML = '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeShoppingConfirmation()"></div>' +
    '<div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">' +
      '<div class="bg-surface-container rounded-2xl p-5 w-full max-w-md pointer-events-auto max-h-[80vh] overflow-y-auto">' +
        '<div class="flex items-center gap-3 mb-4">' +
          '<div class="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">' +
            '<span class="material-symbols-outlined text-green-400 text-3xl">check_circle</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="text-xl font-headline font-bold text-white">Ultimo Paso</h3>' +
            '<p class="text-sm text-on-surface-variant">' + totalToBuy + ' ingredientes seran agregados a tu despensa</p>' +
          '</div>' +
        '</div>' +
        '<div class="bg-surface-container-high rounded-xl p-3 mb-4">' +
          '<p class="text-xs text-on-surface-variant mb-2 font-bold">Lo que obtendras:</p>' +
          '<ul class="text-xs text-on-surface-variant space-y-2">' +
            '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">calendar_today</span>Plan semanal completo listo</li>' +
            '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">kitchen</span>Ingredientes en tu despensa</li>' +
            '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">menu_book</span>Recetas con preparacion detallada</li>' +
          '</ul>' +
        '</div>' +
        '<div class="bg-surface-container-high rounded-xl p-3 mb-4 max-h-48 overflow-y-auto space-y-2">' +
          '<p class="text-xs text-on-surface-variant mb-2 font-bold">Ingredientes a agregar:</p>' +
          toBuy.slice(0, 20).map(function(foodId) {
            var item = shoppingList[foodId];
            return '<div class="flex items-center justify-between text-sm py-1 border-b border-white/5">' +
              '<span class="text-white">' + item.name + '</span>' +
              '<span class="text-secondary font-medium">' + Math.round(item.toBuy) + ' ' + (item.unit || 'g') + '</span>' +
            '</div>';
          }).join('') +
          (totalToBuy > 20 ? '<p class="text-xs text-on-surface-variant text-center py-2">...y ' + (totalToBuy - 20) + ' mas</p>' : '') +
        '</div>' +
        '<div class="flex gap-3">' +
          '<button onclick="closeShoppingConfirmation()" class="flex-1 py-3 rounded-xl bg-surface-container text-white font-medium hover:bg-surface-container-highest transition-colors">Volver</button>' +
          '<button onclick="confirmShoppingAndApplyPlan()" class="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-base">' +
            '<span class="material-symbols-outlined text-sm">check</span>Activar Plan' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeShoppingConfirmation() {
  var modal = document.getElementById('shoppingConfirmationModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function getDespensa() {
  return JSON.parse(localStorage.getItem('despensa') || '{}');
}

// Calcular lista de compras deduciendo lo que ya hay en despensa
function calculateShoppingList(weekPlan, pantry) {
  pantry = pantry || {};
  var baseList = weekPlan.shoppingList || {};
  var result = {};
  var despensa = getDespensa();

  Object.keys(baseList).forEach(function(foodId) {
    var item = JSON.parse(JSON.stringify(baseList[foodId]));
    var needed = item.toBuy || item.quantity || 0;

    // Deducir stock de despensa
    if (despensa[foodId]) {
      var stock = despensa[foodId].stock || 0;
      var deducted = Math.min(stock, needed);
      needed -= deducted;
      item.deductedFromPantry = deducted;
    }

    // También deducir de pantry (parámetro legacy)
    if (pantry[foodId]) {
      var pStock = typeof pantry[foodId] === 'number' ? pantry[foodId] : (pantry[foodId].stock || 0);
      var pDeduct = Math.min(pStock, needed);
      needed -= pDeduct;
      item.deductedFromPantry = (item.deductedFromPantry || 0) + pDeduct;
    }

    item.toBuy = Math.max(0, needed);
    result[foodId] = item;
  });

  return result;
}

function confirmShoppingAndApplyPlan() {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan) return;

  var despensa = getDespensa();
  var shoppingList = typeof calculateShoppingList === 'function'
    ? calculateShoppingList(weekPlan, {})
    : (weekPlan.shoppingList || {});

  Object.keys(shoppingList).forEach(function(foodId) {
    var item = shoppingList[foodId];
    var quantity = item.toBuy || 0;
    if (quantity > 0) {
      // Si ya existe en despensa, sumar stock en lugar de reemplazar
      if (despensa[foodId]) {
        despensa[foodId].stock = (despensa[foodId].stock || 0) + quantity;
        despensa[foodId].lastUpdated = new Date().toISOString();
      } else {
        despensa[foodId] = {
          name: item.name,
          stock: quantity,
          unit: item.unit || 'g',
          category: item.category || 'comprado',
          addedAt: new Date().toISOString(),
          macros: item.macros || {}
        };
      }
    }
  });

  localStorage.setItem('despensa', JSON.stringify(despensa));

  weekPlan.confirmed = true;
  weekPlan.confirmedAt = new Date().toISOString();

  if (typeof saveWeeklyPlan === 'function') {
    saveWeeklyPlan(weekPlan);
  }

  assignWeeklyPlanToDays(weekPlan);

  closeShoppingConfirmation();
  closeWeeklyPlanPreview();

  var successModal = document.createElement('div');
  successModal.id = 'successModal';
  successModal.className = 'fixed inset-0 z-[95] flex items-center justify-center bg-black/80 backdrop-blur-sm';
  successModal.innerHTML = '<div class="text-center max-w-sm mx-auto px-6">' +
    '<div class="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">' +
      '<span class="material-symbols-outlined text-green-400 text-6xl" style="font-variation-settings:\'FILL\' 1">check_circle</span>' +
    '</div>' +
    '<h3 class="text-2xl font-headline font-bold text-white mb-3">¡Plan Activado!</h3>' +
    '<p class="text-on-surface-variant mb-6">Tu plan semanal esta listo. Los ingredientes estan en tu despensa.</p>' +
    '<div class="bg-surface-container-high rounded-xl p-4 mb-6 text-left">' +
      '<p class="text-xs text-on-surface-variant mb-2">Resumen:</p>' +
      '<div class="grid grid-cols-2 gap-3 text-center">' +
        '<div class="bg-surface-container rounded-lg p-2"><p class="text-lg font-bold text-white">' + (weekPlan.totalMacros.calories / 7).toFixed(0) + '</p><p class="text-xs text-on-surface-variant">KCAL/DIA</p></div>' +
        '<div class="bg-surface-container rounded-lg p-2"><p class="text-lg font-bold text-green-400">' + (weekPlan.totalMacros.protein / 7).toFixed(0) + 'g</p><p class="text-xs text-on-surface-variant">PROTEINA</p></div>' +
        '<div class="bg-surface-container rounded-lg p-2"><p class="text-lg font-bold text-yellow-400">' + (weekPlan.totalMacros.fat / 7).toFixed(0) + 'g</p><p class="text-xs text-on-surface-variant">GRASA</p></div>' +
        '<div class="bg-surface-container rounded-lg p-2"><p class="text-lg font-bold text-red-400">' + (weekPlan.totalMacros.netCarbs / 7).toFixed(0) + 'g</p><p class="text-xs text-on-surface-variant">CN</p></div>' +
      '</div>' +
    '</div>' +
    '<button onclick="closeSuccessModal()" class="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">Comenzar</button>' +
  '</div>';
  document.body.appendChild(successModal);
  window.showToast('¡Plan activado exitosamente!', 3000, 'success');
}

function closeSuccessModal() {
  var modal = document.getElementById('successModal');
  if (modal) modal.remove();
}

function assignWeeklyPlanToDays(weekPlan) {
  if (!weekPlan || !weekPlan.days) return;

  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    if (!day || !day.meals) return;

    var mealPlan = { desayuno: [], almuerzo: [], cena: [], snacks: [] };

    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal && meal.recipe) {
        mealPlan[mealType] = [{
          id: meal.recipe.id || 'generated',
          name: meal.recipe.title || 'Receta',
          portion: 100,
          calories: meal.recipe.calories,
          protein: meal.recipe.protein,
          fat: meal.recipe.fat,
          carbs: meal.recipe.carbs,
          netCarbs: meal.recipe.netCarbs,
          isRecipe: true,
          baseCalories: meal.recipe.calories,
          basePortion: 100,
          baseProtein: meal.recipe.protein,
          baseFat: meal.recipe.fat,
          baseCarbs: meal.recipe.carbs
        }];
      }
    });

    localStorage.setItem('mealPlan_' + dateKey, JSON.stringify(mealPlan));
  });

  window.showToast('Plan asignado a los 7 días de la semana', 2000);
}

// ==================== DESPENSA UTILITIES ====================

function getDespensaStock(foodId) {
  var d = getDespensa();
  return d[foodId] ? (d[foodId].stock || 0) : 0;
}

function consumeFromDespensa(foodId, quantity) {
  var d = getDespensa();
  if (d[foodId]) {
    d[foodId].stock = Math.max(0, (d[foodId].stock || 0) - quantity);
    d[foodId].lastUpdated = new Date().toISOString();
    if (d[foodId].stock <= 0) delete d[foodId];
    localStorage.setItem('despensa', JSON.stringify(d));
  }
}

// Registrar consumo de una receta completa desde despensa
function consumeRecipeFromDespensa(recipe) {
  var ings = recipe.ingredients || recipe.ingredientes || [];
  ings.forEach(function(ing) {
    var name = (ing.name || ing.nombre || '').toLowerCase().replace(/\s+/g, '_');
    consumeFromDespensa(name, parseFloat(ing.quantity || ing.cantidad || 0));
  });
}

console.log('[PlanShopping] Cargado');
