// ==================== MOTOR DE AUTOMATIZACIONES KETO ====================
// Analiza datos del usuario y dispara acciones proactivas sin intervención
// Versión: 1.0

var KetoAutomations = (function () {
  'use strict';

  var ALERTS_KEY      = 'keto_automation_alerts';
  var CELEBRATED_KEY  = 'keto_automation_celebrated';

  // ── helpers ────────────────────────────────────────────────────────────
  function safeJSON(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }

  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function daysAgo(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  }

  // ── data readers ───────────────────────────────────────────────────────
  function getWeightHistory() {
    var h = safeJSON('keto_weight_history', []);
    if (!Array.isArray(h)) return [];
    return h.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  }

  function getMacrosTarget() {
    return safeJSON('keto_macros', { calories: 1800, protein: 150, fat: 140, carbs: 25 });
  }

  function getStreak() {
    return safeJSON('ketoStreak', { ketoDays: 0 });
  }

  function getDailyMacros(daysBack) {
    var rows = [];
    for (var i = 0; i < daysBack; i++) {
      var key  = daysAgo(i);
      var plan = safeJSON('mealPlan_' + key, {});
      var cal = 0, carbs = 0, protein = 0, fat = 0;
      Object.keys(plan).forEach(function (meal) {
        if (!Array.isArray(plan[meal])) return;
        plan[meal].forEach(function (item) {
          var t = KetoMealPlan.itemTotals(item);
          cal     += t.calories;
          carbs   += t.carbs;
          protein += t.protein;
          fat     += t.fat;
        });
      });
      rows.push({ date: key, cal: Math.round(cal), carbs: Math.round(carbs), protein: Math.round(protein), fat: Math.round(fat) });
    }
    return rows;
  }

  // ── rules ──────────────────────────────────────────────────────────────

  // Regla 1: Peso estancado — variación ≤ 0.5 kg en los últimos 14 días con ≥ 4 registros
  function ruleWeightStall() {
    var history = getWeightHistory();
    var cutoff  = daysAgo(14);
    var recent  = history.filter(function (e) { return e.date >= cutoff; });
    if (recent.length < 4) return null;

    var vals = recent.map(function (e) { return parseFloat(e.weight); });
    var range = Math.max.apply(null, vals) - Math.min.apply(null, vals);
    if (range > 0.5) return null;

    return {
      id: 'weight_stall',
      type: 'warning',
      icon: 'scale',
      title: 'Peso estancado',
      message: 'Tu peso ha variado menos de 0.5 kg en 14 días. Podría ser momento de revisar calorías o agregar un día de recarga estratégica.',
      action: 'ask_coach',
      actionLabel: 'Consultar al Coach',
      actionQuery: '¿Por qué está estancado mi peso y qué puedo hacer para retomar la pérdida de grasa?',
      priority: 3
    };
  }

  // Regla 2: Carbohidratos excedidos 3+ días consecutivos
  function ruleCarbsExceeded() {
    var target  = getMacrosTarget();
    var limit   = (parseInt(target.carbs) || 25) * 1.5;
    var daily   = getDailyMacros(7);

    var streak = 0;
    for (var i = 0; i < daily.length; i++) {
      var d = daily[i];
      if (d.carbs > 0 && d.carbs > limit) {
        streak++;
        if (streak >= 3) break;
      } else if (d.carbs > 0) {
        streak = 0;
      }
    }

    if (streak < 3) return null;

    return {
      id: 'carbs_exceeded',
      type: 'error',
      icon: 'warning',
      title: 'Carbohidratos elevados ' + streak + ' días seguidos',
      message: 'Has excedido tu meta de carbohidratos (' + Math.round(limit) + 'g) por ' + streak + ' días consecutivos. Esto puede interrumpir la cetosis.',
      action: 'ask_coach',
      actionLabel: 'Protocolo correctivo',
      actionQuery: '¿Qué protocolo correctivo debo seguir después de exceder mis carbohidratos varios días seguidos?',
      priority: 4
    };
  }

  // Regla 3: Proteína baja 3+ días
  function ruleLowProtein() {
    var target   = getMacrosTarget();
    var minProt  = (parseInt(target.protein) || 150) * 0.75;
    var daily    = getDailyMacros(7);

    var lowDays = daily.filter(function (d) {
      return d.protein > 0 && d.protein < minProt;
    }).length;

    if (lowDays < 3) return null;

    return {
      id: 'low_protein',
      type: 'info',
      icon: 'egg',
      title: 'Proteína insuficiente',
      message: 'Tu consumo de proteína ha estado por debajo del 75 % de tu meta en ' + lowDays + ' días de la semana. En keto es clave para preservar músculo.',
      action: 'ask_coach',
      actionLabel: 'Tips de proteína',
      actionQuery: '¿Cómo puedo aumentar mi consumo de proteína en una dieta keto?',
      priority: 2
    };
  }

  // Regla 4: Racha de 7 días
  function ruleStreak7() {
    var streak      = getStreak();
    var ketoDays    = parseInt(streak.ketoDays) || 0;
    var celebrated  = safeJSON(CELEBRATED_KEY, {});
    if (ketoDays >= 7 && !celebrated['streak_7']) {
      return {
        id: 'streak_7',
        type: 'success',
        icon: 'local_fire_department',
        title: '¡7 días de racha keto!',
        message: 'Una semana completa en tu plan. Tu cuerpo está en transición cetogénica plena. ¡Sigue así!',
        action: 'celebrate',
        actionLabel: 'Ver logros',
        priority: 1
      };
    }
    return null;
  }

  // Regla 5: Racha de 21 días — cumplimiento excelente
  function ruleStreak21() {
    var streak      = getStreak();
    var ketoDays    = parseInt(streak.ketoDays) || 0;
    var celebrated  = safeJSON(CELEBRATED_KEY, {});
    if (ketoDays >= 21 && !celebrated['streak_21']) {
      return {
        id: 'streak_21',
        type: 'success',
        icon: 'emoji_events',
        title: '¡21 días en cetosis!',
        message: '¡Extraordinario! 21 días de disciplina keto. Tu metabolismo está optimizado para quemar grasa de manera eficiente.',
        action: 'celebrate',
        actionLabel: 'Ver logros',
        priority: 1
      };
    }
    return null;
  }

  // ── alert store ────────────────────────────────────────────────────────
  function getAlerts() {
    return safeJSON(ALERTS_KEY, []);
  }

  function upsertAlert(alert) {
    var alerts = getAlerts();
    var idx = -1;
    for (var i = 0; i < alerts.length; i++) {
      if (alerts[i].id === alert.id) { idx = i; break; }
    }
    alert.createdAt = alert.createdAt || new Date().toISOString();
    if (idx >= 0) alerts[idx] = alert; else alerts.unshift(alert);
    saveJSON(ALERTS_KEY, alerts.slice(0, 10));
  }

  function removeAlert(id) {
    saveJSON(ALERTS_KEY, getAlerts().filter(function (a) { return a.id !== id; }));
  }

  function clearAlert(id) {
    removeAlert(id);
    // Marcar celebraciones como vistas para no repetir
    if (id === 'streak_21' || id === 'streak_7') {
      var c = safeJSON(CELEBRATED_KEY, {});
      c[id] = true;
      saveJSON(CELEBRATED_KEY, c);
    }
  }

  // ── event bus ──────────────────────────────────────────────────────────
  var _handlers = {};

  function on(event, handler) {
    if (!_handlers[event]) _handlers[event] = [];
    _handlers[event].push(handler);
  }

  function emit(event, data) {
    (_handlers[event] || []).forEach(function (h) { try { h(data); } catch (e) {} });
  }

  // ── main ───────────────────────────────────────────────────────────────
  var PERSISTENT_RULES = ['weight_stall', 'carbs_exceeded', 'low_protein'];

  function check() {
    var rules = [ruleWeightStall, ruleCarbsExceeded, ruleLowProtein, ruleStreak7, ruleStreak21];
    var triggered = [];

    rules.forEach(function (rule) {
      try {
        var result = rule();
        if (result) { upsertAlert(result); triggered.push(result.id); }
      } catch (e) {
        console.warn('[KetoAutomations] Rule error:', e);
      }
    });

    // Limpiar alertas persistentes que ya no aplican
    PERSISTENT_RULES.forEach(function (id) {
      if (triggered.indexOf(id) < 0) removeAlert(id);
    });

    return getAlerts();
  }

  function autoRun() {
    var alerts = check();
    if (alerts.length > 0) emit('alerts', alerts);
    return alerts;
  }

  // Escucha cambios en localStorage (otras pestañas o módulos)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', function (e) {
      if (e.key && (
        e.key.startsWith('mealPlan_') ||
        e.key === 'keto_weight_history' ||
        e.key === 'ketoStreak'
      )) {
        var alerts = check();
        if (alerts.length > 0) emit('alerts', alerts);
      }
    });
  }

  return {
    check: check,
    autoRun: autoRun,
    getAlerts: getAlerts,
    clearAlert: clearAlert,
    on: on,
    emit: emit
  };
})();

if (typeof window !== 'undefined') window.KetoAutomations = KetoAutomations;
if (typeof module !== 'undefined' && module.exports) module.exports = KetoAutomations;
