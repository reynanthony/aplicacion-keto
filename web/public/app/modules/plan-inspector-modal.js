// ==================== PLAN INSPECTOR MODAL ====================
// Modal de revisión del inspector keto para el plan semanal

function openPlanInspectorReview() {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  openPlanInspectorReviewWithPlan(weekPlan);
}

function openPlanInspectorReviewWithPlan(weekPlan) {
  if (!weekPlan) {
    window.showToast('No hay plan', 2000);
    return;
  }

  var analysis = weekPlan.inspectorAnalysis;
  if (!analysis) {
    window.showToast('No hay análisis', 2000);
    return;
  }

  var previewModal = document.getElementById('weeklyPlanPreviewModal');
  if (previewModal) {
    previewModal.classList.add('hidden');
    previewModal.classList.remove('flex');
  }

  var modal = document.getElementById('inspectorReviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'inspectorReviewModal';
    modal.className = 'fixed inset-0 z-[85] hidden';
    document.body.appendChild(modal);
  }

  var allRecipes = weekPlan.inspectorAnalysis.recipesAnalyzed || [];
  var totalRecetas = allRecipes.length;
  var conAlertas = 0;
  var totalCarbs = 0;
  allRecipes.forEach(function(a) {
    if (a.result) {
      if (a.result.nivel_seguridad === 'riesgo_alto' || a.result.nivel_seguridad === 'moderado') conAlertas++;
      totalCarbs += a.result.total_carbohidratos_netos_receta || 0;
    }
  });

  var html = '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeInspectorReview()"></div>' +
    '<div class="absolute inset-0 flex items-center justify-center p-2 pointer-events-none">' +
      '<div class="bg-surface-container rounded-2xl p-4 w-full max-w-2xl pointer-events-auto max-h-[90vh] overflow-y-auto">' +
        '<div class="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">' +
          '<div class="w-14 h-14 rounded-xl bg-primary-container/20 flex items-center justify-center">' +
            '<span class="material-symbols-outlined text-primary-container text-3xl">inventory_2</span>' +
          '</div>' +
          '<div class="flex-1">' +
            '<h3 class="text-xl font-headline font-bold text-white">ANÁLISIS DE INGREDIENTES</h3>' +
            '<p class="text-xs text-on-surface-variant">Revisa cada ingrediente antes de confirmar</p>' +
          '</div>' +
          '<button onclick="closeInspectorReview()" class="w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10">' +
            '<span class="material-symbols-outlined text-xl">close</span>' +
          '</button>' +
        '</div>' +
        '<div class="grid grid-cols-4 gap-2 mb-4">' +
          '<div class="bg-surface-container-high rounded-lg p-2 text-center">' +
            '<p class="text-xl font-bold text-white">' + totalRecetas + '</p>' +
            '<p class="text-[10px] text-on-surface-variant">RECETAS</p>' +
          '</div>' +
          '<div class="bg-surface-container-high rounded-lg p-2 text-center">' +
            '<p class="text-xl font-bold text-yellow-400">' + (totalCarbs/7).toFixed(1) + 'g</p>' +
            '<p class="text-[10px] text-on-surface-variant">CN/DÍA</p>' +
          '</div>' +
          '<div class="bg-surface-container-high rounded-lg p-2 text-center">' +
            '<p class="text-xl font-bold ' + (conAlertas > 0 ? 'text-red-400' : 'text-green-400') + '">' + conAlertas + '</p>' +
            '<p class="text-[10px] text-on-surface-variant">ALERTAS</p>' +
          '</div>' +
          '<div class="bg-surface-container-high rounded-lg p-2 text-center">' +
            '<p class="text-xl font-bold text-white">' + (weekPlan.totalMacros.calories/7).toFixed(0) + '</p>' +
            '<p class="text-[10px] text-on-surface-variant">KCAL</p>' +
          '</div>' +
        '</div>' +
        '<p class="text-sm text-white font-bold mb-2">DETALLE DE INGREDIENTES POR RECETA:</p>';

  allRecipes.forEach(function(issue, index) {
    var n = issue.result || {};
    var recipe = issue.recipe || {};
    var seguridad = n.nivel_seguridad || 'seguro';
    var bgClass = seguridad === 'riesgo_alto' ? 'bg-red-500/10 border-red-500/30' : (seguridad === 'moderado' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30');
    var icon = seguridad === 'riesgo_alto' ? 'dangerous' : (seguridad === 'moderado' ? 'error' : 'check_circle');
    var color = seguridad === 'riesgo_alto' ? 'text-red-400' : (seguridad === 'moderado' ? 'text-yellow-400' : 'text-green-400');

    html += '<div class="' + bgClass + ' border rounded-xl p-3 mb-3">' +
      '<div class="flex items-center justify-between mb-2 pb-2 border-b border-white/10">' +
        '<div class="flex items-center gap-2">' +
          '<span class="material-symbols-outlined ' + color + '">' + icon + '</span>' +
          '<span class="font-bold text-white">' + (recipe.title || 'Receta') + '</span>' +
        '</div>' +
        '<div class="flex items-center gap-3 text-xs">' +
          '<span class="' + color + '">Puntaje: ' + (n.puntaje_keto || 0) + '</span>' +
          '<span class="text-white/70">' + (n.total_carbohidratos_netos_receta || 0).toFixed(1) + 'g CN total</span>' +
        '</div>' +
      '</div>' +
      '<div class="space-y-1">';

    var ingList = n.ingredientes_analizados || [];
    if (ingList.length === 0) {
      html += '<p class="text-xs text-yellow-400">Sin ingredientes para analizar</p>';
    } else {
      html += '<div class="grid grid-cols-12 gap-1 text-[10px] text-on-surface-variant border-b border-white/10 pb-1 mb-1">' +
        '<div class="col-span-4">ALIMENTO</div>' +
        '<div class="col-span-2 text-center">CANT</div>' +
        '<div class="col-span-2 text-center">CN/100g</div>' +
        '<div class="col-span-2 text-center">CN_total</div>' +
        '<div class="col-span-2 text-center">NIVEL</div>' +
      '</div>';

      ingList.forEach(function(ing, ingIndex) {
        if (!ing) return;
        var ingColor = ing.nivel === 'critico' ? 'text-red-400' : (ing.nivel === 'moderado' ? 'text-yellow-400' : 'text-green-400');
        var nivelLabel = ing.nivel === 'critico' ? 'CRÍTICO' : (ing.nivel === 'moderado' ? 'MODERADO' : 'KETO');
        var bgRow = ing.nivel === 'critico' ? 'bg-red-500/20' : (ing.nivel === 'moderado' ? 'bg-yellow-500/20' : 'bg-green-500/10');
        var cantNum = parseFloat(ing.cantidad) || 100;
        var cnTotal = ((ing.carb_netos_estimados || 0) * cantNum / 100).toFixed(1);
        var isChangeable = ing.nivel === 'critico' || ing.nivel === 'moderado';
        var clickAction = isChangeable ? 'onclick="replaceIngredient(' + index + ',' + ingIndex + ')"' : '';
        var cursorStyle = isChangeable ? 'cursor-pointer hover:bg-white/20' : '';

        html += '<div ' + clickAction + ' class="grid grid-cols-12 gap-1 text-xs py-1 ' + bgRow + ' rounded ' + cursorStyle + '">' +
          '<div class="col-span-4 truncate font-medium flex items-center gap-1">' +
            (isChangeable ? '<span class="material-symbols-outlined text-[12px] ' + ingColor + '">swap_horiz</span>' : '') +
            (ing.nombre || '?') +
          '</div>' +
          '<div class="col-span-2 text-center text-white/80">' + cantNum + 'g</div>' +
          '<div class="col-span-2 text-center text-white/60">' + (ing.carb_netos_estimados ? ing.carb_netos_estimados.toFixed(1) + 'g' : '-') + '</div>' +
          '<div class="col-span-2 text-center ' + ingColor + ' font-bold">' + cnTotal + 'g</div>' +
          '<div class="col-span-2 text-center text-[10px] ' + ingColor + '">' + nivelLabel + '</div>' +
        '</div>';

        if (ing.sugerencia || ing.razon) {
          html += '<div class="flex items-start gap-1 text-[10px] text-white/60 py-1 px-2 italic border-l-2 border-primary-container/30 ml-1 my-1">' +
            '<span class="material-symbols-outlined text-[12px] text-primary-container">info</span>' +
            '<span>' + (ing.razon || ing.sugerencia || '') + '</span></div>';
        }
      });
    }

    html += '</div>' +
      '<div class="flex gap-2 mt-3 pt-2 border-t border-white/10">' +
        '<button onclick="acceptRecipeAsIs(' + index + ')" class="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20">Mantener</button>' +
        '<button onclick="replaceRecipe(' + index + ')" class="flex-1 py-2 rounded-lg bg-primary-container/20 text-primary-container text-xs font-medium hover:bg-primary-container/30">Cambiar</button>' +
      '</div>' +
    '</div>';
  });

  if (allRecipes.length === 0) {
    html += '<div class="text-center py-8 text-yellow-400">No hay recetas para analizar</div>';
  }

  html += '<div class="mt-4 pt-3 border-t border-white/10">' +
    '<button onclick="closeInspectorReview(); openShoppingConfirmation();" class="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg">CONFIRMAR → LISTA DE COMPRAS</button>' +
  '</div>' +
    '</div></div>';

  modal.innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeInspectorReview() {
  var modal = document.getElementById('inspectorReviewModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function acceptRecipeAsIs(index) {
  window.showToast('Receta mantenida', 2000);
}

function replaceIngredient(recipeIndex, ingIndex) {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan || !weekPlan.inspectorAnalysis) {
    window.showToast('No hay analisis', 2000);
    return;
  }

  var recipeAnalysis = weekPlan.inspectorAnalysis.recipesAnalyzed[recipeIndex];
  if (!recipeAnalysis || !recipeAnalysis.result || !recipeAnalysis.result.ingredientes_analizados) {
    window.showToast('Ingrediente no encontrado', 2000);
    return;
  }

  var ing = recipeAnalysis.result.ingredientes_analizados[ingIndex];
  if (!ing) {
    window.showToast('Ingrediente no encontrado', 2000);
    return;
  }

  var currentName = ing.nombre;
  var alternativas = [];

  if (KetoInspector && KetoInspector.getAlternativasInteligentes) {
    var smartResult = KetoInspector.getAlternativasInteligentes({
      nombre: currentName,
      nivel: ing.nivel,
      categoria: ing.razon || 'similar'
    });
    if (smartResult && smartResult.alternativas && smartResult.alternativas.length > 0) {
      alternativas = smartResult.alternativas;
    }
  }

  if (alternativas.length === 0 && KetoInspector && KetoInspector.getIngredientes) {
    var ketoIngredients = KetoInspector.getIngredientes();
    ketoIngredients.forEach(function(i) {
      if (i.nivel === 'seguro' && i.nombre !== currentName) {
        alternativas.push(i.nombre);
      }
    });
    alternativas = alternativas.slice(0, 5);
  }

  showIngredientAlternativesModal(recipeIndex, ingIndex, currentName, alternativas);
}

function showIngredientAlternativesModal(recipeIndex, ingIndex, currentName, alternativas) {
  var modal = document.getElementById('ingredientAltModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ingredientAltModal';
    modal.className = 'fixed inset-0 z-[95] hidden';
    document.body.appendChild(modal);
  }

  // Obtener info de carbos del ingrediente actual (si existe en el análisis)
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  var currentCarbs = 0;
  if (weekPlan && weekPlan.inspectorAnalysis) {
    var ra = weekPlan.inspectorAnalysis.recipesAnalyzed[recipeIndex];
    if (ra && ra.result && ra.result.ingredientes_analizados) {
      var ing = ra.result.ingredientes_analizados[ingIndex];
      if (ing) currentCarbs = (ing.carb_netos_estimados || 0);
    }
  }

  var html = '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeIngredientAltModal()"></div>' +
    '<div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">' +
      '<div class="bg-surface-container rounded-2xl p-5 w-full max-w-sm pointer-events-auto">' +
        '<h3 class="text-lg font-bold text-white mb-2">Cambiar Ingrediente</h3>' +
        '<p class="text-sm text-white/70 mb-1">Actual:</p>' +
        '<div class="flex items-center justify-between bg-red-500/10 rounded-lg p-3 mb-4">' +
          '<span class="text-red-400 font-medium">' + currentName + '</span>' +
          '<span class="text-xs text-white/60">' + currentCarbs.toFixed(1) + 'g CN/100g</span>' +
        '</div>' +
        '<p class="text-sm text-white/70 mb-2">Selecciona alternativa keto:</p>';

  if (!alternativas || alternativas.length === 0) {
    html += '<p class="text-on-surface-variant text-center py-4">No hay alternativas en base de datos</p>';
  } else {
    alternativas.forEach(function(alt) {
      html += '<div onclick="selectNewIngredient(' + recipeIndex + ',' + ingIndex + ',\'' + alt.replace(/'/g, "\\'") + '\')" class="bg-surface-container-high rounded-xl p-3 mb-2 cursor-pointer hover:bg-primary-container/20 transition-all border border-transparent hover:border-primary-container/30">' +
        '<div class="flex items-center justify-between">' +
          '<div class="flex items-center gap-2">' +
            '<span class="material-symbols-outlined text-green-400 text-sm">check_circle</span>' +
            '<span class="text-white font-medium">' + alt + '</span>' +
          '</div>' +
          '<span class="text-[10px] text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">KETO</span>' +
        '</div>' +
      '</div>';
    });
  }

  html += '<button onclick="closeIngredientAltModal()" class="w-full py-3 rounded-xl bg-surface-container text-white mt-4 hover:bg-surface-container-high transition-colors">Cancelar</button>' +
    '</div></div>';

  modal.innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeIngredientAltModal() {
  var modal = document.getElementById('ingredientAltModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function selectNewIngredient(recipeIndex, ingIndex, newName) {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan) return;

  var recipeAnalysis = weekPlan.inspectorAnalysis.recipesAnalyzed[recipeIndex];
  if (!recipeAnalysis) return;

  var dateKey = recipeAnalysis.dateKey;
  var mealType = recipeAnalysis.mealType;
  var analisisIng = recipeAnalysis.result.ingredientes_analizados[ingIndex];
  if (!analisisIng) return;

  var oldName = analisisIng.nombre;

  if (weekPlan.days && weekPlan.days[dateKey] && weekPlan.days[dateKey].meals && weekPlan.days[dateKey].meals[mealType]) {
    var meal = weekPlan.days[dateKey].meals[mealType];
    if (meal.recipe && meal.recipe.ingredients) {
      var ingList = meal.recipe.ingredients;
      for (var i = 0; i < ingList.length; i++) {
        var ingName = (ingList[i].name || ingList[i].nombre || '').toLowerCase();
        if (ingName === oldName.toLowerCase() || ingName.indexOf(oldName.toLowerCase()) >= 0) {
          ingList[i].name = newName;
          break;
        }
      }
    }
  }

  weekPlan.inspectorAnalysis = null;
  saveWeeklyPlan(weekPlan);
  closeIngredientAltModal();
  window.showToast('Cambiado: ' + newName, 2000);

  setTimeout(function() {
    weekPlan = analyzePlanWithInspector(weekPlan);
    saveWeeklyPlan(weekPlan);
    openPlanInspectorReviewWithPlan(weekPlan);
  }, 100);
}

function replaceRecipe(index) {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan || !weekPlan.inspectorAnalysis) {
    window.showToast('No hay análisis disponible', 2000);
    return;
  }

  var recipesAnalyzed = weekPlan.inspectorAnalysis.recipesAnalyzed || [];
  var issue = recipesAnalyzed[index];
  if (!issue) {
    window.showToast('Receta no encontrada', 2000);
    return;
  }

  var mealType = issue.mealType;
  if (KetoInspector && KetoInspector.buscarAlternativasReceta) {
    var alternativas = KetoInspector.buscarAlternativasReceta(mealType, [issue.recipe.id]);
    showAlternativesModal(index, mealType, alternativas);
  } else {
    window.showToast('Inspector no disponible', 2000);
  }
}

function showAlternativesModal(originalIndex, mealType, alternativas) {
  if (!alternativas || alternativas.length === 0) {
    window.showToast('No hay alternativas seguras para ' + mealType, 3000, 'warning');
    return;
  }

  var modal = document.getElementById('alternativesModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'alternativesModal';
    modal.className = 'fixed inset-0 z-[90] hidden';
    document.body.appendChild(modal);
  }

  var html = '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeAlternativesModal()"></div>' +
    '<div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">' +
      '<div class="bg-surface-container rounded-2xl p-5 w-full max-w-md pointer-events-auto max-h-[80vh] overflow-y-auto">' +
        '<div class="flex items-center justify-between mb-4">' +
          '<h3 class="text-lg font-headline font-bold text-white">Alternativas Keto</h3>' +
          '<button onclick="closeAlternativesModal()" class="w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10">' +
            '<span class="material-symbols-outlined text-lg">close</span>' +
          '</button>' +
        '</div>' +
        '<p class="text-sm text-on-surface-variant mb-4">Selecciona una alternativa para ' + mealType + ':</p>';

  alternativas.forEach(function(alt, i) {
    html += '<div onclick="selectAlternative(' + originalIndex + ', \'' + alt.id + '\')" class="bg-surface-container-high rounded-xl p-3 mb-2 cursor-pointer hover:bg-surface-container-highest transition-colors">' +
      '<div class="flex items-center justify-between">' +
        '<span class="font-medium text-white">' + alt.title + '</span>' +
        '<span class="text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded">KETO</span>' +
      '</div>' +
      '<div class="flex items-center gap-3 text-xs text-on-surface-variant mt-1">' +
        '<span>' + alt.calories + ' kcal</span>' +
        '<span>' + alt.netCarbs + 'g CN</span>' +
        '<span>Puntaje: ' + alt.puntaje_keto + '</span>' +
      '</div>' +
    '</div>';
  });

  html += '<button onclick="closeAlternativesModal()" class="w-full py-3 rounded-xl bg-surface-container text-white font-medium mt-4">Cancelar</button>' +
    '</div></div>';

  modal.innerHTML = html;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAlternativesModal() {
  var modal = document.getElementById('alternativesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function selectAlternative(originalIndex, newRecipeId) {
  var weekPlan = typeof loadWeeklyPlan === 'function' ? loadWeeklyPlan() : null;
  if (!weekPlan) return;

  var newRecipe = KETO_RECIPES ? KETO_RECIPES[newRecipeId] : null;
  if (!newRecipe) {
    window.showToast('Receta no encontrada', 2000);
    return;
  }

  var recipesAnalyzed = weekPlan.inspectorAnalysis.recipesAnalyzed || [];
  var issue = recipesAnalyzed[originalIndex];
  if (!issue) return;

  var dateKey = issue.dateKey;
  var mealType = issue.mealType;

  if (weekPlan.days[dateKey] && weekPlan.days[dateKey].meals[mealType]) {
    weekPlan.days[dateKey].meals[mealType].recipe = newRecipe;
  }

  saveWeeklyPlan(weekPlan);
  closeAlternativesModal();
  window.showToast('Receta reemplazada: ' + newRecipe.title, 2000);
  openPlanInspectorReview();
}

console.log('[PlanInspectorModal] Cargado');
