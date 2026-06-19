/*
 * UI helpers para Inspector Keto.
 */
(function (globalScope) {
  'use strict';

  var levelMeta = {
    critico: {
      icon: 'dangerous',
      label: 'CRITICO',
      className: 'text-red-400 bg-red-500/15 border border-red-500/30'
    },
    moderado: {
      icon: 'warning',
      label: 'MODERADO',
      className: 'text-yellow-400 bg-yellow-500/15 border border-yellow-500/30'
    },
    seguro: {
      icon: 'verified',
      label: 'SEGURO',
      className: 'text-green-400 bg-green-500/15 border border-green-500/30'
    }
  };

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getMeta(level) {
    return levelMeta[level] || levelMeta.moderado;
  }

  function renderRiskBadge(level) {
    var meta = getMeta(level);
    return '<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase ' + meta.className + '">' +
      '<span class="material-symbols-outlined text-xs">' + meta.icon + '</span>' + meta.label +
      '</span>';
  }

  function renderRecipeReport(report, options) {
    var opts = options || {};
    var ingredients = report && report.ingredientes_analizados ? report.ingredientes_analizados : [];

    var html = '';
    html += '<div class="space-y-4">';
    html += '<div class="bg-surface-container-high rounded-xl p-4">';
    html += '<div class="flex items-center justify-between gap-3">';
    html += '<div>';
    html += '<p class="text-xs uppercase tracking-wider text-on-surface-variant">Inspector Keto</p>';
    html += '<h3 class="text-lg font-bold text-white">' + escapeHtml(report.nombre_original || 'Receta') + '</h3>';
    html += '</div>';
    html += '<div class="text-right">';
    html += '<p class="text-xs text-on-surface-variant">Puntaje</p>';
    html += '<p class="text-2xl font-black text-white">' + escapeHtml(report.puntaje_keto) + '</p>';
    html += '</div>';
    html += '</div>';
    html += '<div class="grid grid-cols-2 gap-3 mt-3 text-sm">';
    html += '<div class="bg-surface-container rounded-lg p-3"><p class="text-on-surface-variant text-xs">Carbs netos receta</p><p class="font-bold text-cyan-400">' + escapeHtml(report.total_carbohidratos_netos_receta) + 'g</p></div>';
    html += '<div class="bg-surface-container rounded-lg p-3"><p class="text-on-surface-variant text-xs">Carbs por porcion</p><p class="font-bold text-cyan-400">' + escapeHtml(report.carbohidratos_netos_por_porcion) + 'g</p></div>';
    html += '</div>';
    html += '<p class="mt-3 text-xs text-on-surface-variant">' + escapeHtml(report.porcion_sugerida || '') + '</p>';
    html += '</div>';

    html += '<div class="space-y-2 max-h-64 overflow-y-auto pr-1">';
    ingredients.forEach(function (item) {
      html += '<div class="bg-surface-container rounded-lg p-3">';
      html += '<div class="flex items-center justify-between gap-2">';
      html += '<p class="font-medium text-white text-sm">' + escapeHtml(item.nombre) + '</p>';
      html += renderRiskBadge(item.nivel);
      html += '</div>';
      html += '<p class="text-xs text-on-surface-variant mt-1">' + escapeHtml(item.cantidad || '') + ' | ' + escapeHtml(item.carb_netos_estimados) + 'g netos</p>';
      html += '<p class="text-xs text-on-surface-variant mt-1">' + escapeHtml(item.sugerencia || '') + '</p>';
      html += '</div>';
    });
    html += '</div>';

    if (opts.showOptimized !== false && report.receta_optimizada) {
      html += '<div class="bg-green-500/10 border border-green-500/20 rounded-xl p-3">';
      html += '<p class="text-xs uppercase tracking-wider text-green-400">Version optimizada</p>';
      html += '<p class="text-sm text-white mt-1">' + escapeHtml(report.receta_optimizada.nombre || '') + '</p>';
      html += '<p class="text-xs text-on-surface-variant mt-1">Carbs/porcion: ' + escapeHtml(report.receta_optimizada.carbs_netos_por_porcion) + 'g | Puntaje: ' + escapeHtml(report.receta_optimizada.puntaje_keto_estimado) + '</p>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function showRecipeModal(report, handlers) {
    var opts = handlers || {};
    var modal = document.getElementById('ketoInspectorModal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ketoInspectorModal';
      modal.className = 'fixed inset-0 z-[95] hidden';
      document.body.appendChild(modal);
    }

    var content = '';
    content += '<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" data-close="1"></div>';
    content += '<div class="absolute inset-0 flex items-center justify-center p-4">';
    content += '<div class="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-surface-container border border-white/10 flex flex-col">';
    content += '<div class="px-5 py-4 border-b border-white/10 flex items-center justify-between">';
    content += '<h3 class="text-lg font-bold text-white">Reporte del Inspector Keto</h3>';
    content += '<button class="w-10 h-10 rounded-full hover:bg-white/10 text-white/70" data-close="1"><span class="material-symbols-outlined">close</span></button>';
    content += '</div>';
    content += '<div class="p-5 overflow-y-auto">' + renderRecipeReport(report) + '</div>';
    content += '<div class="p-4 border-t border-white/10 flex gap-2">';
    content += '<button id="ketoUseOriginal" class="flex-1 py-3 rounded-xl bg-surface-container-high text-white font-medium hover:bg-surface-container-highest">Usar original</button>';
    content += '<button id="ketoUseOptimized" class="flex-1 py-3 rounded-xl bg-primary-container text-white font-bold hover:opacity-90">Aceptar version optimizada</button>';
    content += '</div>';
    content += '</div>';
    content += '</div>';

    modal.innerHTML = content;
    modal.classList.remove('hidden');

    function closeModal() {
      modal.classList.add('hidden');
      if (typeof opts.onClose === 'function') opts.onClose();
    }

    modal.querySelectorAll('[data-close="1"]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    var btnOriginal = document.getElementById('ketoUseOriginal');
    if (btnOriginal) {
      btnOriginal.addEventListener('click', function () {
        closeModal();
        if (typeof opts.onUseOriginal === 'function') opts.onUseOriginal();
      });
    }

    var btnOptimized = document.getElementById('ketoUseOptimized');
    if (btnOptimized) {
      btnOptimized.addEventListener('click', function () {
        closeModal();
        if (typeof opts.onUseOptimized === 'function') opts.onUseOptimized();
      });
    }
  }

  globalScope.ketoInspectorUI = {
    renderRiskBadge: renderRiskBadge,
    renderRecipeReport: renderRecipeReport,
    showRecipeModal: showRecipeModal
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = globalScope.ketoInspectorUI;
  }
})(typeof window !== 'undefined' ? window : globalThis);
