// ==================== PLAN GENERATOR UI ====================
// UI del generador de planes semanales

function openWeeklyPlanGenerator() {
  var modal = document.getElementById('weeklyPlanGeneratorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'weeklyPlanGeneratorModal';
    modal.className = 'fixed inset-0 z-[80] hidden';
    modal.innerHTML = getWeeklyPlanGeneratorHTML();
    document.body.appendChild(modal);
  }
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  loadProfileSummary();
}

function getWeeklyPlanGeneratorHTML() {
  return '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeWeeklyPlanGenerator()"></div>' +
    '<div class="relative ma-w-4xl w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] mx-auto mt-0 md:mt-10 bg-surface-container rounded-none md:rounded-2xl overflow-hidden flex flex-col">' +
      '<div class="flex items-center justify-between p-4 bg-surface-container-high border-b border-white/10">' +
        '<div class="flex items-center gap-3">' +
          '<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center">' +
            '<span class="material-symbols-outlined text-white">auto_awesome</span>' +
          '</div>' +
          '<div>' +
            '<h2 class="text-lg font-headline font-bold text-white">Generar Plan Semanal</h2>' +
            '<p class="text-xs text-on-surface-variant">Basado en tu perfil y preferencias</p>' +
          '</div>' +
        '</div>' +
        '<button onclick="closeWeeklyPlanGenerator()" class="w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">' +
          '<span class="material-symbols-outlined text-lg">close</span>' +
        '</button>' +
      '</div>' +
      '<div class="flex-1 overflow-y-auto p-4" id="weeklyPlanGeneratorContent">' +
        '<div class="space-y-4">' +
          '<div class="bg-surface-container-high rounded-xl p-4">' +
            '<h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-primary-container text-sm">person</span>Tu Perfil Objetivo</h3>' +
            '<div class="grid grid-cols-4 gap-3 text-center" id="profileSummary"></div>' +
          '</div>' +
          '<div class="bg-surface-container-high rounded-xl p-4">' +
            '<h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-sm">restaurant</span>Ingredientes Disponibles</h3>' +
            '<p class="text-xs text-on-surface-variant" id="pantryStatus">Verificando despensa...</p>' +
          '</div>' +
          '<div class="bg-surface-container-high rounded-xl p-4">' +
            '<h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-yellow-400 text-sm">info</span>¿Qué incluye el plan?</h3>' +
            '<ul class="text-xs text-on-surface-variant space-y-2">' +
              '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">check_circle</span> 7 días completos de comidas (desayuno, almuerzo, cena, snacks)</li>' +
              '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">check_circle</span> Recetas detalladas con preparación paso a paso</li>' +
              '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">check_circle</span> Lista de compras personalizada</li>' +
              '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-400 text-sm">check_circle</span> Macros balanceados según tu objetivo</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p-4 bg-surface-container-high border-t border-white/10">' +
        '<button onclick="generateWeeklyPlanAI()" class="w-full py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">' +
          '<span class="material-symbols-outlined">auto_awesome</span>Generar Plan con IA' +
        '</button>' +
      '</div>' +
    '</div>';
}

