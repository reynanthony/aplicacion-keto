/* KetoCore v3 — KetoVeredicto: hoja "Veredicto" (decidir si un alimento entra
   en el día). inspectorKeto.js no expone inferRiskLevel() en su API pública
   (solo getRules/inspeccionar*), así que aquí se replica la misma comparación
   de 3 líneas usando los umbrales REALES de getRules() — no se inventan
   números nuevos, solo se llama el mismo getters que usa el módulo original. */
(function () {
  'use strict';

  var current = { candidate: null, opts: null };

  function classify(carbsPerServing, carbs100) {
    var rules = (window.inspectorKeto && window.inspectorKeto.getRules)
      ? window.inspectorKeto.getRules()
      : { limiteCriticoCarbsPorPorcion: 10, limiteModeradoCarbsPorPorcion: 6 };
    if (carbsPerServing >= rules.limiteCriticoCarbsPorPorcion || carbs100 >= 20) return 'orange';
    if (carbsPerServing >= rules.limiteModeradoCarbsPorPorcion || carbs100 >= 6) return 'amber';
    return 'lime';
  }

  function els() {
    return {
      sheet: document.getElementById('v3-sheet-veredicto'),
      name: document.getElementById('vNameInput'),
      bar: document.getElementById('vBarTrack'),
      sentence: document.getElementById('vSentence'),
      kcal: document.getElementById('vTileKcal'),
      netos: document.getElementById('vTileNetos'),
      grasa: document.getElementById('vTileGrasa'),
      prot: document.getElementById('vTileProt'),
      qty: document.getElementById('vQtyInput'),
      qtyMinus: document.getElementById('vQtyMinus'),
      qtyPlus: document.getElementById('vQtyPlus'),
      verdictWrap: document.getElementById('vVerdictChipWrap'),
      addBtn: document.getElementById('vAddBtn'),
      subtitle: document.querySelector('#v3-sheet-veredicto .v3-sheet-subtitle')
    };
  }

  function recompute() {
    var e = els();
    if (!e.sheet) return;
    var budget = window.KetoBudget ? window.KetoBudget.compute() : { available: 0, limit: 0 };
    var netos = parseFloat(e.netos.value) || 0;
    var after = Math.max(0, budget.available - netos);

    if (e.subtitle) e.subtitle.textContent = 'Margen de hoy · ' + Math.round(budget.available) + ' g netos';

    var pctBefore = budget.limit > 0 ? Math.min(100, (budget.available / budget.limit) * 100) : 0;
    var pctAfter = budget.limit > 0 ? Math.min(100, (after / budget.limit) * 100) : 0;
    if (e.bar) e.bar.style.width = pctAfter + '%';
    if (e.sentence) {
      e.sentence.textContent = Math.round(budget.available) + 'g → ' + Math.round(after) + 'g libres. '
        + (after > 0 ? 'Sigue quedando margen para hoy.' : 'Hoy se agota el margen con este alimento.');
    }
    void pctBefore;

    var carbs100 = parseFloat(e.netos.dataset.carbs100 || '0') || 0;
    var verdict = classify(netos, carbs100);
    if (e.verdictWrap) {
      var chip = e.verdictWrap.querySelector('.v3-chip');
      if (chip) {
        chip.className = 'v3-chip v3-chip--verdict v3-chip--verdict-' + verdict;
        chip.textContent = verdict === 'lime' ? 'Keto' : (verdict === 'amber' ? 'Moderar' : 'Evitar');
      }
    }
  }

  function open(candidate, opts) {
    current = { candidate: candidate || {}, opts: opts || {} };
    var e = els();
    if (!e.sheet) return;

    e.name.value = candidate && candidate.name ? candidate.name : '';
    e.kcal.value = (candidate && candidate.calories) || 0;
    e.netos.value = (candidate && candidate.carbs) || 0;
    e.netos.dataset.carbs100 = (candidate && candidate.carbohidratos_netos_100g) || 0;
    e.grasa.value = (candidate && candidate.fat) || 0;
    e.prot.value = (candidate && candidate.protein) || 0;
    e.qty.value = (candidate && candidate.portion) || 100;

    recompute();
    window.KetoSheet.open('v3-sheet-veredicto');
  }

  function stepQty(delta) {
    var e = els();
    var v = Math.max(10, (parseFloat(e.qty.value) || 100) + delta);
    e.qty.value = v;
    recompute();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var e = els();
    if (!e.sheet) return;

    [e.kcal, e.netos, e.grasa, e.prot, e.qty].forEach(function (input) {
      if (input) input.addEventListener('input', recompute);
    });
    if (e.qtyMinus) e.qtyMinus.addEventListener('click', function () { stepQty(-10); });
    if (e.qtyPlus) e.qtyPlus.addEventListener('click', function () { stepQty(10); });

    if (e.addBtn) e.addBtn.addEventListener('click', function () {
      var item = {
        name: e.name.value || 'Alimento',
        portion: parseFloat(e.qty.value) || 100,
        calories: parseFloat(e.kcal.value) || 0,
        fat: parseFloat(e.grasa.value) || 0,
        protein: parseFloat(e.prot.value) || 0,
        carbs: parseFloat(e.netos.value) || 0
      };
      window.KetoMealLog.logItem(window.KetoMealLog.inferMealSlot(), item);
      window.KetoSheet.close('v3-sheet-veredicto');

      if (current.opts && current.opts.redirectAfterAdd) {
        setTimeout(function () { window.location.href = '/app/'; }, 400);
      }
    });
  });

  window.KetoVeredicto = { open: open };
})();
