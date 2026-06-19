// ==================== RECOMMENDATION ENGINE - KetoCore ====================
// Coordina perfil → plan diario de acciones. Lee datos existentes, no los reemplaza.

var RecommendationEngine = (function() {
  'use strict';

  function todayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function buildGreeting(name) {
    var h = new Date().getHours();
    var saludo = h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches';
    return { saludo: saludo, nombre: name || 'Campeón' };
  }

  function objectiveLabel(profile) {
    var map = {
      'perder_grasa':      'Perder grasa',
      'fat_loss':          'Perder grasa',
      'ganar_musculo':     'Ganar músculo',
      'muscle_gain':       'Ganar músculo',
      'mantenimiento':     'Mantenimiento',
      'maintenance':       'Mantenimiento',
      'salud_metabolica':  'Salud metabólica',
      'rendimiento':       'Rendimiento deportivo'
    };
    return map[profile.objetivo] || map[profile.goal] || 'Define tu objetivo';
  }

  function calcWeightProgress(profile, history) {
    if (!history.length) return null;
    var sorted   = history.slice().sort(function(a, b) { return new Date(b.date || b.fecha) - new Date(a.date || a.fecha); });
    var currentW = sorted[0].weight || sorted[0].peso || 0;
    var startW   = parseFloat(profile.startWeight || profile.pesoInicial) || currentW;
    var goalW    = parseFloat(profile.goalWeight  || profile.pesoObjetivo) || 0;
    if (!currentW || !goalW) return null;

    var totalToLose = Math.abs(startW - goalW);
    var lost        = Math.abs(startW - currentW);
    var remaining   = Math.abs(currentW - goalW);
    var percent     = totalToLose > 0 ? Math.min(100, Math.round((lost / totalToLose) * 100)) : 0;
    return { current: currentW, goal: goalW, lost: +lost.toFixed(1), remaining: +remaining.toFixed(1), percent: percent };
  }

  function calcNextMilestone(profile, history) {
    if (!history.length) return null;
    var sorted   = history.slice().sort(function(a, b) { return new Date(b.date || b.fecha) - new Date(a.date || a.fecha); });
    var currentW = sorted[0].weight || sorted[0].peso || 0;
    var startW   = parseFloat(profile.startWeight || profile.pesoInicial) || currentW;
    if (!currentW || !startW) return null;

    var lost = Math.abs(startW - currentW);
    var step = 2.3; // ~5 lbs
    var nextAt = Math.ceil((lost + 0.01) / step) * step;
    var needed = nextAt - lost;
    if (needed <= 0 || needed > step) return null;
    return { needed: needed.toFixed(1), total: nextAt.toFixed(1) };
  }

  function calcAdherence() {
    var total = 0;
    var days  = 0;
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key  = 'checklist_' + d.toISOString().split('T')[0];
      var data = safeParseJSON(localStorage.getItem(key), null);
      if (!data) continue;
      days++;
      var completed = Object.values(data).filter(function(v) { return v === true; }).length;
      total += Math.min(completed, 6);
    }
    if (!days) return 0;
    return Math.round((total / (days * 6)) * 100);
  }

  function buildTodayActions(profile) {
    var key      = todayKey();
    var checklist = safeParseJSON(localStorage.getItem('checklist_' + key), {});
    var macros    = safeParseJSON(localStorage.getItem('keto_macros'), {});
    var mealPlan  = safeParseJSON(localStorage.getItem('mealPlan_' + key), {});

    var calTarget  = parseInt(macros.calories) || 1800;
    var protTarget = parseInt(macros.protein)  || 140;
    var consumed   = { cal: 0, prot: 0 };

    Object.keys(mealPlan).forEach(function(meal) {
      if (Array.isArray(mealPlan[meal])) {
        mealPlan[meal].forEach(function(item) {
          var ratio = (parseFloat(item.portion) || 100) / 100;
          consumed.cal  += Math.round((parseFloat(item.calories) || 0) * ratio);
          consumed.prot += Math.round((parseFloat(item.protein)  || 0) * ratio);
        });
      }
    });

    var waterL      = checklist.water   || 0;
    var workoutMin  = checklist.workout  || 0;
    var waterTarget = 3;

    return [
      {
        id: 'agua',         label: 'Agua',
        detail: waterL + 'L / ' + waterTarget + 'L',
        icon: 'water_drop', iconColor: '#60a5fa',
        done: checklist.agua || (waterL >= waterTarget),
        progress: Math.min(100, Math.round((waterL / waterTarget) * 100)),
        action: 'openWaterModal()', href: null
      },
      {
        id: 'proteina',     label: 'Proteína',
        detail: consumed.prot + 'g / ' + protTarget + 'g',
        icon: 'egg_alt',   iconColor: '#fb923c',
        done: checklist.proteina || (consumed.prot >= protTarget * 0.9),
        progress: Math.min(100, protTarget > 0 ? Math.round((consumed.prot / protTarget) * 100) : 0),
        action: null, href: 'plan.html'
      },
      {
        id: 'calorias',     label: 'Calorías',
        detail: consumed.cal + ' / ' + calTarget + ' kcal',
        icon: 'local_fire_department', iconColor: '#ff4d00',
        done: checklist.calorias || (consumed.cal >= calTarget * 0.85 && consumed.cal <= calTarget * 1.1 && consumed.cal > 0),
        progress: Math.min(100, calTarget > 0 ? Math.round((consumed.cal / calTarget) * 100) : 0),
        action: null, href: 'macros.html'
      },
      {
        id: 'entrenamiento', label: 'Entreno',
        detail: workoutMin + ' / 30 min',
        icon: 'fitness_center', iconColor: '#4ade80',
        done: checklist.entrenamiento || (workoutMin >= 30),
        progress: Math.min(100, Math.round((workoutMin / 30) * 100)),
        action: 'openExerciseModal()', href: null
      },
      {
        id: 'suplementos',  label: 'Suplementos',
        detail: checklist.suplementos ? 'Completado' : 'Pendiente',
        icon: 'medication', iconColor: '#c084fc',
        done: !!checklist.suplementos,
        progress: checklist.suplementos ? 100 : 0,
        action: null, href: 'suplementos.html'
      },
      {
        id: 'sueno',        label: 'Sueño',
        detail: checklist.sueno ? 'Registrado' : 'Pendiente',
        icon: 'bedtime',    iconColor: '#818cf8',
        done: !!checklist.sueno,
        progress: checklist.sueno ? 100 : 0,
        action: null, href: 'checklist.html'
      }
    ];
  }

  function generate() {
    var profile = safeParseJSON(localStorage.getItem('keto_profile'), {});
    var history = safeParseJSON(localStorage.getItem('keto_weight_history'), []);
    if (!Array.isArray(history)) history = [];

    var actions   = buildTodayActions(profile);
    var completed = actions.filter(function(a) { return a.done; }).length;

    return {
      greeting:         buildGreeting(profile.nombre || profile.name),
      objective:        objectiveLabel(profile),
      weightProgress:   calcWeightProgress(profile, history),
      adherence:        calcAdherence(),
      actions:          actions,
      completedActions: completed,
      totalActions:     actions.length,
      nextMilestone:    calcNextMilestone(profile, history),
      streak:           safeParseJSON(localStorage.getItem('ketoStreak'), { currentStreak: 0 })
    };
  }

  function markAction(actionId, done) {
    var key       = 'checklist_' + todayKey();
    var checklist = safeParseJSON(localStorage.getItem(key), {});
    checklist[actionId] = done;
    setLocalData(key, checklist);
  }

  return { generate: generate, markAction: markAction };
})();
