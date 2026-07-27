/* KetoCore v3 — DayBudget: presupuesto de carbos variable (baseLimit + trainingBonus - used).
   Fase 1 del rediseño v3 (design_handoff_ketocore_v3/README.md). Aditivo: no reemplaza
   keto_macros/mealPlan_*, solo los lee. Ninguna pantalla de producción lo consume todavía. */
(function () {
  'use strict';

  function parseJSON(value, fallback) {
    if (typeof safeParseJSON === 'function') return safeParseJSON(value, fallback);
    if (!value || value === 'null' || value === 'undefined') return fallback;
    try { var p = JSON.parse(value); return p !== null ? p : fallback; } catch (e) { return fallback; }
  }

  function todayKey() {
    if (typeof getTodayKey === 'function') return getTodayKey();
    return new Date().toISOString().slice(0, 10);
  }

  function getBaseLimit() {
    var macros = parseJSON(localStorage.getItem('keto_macros'), {});
    var carbs = Number(macros.carbs);
    return carbs > 0 ? carbs : 25;
  }

  function getTodayUsed() {
    var plan = parseJSON(localStorage.getItem('mealPlan_' + todayKey()), {});
    var total = 0;
    Object.keys(plan).forEach(function (slot) {
      var items = plan[slot];
      if (!Array.isArray(items)) return;
      items.forEach(function (item) {
        var c = Number(item && item.carbs);
        if (!isNaN(c)) total += c;
      });
    });
    return Math.round(total * 10) / 10;
  }

  // TODO(nutrition-validation): valores de la tabla SIN VALIDAR — puestos en 0
  // a propósito. Ningún número real debe salir de aquí hasta que un profesional
  // de nutrición deportiva revise y firme la tabla. Los +7g/+4g del prototipo del
  // handoff son solo ejemplos de referencia, no valores de producción.
  var TRAINING_BONUS_TABLE = {
    strength:      { low: 0, moderate: 0, high: 0 },
    cardio:        { low: 0, moderate: 0, high: 0 },
    fasted_cardio: { low: 0, moderate: 0, high: 0 }
  };

  function trainingBonus(type, durationMin, intensity) {
    var perSession = (TRAINING_BONUS_TABLE[type] || {})[intensity] || 0;
    var minutes = Number(durationMin) > 0 ? Number(durationMin) : 0;
    return Math.round(perSession * (minutes / 45)); // escalado sobre una sesión de referencia de 45min
  }

  function getTodayTrainingBonus() {
    var workouts = parseJSON(localStorage.getItem('ketoWorkouts'), []);
    if (!Array.isArray(workouts)) return { bonus: 0, reason: null };
    var today = todayKey();
    var session = workouts.find(function (w) { return w && w.date === today; });
    if (!session) return { bonus: 0, reason: null };
    var bonus = trainingBonus(session.type || 'strength', session.duration, session.intensity || 'moderate');
    return { bonus: bonus, reason: bonus > 0 ? 'Bonus por entreno de hoy' : null };
  }

  function compute() {
    var baseLimit = getBaseLimit();
    var trainingInfo = getTodayTrainingBonus();
    var limit = baseLimit + trainingInfo.bonus;
    var used = getTodayUsed();
    var available = Math.round((limit - used) * 10) / 10;

    var state = 'ok';
    if (available <= 0) state = 'over';
    else if (available <= limit * 0.15) state = 'warn';

    return {
      baseLimit: baseLimit,
      trainingBonus: trainingInfo.bonus,
      limit: limit,
      used: used,
      available: available,
      state: state,
      bonusReason: trainingInfo.reason
    };
  }

  function refresh() {
    var result = compute();
    document.documentElement.toggleAttribute('data-v3-alert', result.state === 'over');
    document.dispatchEvent(new CustomEvent('v3:budget-changed', { detail: result }));
    return result;
  }

  window.KetoBudget = {
    getBaseLimit: getBaseLimit,
    getTodayUsed: getTodayUsed,
    getTodayTrainingBonus: getTodayTrainingBonus,
    trainingBonus: trainingBonus,
    compute: compute,
    refresh: refresh
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