function closeWeeklyPlanGenerator() {
  var modal = document.getElementById('weeklyPlanGeneratorModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function loadProfileSummary() {
  var macros = {};
  try { macros = JSON.parse(localStorage.getItem('keto_macros') || '{}'); } catch(e) { macros = {}; }

  var profile = {
    calories: macros.calories || 1800,
    protein: macros.protein || 150,
    fat: macros.fat || 140,
    netCarbs: macros.carbs || 25
  };

  var container = document.getElementById('profileSummary');
  if (container) {
    container.innerHTML =
      '<div><p class="text-[10px] text-on-surface-variant uppercase">Calorías</p><p class="font-bold text-yellow-400">' + profile.calories + '</p></div>' +
      '<div><p class="text-[10px] text-on-surface-variant uppercase">Proteína</p><p class="font-bold text-orange-400">' + profile.protein + 'g</p></div>' +
      '<div><p class="text-[10px] text-on-surface-variant uppercase">Grasa</p><p class="font-bold text-yellow-300">' + profile.fat + 'g</p></div>' +
      '<div><p class="text-[10px] text-on-surface-variant uppercase">Carbos Net</p><p class="font-bold text-cyan-400">' + profile.netCarbs + 'g</p></div>';
  }

  var pantryStatus = document.getElementById('pantryStatus');
  if (pantryStatus) {
    var pantry = typeof getPantry === 'function' ? getPantry() : {};
    var count = Object.keys(pantry).filter(function(k) { return pantry[k] && pantry[k].stock > 0; }).length;
    pantryStatus.innerHTML = count > 0
      ? '<span class="text-green-400">' + count + ' alimentos en tu despensa</span>. Se generará lista de compras para lo que falte.'
      : '<span class="text-yellow-400">Tu despensa está vacía</span>. Se generará lista de compras completa.';
  }
}

function generateWeeklyPlanAI() {
  closeWeeklyPlanGenerator();

  var loadingModal = document.getElementById('weeklyPlanLoadingModal');
  if (!loadingModal) {
    loadingModal = document.createElement('div');
    loadingModal.id = 'weeklyPlanLoadingModal';
    loadingModal.className = 'fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm';
    loadingModal.innerHTML = '<div class="text-center">' +
      '<div class="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary-container border-t-transparent animate-spin"></div>' +
      '<p class="text-white font-headline font-bold">Generando tu plan semanal...</p>' +
      '<p class="text-on-surface-variant text-sm mt-1">Creando recetas únicas con IA</p>' +
    '</div>';
    document.body.appendChild(loadingModal);
  }
  loadingModal.classList.remove('hidden');

  if (window.KetoAI && window.KetoSupabase) {
    generateWeeklyPlanWithAI(loadingModal);
  } else {
    generateWeeklyPlanNormal(loadingModal);
  }
}

async function generateWeeklyPlanWithAI(loadingModal) {
  try {
    var macros = {};
    try { macros = JSON.parse(localStorage.getItem('keto_macros') || '{}'); } catch(e) { macros = {}; }

    var objetivos = {
      calories: macros.calories || 1800,
      protein: macros.protein || 150,
      fat: macros.fat || 140,
      netCarbs: macros.carbs || 20
    };

    var mealTargets = {
      desayuno: { calories: Math.round(objetivos.calories * 0.2), netCarbs: Math.round(objetivos.netCarbs * 0.2) },
      almuerzo: { calories: Math.round(objetivos.calories * 0.35), netCarbs: Math.round(objetivos.netCarbs * 0.35) },
      cena: { calories: Math.round(objetivos.calories * 0.35), netCarbs: Math.round(objetivos.netCarbs * 0.35) },
      snacks: { calories: Math.round(objetivos.calories * 0.1), netCarbs: Math.round(objetivos.netCarbs * 0.1) }
    };

    var perfil = window.UserLearning ? window.UserLearning.generarPerfilUsuario() : null;
    var evitados = perfil && perfil.ingredientesEvitados ? perfil.ingredientesEvitados.map(function(i) { return i.nombre; }) : [];

    var weekPlan = {
      generatedAt: new Date().toISOString(),
      source: 'ai',
      days: {},
      shoppingList: {},
      totalMacros: { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 }
    };

    var days = getWeekDays();

    for (var d = 0; d < days.length; d++) {
      var dateKey = days[d];
      var dayPlan = {
        date: dateKey,
        meals: {},
        dayMacros: { calories: 0, protein: 0, fat: 0, carbs: 0, netCarbs: 0 }
      };

      var mealTypes = ['desayuno', 'almuerzo', 'cena', 'snacks'];

      for (var m = 0; m < mealTypes.length; m++) {
        var mealType = mealTypes[m];
        var target = mealTargets[mealType];

        try {
          var receta = await window.KetoAI.generarRecetaKeto(mealType, {
            calories: target.calories,
            netCarbs: target.netCarbs,
            protein: Math.round(target.calories * 0.25 / 4),
            fat: Math.round(target.calories * 0.70 / 9)
          });

          if (receta) {
            dayPlan.meals[mealType] = { recipe: receta };
            dayPlan.dayMacros.calories += receta.macrosPorcion?.calories || target.calories;
            dayPlan.dayMacros.protein += receta.macrosPorcion?.protein || 20;
            dayPlan.dayMacros.fat += receta.macrosPorcion?.fat || 30;
            dayPlan.dayMacros.netCarbs += receta.macrosPorcion?.netCarbs || target.netCarbs;
          }
        } catch(e) {}
      }

      weekPlan.days[dateKey] = dayPlan;
      weekPlan.totalMacros.calories += dayPlan.dayMacros.calories;
      weekPlan.totalMacros.protein += dayPlan.dayMacros.protein;
      weekPlan.totalMacros.fat += dayPlan.dayMacros.fat;
      weekPlan.totalMacros.netCarbs += dayPlan.dayMacros.netCarbs;
    }

    await window.KetoSupabase.guardarPlanSemanal(weekPlan);

    loadingModal.classList.add('hidden');

    if (Object.keys(weekPlan.days).length > 0) {
      weekPlan = analyzePlanWithInspector(weekPlan);
      saveWeeklyPlan(weekPlan);
      openPlanInspectorReviewWithPlan(weekPlan);
    } else {
      window.showToast('Error al generar plan con IA', 3000, 'warning');
    }

  } catch(e) {
    loadingModal.classList.add('hidden');
    generateWeeklyPlanNormal(loadingModal);
  }
}

function generateWeeklyPlanNormal(loadingModal) {
  setTimeout(function() {
    var weekPlan = typeof generateWeeklyPlan === 'function' ? generateWeeklyPlan() : null;

    loadingModal.classList.add('hidden');

    if (weekPlan) {
      weekPlan = analyzePlanWithInspector(weekPlan);

      if (typeof saveWeeklyPlan === 'function') {
        saveWeeklyPlan(weekPlan);
      }

      setTimeout(function() {
        try {
          openPlanInspectorReviewWithPlan(weekPlan);
        } catch(e) {
          openWeeklyPlanPreview(weekPlan);
        }
      }, 200);
    } else {
      window.showToast('Error al generar el plan. Por favor intenta de nuevo.', 3000, 'warning');
    }
  }, 1500);
}

function analyzePlanWithInspector(weekPlan) {
  if (typeof window.KetoInspector === 'undefined' && typeof KetoInspector === 'undefined') {
    setTimeout(function() {
      analyzePlanWithInspector(weekPlan);
    }, 500);
    return weekPlan;
  }

  if (typeof KetoInspector === 'undefined' && !window.KetoInspector) {
    window.showToast('Inspector no disponible', 2000, 'warning');
    return weekPlan;
  }

  var issuesFound = 0;
  var recipesAnalyzed = [];

  Object.keys(weekPlan.days).forEach(function(dateKey) {
    var day = weekPlan.days[dateKey];
    Object.keys(day.meals).forEach(function(mealType) {
      var meal = day.meals[mealType];
      if (meal && meal.recipe) {
        var recipe = meal.recipe;
        var analisis = { mealType: mealType, dateKey: dateKey, recipe: recipe };

        if (KetoInspector && KetoInspector.inspeccionarReceta) {
          var result = KetoInspector.inspeccionarReceta(recipe);
          analisis.result = result;

          if (result && (result.nivel_seguridad === 'riesgo_alto' || result.nivel_seguridad === 'moderado')) {
            issuesFound++;
          }
        }

        recipesAnalyzed.push(analisis);
      }
    });
  });

  weekPlan.inspectorAnalysis = {
    analyzed: true,
    issuesFound: issuesFound,
    recipesAnalyzed: recipesAnalyzed,
    analyzedAt: new Date().toISOString()
  };

  window.showToast('Inspector: ' + issuesFound + ' recetas con alertas', 2000, issuesFound > 0 ? 'warning' : 'success');
  return weekPlan;
}

console.log('[PlanGeneratorUI] Cargado');
