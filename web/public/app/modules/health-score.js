// ==================== HEALTH SCORE ENGINE - KetoCore ====================
// Puntuación unificada 0-100: adherencia, macros, peso, ejercicio

var HealthScoreEngine = (function() {
  'use strict';

  function todayKey() {
    return new Date().toISOString().split('T')[0];
  }

  // Adherencia checklist últimos 7 días: 0-35 pts
  function checklistScore() {
    var total = 0;
    var days = 0;
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key = 'checklist_' + d.toISOString().split('T')[0];
      var data = safeParseJSON(localStorage.getItem(key), null);
      if (!data) continue;
      days++;
      var completed = Object.values(data).filter(function(v) { return v === true; }).length;
      total += Math.min(completed, 6);
    }
    if (!days) return 0;
    return Math.min(35, Math.round((total / (days * 6)) * 35));
  }

  // Cumplimiento de macros hoy: 0-25 pts
  function macrosScore() {
    var targets = safeParseJSON(localStorage.getItem('keto_macros'), {});
    var calTarget = parseInt(targets.calories) || 0;
    if (!calTarget) return 0;

    var mealPlan = safeParseJSON(localStorage.getItem('mealPlan_' + todayKey()), {});
    var consumed = 0;
    Object.keys(mealPlan).forEach(function(meal) {
      if (Array.isArray(mealPlan[meal])) {
        mealPlan[meal].forEach(function(item) {
          consumed += KetoMealPlan.itemTotals(item).calories;
        });
      }
    });

    if (!consumed) return 0;
    var ratio = consumed / calTarget;
    if (ratio >= 0.85 && ratio <= 1.05) return 25;
    if (ratio >= 0.70) return 18;
    if (ratio > 1.05 && ratio <= 1.20) return 12;
    return 5;
  }

  // Progreso hacia objetivo de peso: 0-25 pts
  function weightScore() {
    var profile = safeParseJSON(localStorage.getItem('keto_profile'), {});
    var history = safeParseJSON(localStorage.getItem('keto_weight_history'), []);
    if (!Array.isArray(history) || !history.length) return 10;

    var startW = parseFloat(profile.startWeight || profile.pesoInicial) || 0;
    var goalW  = parseFloat(profile.goalWeight  || profile.pesoObjetivo) || 0;
    if (!startW || !goalW) return 10;

    var sorted   = history.slice().sort(function(a, b) { return new Date(b.date || b.fecha) - new Date(a.date || a.fecha); });
    var currentW = sorted[0].weight || sorted[0].peso || 0;
    if (!currentW) return 10;

    var totalToLose = Math.abs(startW - goalW);
    if (totalToLose <= 0) return 25;
    var lost = Math.abs(startW - currentW);
    return Math.min(25, Math.round((lost / totalToLose) * 25));
  }

  // Ejercicio últimos 7 días: 0-15 pts
  function exerciseScore() {
    var sessions = 0;
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key = 'checklist_' + d.toISOString().split('T')[0];
      var data = safeParseJSON(localStorage.getItem(key), {});
      if ((data.workout && data.workout > 0) || data.entrenamiento === true) sessions++;
    }
    if (sessions >= 4) return 15;
    if (sessions >= 3) return 12;
    if (sessions >= 2) return 8;
    if (sessions >= 1) return 5;
    return 0;
  }

  function calculate() {
    var cl  = checklistScore();
    var mac = macrosScore();
    var wt  = weightScore();
    var ex  = exerciseScore();
    var total = cl + mac + wt + ex;

    var label, color;
    if      (total >= 80) { label = 'Excelente'; color = '#22c55e'; }
    else if (total >= 60) { label = 'Bueno';     color = '#ffb300'; }
    else if (total >= 40) { label = 'Regular';   color = '#ff7351'; }
    else                  { label = 'Iniciando'; color = '#adaaaa'; }

    return {
      total: total,
      breakdown: { checklist: cl, macros: mac, weight: wt, exercise: ex },
      label: label,
      color: color
    };
  }

  return { calculate: calculate };
})();
