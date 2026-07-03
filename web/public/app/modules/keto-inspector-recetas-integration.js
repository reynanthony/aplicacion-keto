/*
 * Integracion de Inspector Keto en flujo manual de recetas.
 *
 * Muestra reporte antes de agregar al plan y permite aceptar version optimizada.
 */
(function (globalScope) {
  'use strict';

  function safeJSON(text, fallback) {
    try {
      return JSON.parse(text);
    } catch (error) {
      return fallback;
    }
  }

  function getRecipeById(recipeId) {
    var base = Array.isArray(globalScope.recipesDB) ? globalScope.recipesDB : [];
    var custom = safeJSON(localStorage.getItem('customRecipes') || '[]', []);
    var all = base.concat(Array.isArray(custom) ? custom : []);

    for (var i = 0; i < all.length; i++) {
      if (all[i] && all[i].id === recipeId) return all[i];
    }

    return null;
  }

  function recipeToInspectorFormat(recipe) {
    return {
      id: recipe.id,
      title: recipe.title || recipe.nombre,
      porciones: parseInt(recipe.servings || recipe.porciones || 1, 10) || 1,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : []
    };
  }

  function patchPlanWithInspector(meal, recipeId, report, useOptimized) {
    var today = new Date().toISOString().slice(0, 10);
    var key = 'mealPlan_' + today;
    var plan = safeJSON(localStorage.getItem(key) || '{}', {});

    if (!plan || !plan[meal] || !plan[meal].length) {
      return;
    }

    var list = plan[meal];
    var lastIndex = list.length - 1;
    var item = list[lastIndex];

    if (!item) return;

    item.ketoInspector = {
      puntaje_keto: report.puntaje_keto,
      nivel_seguridad: report.nivel_seguridad,
      carbos_netos_por_porcion: report.carbohidratos_netos_por_porcion,
      version: useOptimized ? 'optimizada' : 'original'
    };

    if (useOptimized && report.receta_optimizada) {
      item.name = (item.name || recipeId) + ' (Optimizada)';
      item.carbs = report.receta_optimizada.carbs_netos_por_porcion || item.carbs;
      item.optimized = true;
      item.optimizedReplacements = report.receta_optimizada.ingredientes_reemplazados || [];
    }

    localStorage.setItem(key, JSON.stringify(plan));
  }

  function installIntegration() {
    if (globalScope.__ketoInspectorRecetasInstalled) return;
    if (typeof globalScope.openMealPlanModal !== 'function' || typeof globalScope.addToMealPlan !== 'function') return;

    var inspector = globalScope.inspectorKeto;
    if (!inspector) return;

    var originalOpenMealPlanModal = globalScope.openMealPlanModal;
    var originalAddToMealPlan = globalScope.addToMealPlan;

    var state = {
      pending: null
    };

    globalScope.openMealPlanModal = function (recipeId) {
      var recipe = getRecipeById(recipeId);
      if (!recipe) {
        return originalOpenMealPlanModal(recipeId);
      }

      var report = inspector.inspeccionarReceta(recipeToInspectorFormat(recipe));
      state.pending = {
        recipeId: recipeId,
        report: report,
        useOptimized: false
      };

      if (globalScope.ketoInspectorUI && typeof globalScope.ketoInspectorUI.showRecipeModal === 'function') {
        globalScope.ketoInspectorUI.showRecipeModal(report, {
          onUseOriginal: function () {
            state.pending.useOptimized = false;
            originalOpenMealPlanModal(recipeId);
          },
          onUseOptimized: function () {
            state.pending.useOptimized = true;
            originalOpenMealPlanModal(recipeId);
          }
        });
        return;
      }

      if (typeof globalScope.showToast === 'function') {
        globalScope.showToast('Puntaje keto: ' + report.puntaje_keto + '. Revisa ingredientes antes de agregar.');
      }
      originalOpenMealPlanModal(recipeId);
    };

    globalScope.addToMealPlan = function (meal) {
      originalAddToMealPlan(meal);

      if (!state.pending || !state.pending.report) return;
      patchPlanWithInspector(meal, state.pending.recipeId, state.pending.report, state.pending.useOptimized);

      if (state.pending.useOptimized && typeof globalScope.showToast === 'function') {
        globalScope.showToast('Se aplico la version optimizada Keto.');
      }

      state.pending = null;
    };

    globalScope.__ketoInspectorRecetasInstalled = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installIntegration);
  } else {
    installIntegration();
  }

  // Fallback defensivo para scripts cargados tarde.
  setTimeout(installIntegration, 600);
})(typeof window !== 'undefined' ? window : globalThis);
