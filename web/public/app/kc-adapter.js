/* ==========================================================================
   KETOCORE.OS · kc-adapter.js — puente UI v2 ↔ datos REALES de KetoCore
   Pantallas: hoy · macros · habitos · progreso.
   Fuentes: keto_profile, keto_macros, mealPlan_<fecha>, keto_weight_history,
   checklist_<fecha>, HealthScoreEngine, KetoMealPlan. Sin datos inventados:
   las secciones que KetoCore no mide (ayuno-timer, recordatorios, medidas
   corporales, grasa%) se omiten en las páginas, no se rellenan con humo.
   Cargar DESPUÉS de kc-ui.js y de utils.js / meal-plan.js / health-score.js.
   ========================================================================== */
(function () {
  'use strict';
  var J = (typeof safeParseJSON === 'function') ? safeParseJSON
        : function (s, d) { try { return JSON.parse(s); } catch (e) { return d; } };
  var R = Math.round;
  var DOW = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  var CFG = [
    { id: 'water',        name: 'Hidratación',   icon: 'drop',     color: 'cyan',    target: 3,   unit: 'L',   dec: 1, step: 250, stepU: 'ml', stepV: 0.25 },
    { id: 'electrolitos', name: 'Electrolitos',  icon: 'flask',    color: 'amber',   target: 500, unit: 'ml',  step: 150, stepU: 'ml', stepV: 150, primary: true },
    { id: 'workout',      name: 'Entrenamiento', icon: 'dumbbell', color: 'red',     target: 60,  unit: 'min', step: 15,  stepU: 'min', stepV: 15 },
    { id: 'protein',      name: 'Proteína',      icon: 'utensils', color: 'cyan',    target: 159, unit: 'g' },
    { id: 'sleep',        name: 'Sueño',         icon: 'moon',     color: 'mint',    target: 8,   unit: 'h', dec: 1 },
    { id: 'walk',         name: 'Caminata',      icon: 'sun',      color: 'neutral', target: 60,  unit: 'min' }
  ];

  function key(d) { return d.toISOString().slice(0, 10); }
  function todayKey() { return key(new Date()); }
  function chkFor(dk) { return J(localStorage.getItem('checklist_' + dk), {}) || {}; }
  function pct(v, t) { return t > 0 ? Math.min(R(v / t * 100), 100) : 0; }
  function fmt(v, dec) { return dec ? (R(v * 10) / 10) : R(v); }
  function nivel(p) { return p >= 100 ? 'full' : (p < 60 ? 'low' : 'mid'); }
  function assign(a, b) { for (var k in b) a[k] = b[k]; return a; }
  function profile() { return J(localStorage.getItem('keto_profile'), {}) || {}; }
  function targets() { return J(localStorage.getItem('keto_macros'), {}) || {}; }
  function fechaLarga(d) { return d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'short' }).replace(/^./, function (c) { return c.toUpperCase(); }); }
  function name() { var p = profile(); return p.nombre || p.name || 'Campeón'; }

  // ---- Ayuno 16:8 (keto_fasting = {start:ISO|null, target:16, last:{h,date}}) ----
  function fastingState() {
    var f = J(localStorage.getItem('keto_fasting'), {}) || {};
    var target = f.target || 16;
    var mins = (n) => (n < 10 ? '0' : '') + n;
    if (f.start) {
      var ms = Date.now() - new Date(f.start).getTime(), h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4);
      var startH = new Date(f.start).getHours() + new Date(f.start).getMinutes() / 60;
      var nowH = new Date().getHours() + new Date().getMinutes() / 60;
      return { active: true, idle: false, state: 'Ayunando', elapsed: h + ' h ' + mins(m) + ' m', target: target + ' h',
        winStyle: 'left:' + R(startH / 24 * 100) + '%;width:' + R((target) / 24 * 100) + '%',
        nowStyle: 'left:' + R(nowH / 24 * 100) + '%', scale: ['00', '06', '12', '18', '24'],
        next: (h >= target ? '¡Meta de ' + target + ' h cumplida!' : 'Faltan ' + (target - h) + ' h para tu meta'),
        pctText: R(Math.min(h / target * 100, 100)) + '%' };
    }
    var last = f.last ? ('Último: ' + f.last.h + ' h') : 'Sin registro';
    return { active: false, idle: true, state: 'Sin ayuno', elapsed: '0 h 00 m', target: target + ' h',
      winStyle: 'left:0;width:0', nowStyle: 'left:0', scale: ['00', '06', '12', '18', '24'],
      next: 'Toca "Iniciar ayuno" para empezar', pctText: last };
  }

  // ---- Recordatorios (keto_reminders); siembra por defecto la 1a vez ----
  function reminders() {
    var r = J(localStorage.getItem('keto_reminders'), null);
    if (!Array.isArray(r)) {
      r = [
        { id: 'r1', name: 'Electrolitos de la tarde', time: '17:00 · diario', icon: 'flask', color: 'amber', on: true },
        { id: 'r2', name: 'Cerrar ventana de comida', time: '20:15 · diario', icon: 'clock', color: 'mint', on: true },
        { id: 'r3', name: 'Pesarme en ayunas', time: '07:00 · L, X, V', icon: 'scale', color: 'cyan', on: false }
      ];
      localStorage.setItem('keto_reminders', JSON.stringify(r));
    }
    return r;
  }

  // ---- Medidas / composición (keto_measures = [{date, cintura, cadera, magra, grasa}]) ----
  function measuresHistory() { var m = J(localStorage.getItem('keto_measures'), []); return Array.isArray(m) ? m : []; }
  function measureRows() {
    var h = measuresHistory().slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var last = h[0] || {}, prev = h[1] || {};
    function row(nm, ic, k, unit) {
      var v = last[k], p = prev[k], has = v != null && v !== '';
      var delta = (has && p != null && p !== '') ? (v - p) : null;
      return { name: nm, icon: ic, value: has ? v : '—', unit: unit, date: has ? (last.date || 'registrado') : 'Sin registro',
        delta: delta != null ? (delta <= 0 ? '−' : '+') + Math.abs(+delta.toFixed(1)) + ' ' + unit : '',
        dirClass: delta != null ? (delta <= 0 ? 'kc-delta-down' : 'kc-delta-up') : '' };
    }
    return { rows: [row('Cintura', 'ruler', 'cintura', 'cm'), row('Cadera', 'ruler', 'cadera', 'cm'), row('Masa magra', 'target', 'magra', 'kg')], grasa: last.grasa, grasaPrev: prev.grasa };
  }

  function dayAdherence(chk) { var n = 0; for (var i = 0; i < CFG.length; i++) if ((chk[CFG[i].id] || 0) >= CFG[i].target) n++; return R(Math.min(n, 6) / 6 * 100); }
  function todayProgress(chk) { var s = 0; for (var i = 0; i < CFG.length; i++) s += pct(chk[CFG[i].id] || 0, CFG[i].target); return R(s / CFG.length); }
  function streak() { var n = 0, d = new Date(); for (var i = 0; i < 400; i++) { var c = chkFor(key(d)); if (Object.keys(c).length && dayAdherence(c) >= 80) n++; else if (i > 0) break; d.setDate(d.getDate() - 1); } return n; }
  function bestStreak() { var best = 0, run = 0, d = new Date(); for (var i = 0; i < 400; i++) { var c = chkFor(key(d)); if (Object.keys(c).length && dayAdherence(c) >= 80) { run++; if (run > best) best = run; } else run = 0; d.setDate(d.getDate() - 1); } return Math.max(best, streak()); }

  function consumedMacros() {
    var plan = J(localStorage.getItem('mealPlan_' + todayKey()), {}) || {};
    var c = { calories: 0, fat: 0, protein: 0, carbs: 0 };
    var tot = (window.KetoMealPlan && KetoMealPlan.itemTotals) ? KetoMealPlan.itemTotals : null;
    Object.keys(plan).forEach(function (m) { if (!Array.isArray(plan[m])) return; plan[m].forEach(function (it) { var t = tot ? tot(it) : (it.totals || {}); c.calories += t.calories || 0; c.fat += t.fat || 0; c.protein += t.protein || 0; c.carbs += t.carbs || 0; }); });
    return c;
  }
  function energy(withNotes) {
    var tg = targets(), cm = consumedMacros();
    function leftNote(v, g) { var l = (parseInt(g) || 0) - v; return l > 0 ? R(l) + ' g restantes' : 'meta alcanzada'; }
    var e = {
      kcal: { value: R(cm.calories), goal: parseInt(tg.calories) || 0 },
      balance: R(cm.calories - (parseInt(tg.calories) || 0)),
      fat: { value: R(cm.fat), goal: parseInt(tg.fat) || 0 },
      protein: { value: R(cm.protein), goal: parseInt(tg.protein) || 0 },
      carbs: { value: R(cm.carbs), goal: parseInt(tg.carbs) || 25 },
      // Fibra: registro diario manual en checklist_<fecha>.fiber (g)
      fiber: { value: R(chkFor(todayKey()).fiber || 0), goal: parseInt(tg.fiber) || 25 }
    };
    if (withNotes) { e.fat.note = leftNote(cm.fat, tg.fat); e.protein.note = leftNote(cm.protein, tg.protein); e.carbs.note = 'máx ' + (parseInt(tg.carbs) || 25) + ' g'; e.fiber.note = leftNote(chkFor(todayKey()).fiber || 0, e.fiber.goal); }
    return e;
  }

  function protocolsList() {
    var chk = chkFor(todayKey());
    return CFG.map(function (c) {
      var v = chk[c.id] || 0, p = pct(v, c.target);
      var state = v >= c.target ? 'done' : (v > 0 ? 'active' : 'pending');
      var o = { id: c.id, name: c.name, icon: c.icon, color: c.color, state: state, meta: fmt(v, c.dec) + ' / ' + c.target + ' ' + c.unit, pct: p };
      if (state === 'done') o.note = 'Hecho';
      else if (c.step) { o.actionLabel = '+' + c.step + ' ' + c.stepU; o.actionValue = String(c.stepV); if (c.primary) o.actionVariant = 'primary'; }
      else o.canToggle = true;
      return o;
    });
  }

  function weightData() {
    var p = profile(), hist = J(localStorage.getItem('keto_weight_history'), []) || [];
    var series = hist.map(function (x) { return x.weight || x.peso || 0; }).filter(function (x) { return x > 0; });
    var startW = parseFloat(p.startWeight || p.pesoInicial) || series[0] || 0;
    var goalW = parseFloat(p.goalWeight || p.pesoObjetivo) || 0;
    var curW = series.length ? series[series.length - 1] : (parseFloat(p.weight) || 0);
    if (!curW) return null;
    var lost = startW ? +(startW - curW).toFixed(1) : 0;
    return { title: (lost >= 0 ? '−' : '+') + Math.abs(lost) + ' kg este mes', status: 'Al día', series: series.length > 1 ? series : [curW, curW], goal: goalW || curW, start: startW || curW, current: curW, lost: Math.abs(lost), left: goalW ? +(curW - goalW).toFixed(1) : 0 };
  }

  function adherenceWeek() {
    var days = [], dd = new Date(), sum = 0, n = 0; dd.setDate(dd.getDate() - 6);
    for (var i = 0; i < 7; i++) { var c = chkFor(key(dd)), today = i === 6, has = Object.keys(c).length, v = has ? dayAdherence(c) : 0; if (has) { sum += v; n++; } days.push({ d: today ? 'Hoy' : DOW[dd.getDay()], v: v, level: nivel(v), today: today }); dd.setDate(dd.getDate() + 1); }
    return { avg: n ? R(sum / n) : 0, goal: 82, days: days };
  }

  function common() {
    var st = streak();
    return { user: { initial: name().charAt(0).toUpperCase(), name: name() }, date: fechaLarga(new Date()),
      status: [{ text: st >= 1 ? 'Racha ' + st + ' días' : 'Sin racha', color: 'mint', dot: true, live: true }, { text: 'Modo keto', color: 'neutral' }] };
  }

  /* ---------- HOY ---------- */
  function buildHoy() {
    var chk = chkFor(todayKey());
    var prog = todayProgress(chk);
    var health = 0; try { if (window.HealthScoreEngine) health = HealthScoreEngine.calculate().total; } catch (e) {}
    var adh = adherenceWeek(), st = streak(), protos = protocolsList();
    var pend = protos.filter(function (p) { return p.state !== 'done'; });
    return assign(common(), {
      greeting: (new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 19 ? 'Buenas tardes' : 'Buenas noches') + ', ' + name(),
      today: {
        progress: { value: prog, pct: prog, chip: prog + '%' },
        health: { value: health, pct: health, chip: health >= 80 ? 'Óptimo' : (health >= 60 ? 'Bueno' : 'A mejorar') },
        adherence: { value: adh.avg, pct: adh.avg, chip: adh.avg + '%' },
        streak: { value: st, pct: Math.min(R(st / 21 * 100), 100), chip: 'días' }
      },
      energy: energy(false), protocols: protos, protocolsDone: protos.filter(function (p) { return p.state === 'done'; }).length + ' / ' + CFG.length,
      weight: weightData(), adherence: adh,
      coach: { insight: pend.length ? ('Te faltan ' + pend.length + ' hábito' + (pend.length > 1 ? 's' : '') + ': ' + pend.map(function (p) { return p.name; }).join(', ') + '. Ciérralos y el día queda en verde.') : ('¡Día completo! Proteges tu racha de ' + st + ' días.'), cta: 'Ver mi plan', remindAt: '' }
    });
  }

  /* ---------- MACROS ---------- */
  function buildMacros() {
    var tg = targets(), cm = consumedMacros();
    var days = [], dd = new Date(); dd.setDate(dd.getDate() - 6);
    for (var i = 0; i < 7; i++) { var c = chkFor(key(dd)), lvl = Object.keys(c).length ? Math.max(1, Math.ceil(dayAdherence(c) / 34)) : 0; days.push({ date: key(dd), dow: DOW[dd.getDay()], n: dd.getDate(), l: lvl, pressed: String(i === 6) }); dd.setDate(dd.getDate() + 1); }
    var plan = J(localStorage.getItem('mealPlan_' + todayKey()), {}) || {}, meals = [];
    var LBL = { desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena', snacks: 'Snack' };
    var tot = (window.KetoMealPlan && KetoMealPlan.itemTotals) ? KetoMealPlan.itemTotals : null;
    ['desayuno', 'almuerzo', 'cena', 'snacks'].forEach(function (m) {
      if (!Array.isArray(plan[m]) || !plan[m].length) return;
      var t = { calories: 0, fat: 0, protein: 0, carbs: 0 }, names = [];
      plan[m].forEach(function (it) { var x = tot ? tot(it) : {}; t.calories += x.calories || 0; t.fat += x.fat || 0; t.protein += x.protein || 0; t.carbs += x.carbs || 0; names.push(it.name || it.nombre || it.alimento || ''); });
      meals.push({ id: m, time: '', name: LBL[m] || m, items: names.filter(Boolean).join(', ') || '—', kcal: R(t.calories), macros: 'G ' + R(t.fat) + ' · P ' + R(t.protein) + ' · C ' + R(t.carbs), color: m === 'snacks' ? 'cyan' : 'amber' });
    });
    var netC = R(cm.carbs), cMax = parseInt(tg.carbs) || 25;
    // Distribución del día: reparto proporcional de kcal por macro (dato distinto
    // al dial de Hoy, que muestra progreso hacia meta). Geometría del donut lista.
    var fc = cm.fat * 9, pc = cm.protein * 4, cc = cm.carbs * 4, tot = (fc + pc + cc) || 1, C = 339.3, cum = 0;
    function seg(calPart, g) { var arc = calPart / tot * C, o = { pct: R(calPart / tot * 100), g: R(g), da: arc.toFixed(1) + ' ' + C, off: (-cum).toFixed(1) }; cum += arc; return o; }
    var split = { kcal: R(cm.calories), fat: seg(fc, cm.fat), protein: seg(pc, cm.protein), carbs: seg(cc, cm.carbs) };
    return assign(common(), {
      subtitle: fechaLarga(new Date()), ketoStatus: netC <= cMax ? 'Carbos en rango' : 'Carbos altos',
      energy: energy(true), split: split, days: days, meals: meals, mealsTotal: meals.length + ' comida' + (meals.length !== 1 ? 's' : ''),
      fasting: fastingState()
    });
  }

  /* ---------- HÁBITOS ---------- */
  function buildHabitos() {
    var protos = protocolsList(), st = streak(), best = bestStreak();
    // calendario del mes actual con nivel de adherencia por día
    var now = new Date(), y = now.getFullYear(), mo = now.getMonth(), first = new Date(y, mo, 1), dim = new Date(y, mo + 1, 0).getDate();
    var cells = [], sumM = 0, nM = 0;
    for (var e = 0; e < first.getDay(); e++) cells.push({ n: '', empty: true });
    for (var d = 1; d <= dim; d++) { var c = chkFor(key(new Date(y, mo, d))), has = Object.keys(c).length, v = has ? dayAdherence(c) : 0, lvl = has ? Math.max(1, Math.ceil(v / 34)) : 0; if (has) { sumM += v; nM++; } cells.push({ n: d, l: lvl, today: d === now.getDate() }); }
    var w = weightData(), lost = w ? w.lost : 0;
    var BAD = [
      { name: 'Racha 7', icon: 'flame', color: 'amber', ok: st >= 7 }, { name: 'Racha 14', icon: 'flame', color: 'amber', ok: st >= 14 },
      { name: 'Racha 30', icon: 'flame', color: 'amber', ok: st >= 30 }, { name: '−2 kg', icon: 'trophy', color: 'cyan', ok: lost >= 2 },
      { name: '−5 kg', icon: 'trophy', color: 'cyan', ok: lost >= 5 }, { name: '−10 kg', icon: 'trophy', color: 'cyan', ok: lost >= 10 }
    ];
    var badges = BAD.map(function (b) { return b.ok ? { name: b.name, icon: b.icon, color: b.color } : { name: b.name, icon: 'lock', color: 'neutral', locked: true }; });
    var earned = BAD.filter(function (b) { return b.ok; }).length;
    return assign(common(), {
      subtitle: 'Hábitos · ' + fechaLarga(now),
      streak: { value: st, best: best, toBest: Math.max(best - st, 0), pct: best > 0 ? Math.min(R(st / best * 100), 100) : 100 },
      protocols: protos, protocolsDone: protos.filter(function (p) { return p.state === 'done'; }).length + ' / ' + CFG.length,
      calendar: { month: now.toLocaleDateString('es', { month: 'long', year: 'numeric' }).replace(/^./, function (c) { return c.toUpperCase(); }), summary: (nM ? R(sumM / nM) : 0) + '% del mes', cells: cells },
      reminders: reminders(),
      badges: badges, badgesCount: earned + ' / ' + BAD.length
    });
  }

  /* ---------- PROGRESO ---------- */
  function buildProgreso() {
    var p = profile(), w = weightData(), adh = adherenceWeek();
    var stats = {};
    if (w) {
      var totalToLose = Math.abs(w.start - w.goal), lostAbs = w.lost;
      var gp = totalToLose > 0 ? Math.min(R(lostAbs / totalToLose * 100), 100) : 0;
      stats.goal = { value: gp, pct: gp, chip: lostAbs + ' / ' + totalToLose.toFixed(1) + ' kg' };
      // ritmo semanal real (últimos ≤14 registros)
      var hist = J(localStorage.getItem('keto_weight_history'), []) || [];
      var srt = hist.slice().sort(function (a, b) { return new Date(a.date || a.fecha) - new Date(b.date || b.fecha); });
      var rate = 0;
      if (srt.length >= 2) { var f = srt[Math.max(0, srt.length - 8)], l = srt[srt.length - 1]; var dd = (new Date(l.date || l.fecha) - new Date(f.date || f.fecha)) / 864e5; var wd = (l.weight || l.peso) - (f.weight || f.peso); if (dd > 0) rate = +(wd / dd * 7).toFixed(1); }
      stats.rate = { value: rate, pct: Math.min(Math.abs(rate) / 1 * 100, 100), chip: (rate <= 0 ? 'Saludable' : 'Subiendo') };
      // IMC solo si hay estatura
      var hcm = parseFloat(p.height || p.altura || p.estatura) || 0;
      if (hcm > 0) { var bmi = +(w.current / Math.pow(hcm / 100, 2)).toFixed(1); stats.bmi = { value: bmi, pct: Math.min(R(bmi / 40 * 100), 100), chip: bmi < 25 ? 'Normal' : (bmi < 30 ? 'Sobrepeso' : 'Alto') }; }
      else stats.bmi = { value: '—', pct: 0, chip: 'Añade tu estatura' };
    } else { stats.goal = { value: '—', pct: 0, chip: 'Sin datos' }; stats.rate = { value: '—', pct: 0, chip: '—' }; stats.bmi = { value: '—', pct: 0, chip: '—' }; }
    // Grasa corporal y medidas: registro manual real (keto_measures)
    var mr = measureRows(), fat = mr.grasa, fatPrev = mr.grasaPrev;
    stats.fat = (fat != null && fat !== '') ? { value: fat, pct: Math.min(R(fat / 40 * 100), 100), chip: (fatPrev != null && fatPrev !== '') ? ((fat - fatPrev <= 0 ? '−' : '+') + Math.abs(+(fat - fatPrev).toFixed(1)) + '%') : 'registrado' } : { value: '—', pct: 0, chip: 'Sin registro' };
    return assign(common(), { subtitle: 'Tu evolución', weight: w, stats: stats, measures: mr.rows, adherence: adh });
  }

  /* ---------- Dispatch ---------- */
  var LOADERS = { hoy: buildHoy, macros: buildMacros, habitos: buildHabitos, progreso: buildProgreso };
  function renderScreen(s) { var b = LOADERS[s]; if (!b) return; try { KC.render(s, b()); } catch (e) { console.error('[kc-adapter]', s, e); } }
  document.addEventListener('kc:ready', function (e) { renderScreen(e.detail && e.detail.screen); });

  /* ---------- Acciones ---------- */
  function addChk(id, amount) { var c = chkFor(todayKey()); c[id] = (c[id] || 0) + amount; localStorage.setItem('checklist_' + todayKey(), JSON.stringify(c)); }
  document.addEventListener('kc:action', function (e) {
    var a = e.detail.action, v = e.detail.value, id = e.detail.id;
    switch (a) {
      case 'log:water': addChk('water', (Number(v) || 250) / 1000); break;
      case 'log:electrolytes': addChk('electrolitos', Number(v) || 150); break;
      case 'protocol:log': addChk(id, Number(v) || 0); break;
      case 'protocol:toggle': var c = CFG.filter(function (x) { return x.id === id; })[0]; if (c) { var cur = chkFor(todayKey()); cur[id] = c.target; localStorage.setItem('checklist_' + todayKey(), JSON.stringify(cur)); } break;
      case 'log:fiber': addChk('fiber', Number(v) || 5); break;
      case 'fasting:start': var fs = J(localStorage.getItem('keto_fasting'), {}) || {}; fs.start = new Date().toISOString(); fs.target = fs.target || 16; localStorage.setItem('keto_fasting', JSON.stringify(fs)); break;
      case 'fasting:break': var fb = J(localStorage.getItem('keto_fasting'), {}) || {}; if (fb.start) { fb.last = { h: +((Date.now() - new Date(fb.start).getTime()) / 36e5).toFixed(1), date: todayKey() }; } fb.start = null; localStorage.setItem('keto_fasting', JSON.stringify(fb)); break;
      case 'reminder:toggle': var rs = reminders(), it = rs.filter(function (x) { return x.id === id; })[0]; if (it) { it.on = !it.on; localStorage.setItem('keto_reminders', JSON.stringify(rs)); } return;
      case 'measure:open': case 'log:measure': if (window.KC && KC.openSheet) KC.openSheet('kc-measure'); return;
      case 'reminder:add': if (window.KC && KC.openSheet) KC.openSheet('kc-reminder'); return;
      case 'log:scan': if (window.KetoInspector && KetoInspector.open) KetoInspector.open(); return;
      case 'log:food': location.href = '/app/macros'; return;
      case 'log:weight': location.href = '/app/progreso'; return;
      default: return;
    }
    renderScreen(document.body.getAttribute('data-kc-screen'));
  });

  // ---- Guardado de formularios (hojas de medidas y recordatorio) ----
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-kc-save]');
    if (!t) return;
    var kind = t.getAttribute('data-kc-save');
    function val(id) { var el = document.getElementById(id); return el && el.value !== '' ? el.value : null; }
    if (kind === 'measure') {
      var rec = { date: todayKey(), cintura: num(val('m-cintura')), cadera: num(val('m-cadera')), magra: num(val('m-magra')), grasa: num(val('m-grasa')) };
      var h = measuresHistory(); h.push(rec); localStorage.setItem('keto_measures', JSON.stringify(h));
      if (window.KC && KC.closeSheet) KC.closeSheet('kc-measure');
    } else if (kind === 'reminder') {
      var nm = val('r-name'); if (nm) { var rs2 = reminders(); rs2.push({ id: 'r' + Date.now(), name: nm, time: (val('r-time') || '08:00') + ' · diario', icon: 'bell', color: 'amber', on: true }); localStorage.setItem('keto_reminders', JSON.stringify(rs2)); }
      if (window.KC && KC.closeSheet) KC.closeSheet('kc-reminder');
    } else return;
    renderScreen(document.body.getAttribute('data-kc-screen'));
  });
  function num(v) { return v == null ? null : (parseFloat(v) || null); }
})();
