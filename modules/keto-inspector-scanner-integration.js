/*
 * Integracion opcional del Inspector Keto para scanner.html.
 * Clasifica producto por texto ingresado (simulacion de escaner de etiquetas).
 */
(function (globalScope) {
  'use strict';

  function riskColor(level) {
    if (level === 'critico') return 'text-red-400 border-red-500/30 bg-red-500/10';
    if (level === 'moderado') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    return 'text-green-400 border-green-500/30 bg-green-500/10';
  }

  function renderScanRisk(result) {
    var panel = document.getElementById('scanRiskPanel');
    if (!panel) return;

    var level = result && result.nivel_riesgo ? result.nivel_riesgo : 'seguro';
    var matches = result && Array.isArray(result.coincidencias) ? result.coincidencias : [];

    var html = '';
    html += '<div class="rounded-xl border p-3 ' + riskColor(level) + '">';
    html += '<p class="text-xs uppercase tracking-wider mb-1">Inspector Keto</p>';
    html += '<p class="font-bold text-sm">Nivel detectado: ' + level.toUpperCase() + '</p>';
    if (matches.length > 0) {
      html += '<p class="text-xs mt-1">Coincidencias: ' + matches.slice(0, 2).map(function (m) { return m.nombre; }).join(', ') + '</p>';
    } else {
      html += '<p class="text-xs mt-1">Sin coincidencias directas en base de riesgo.</p>';
    }
    html += '</div>';

    panel.innerHTML = html;
  }

  function install() {
    if (!globalScope.inspectorKeto) return;
    var input = document.getElementById('product-name');
    if (!input) return;

    if (!document.getElementById('scanRiskPanel')) {
      var panel = document.createElement('div');
      panel.id = 'scanRiskPanel';
      panel.className = 'mt-3';
      input.parentNode.insertBefore(panel, input.nextSibling);
    }

    input.addEventListener('input', function () {
      var text = input.value || '';
      var result = globalScope.inspectorKeto.inspeccionarProductoTexto(text);
      renderScanRisk(result);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})(typeof window !== 'undefined' ? window : globalThis);
