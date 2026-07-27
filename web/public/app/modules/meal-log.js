/* KetoCore v3 — KetoMealLog: escritura compartida a mealPlan_<fecha>.
   day-budget.js es de solo lectura (ver su propio comentario de cabecera); este
   módulo es el único punto de escritura para los flujos nuevos v3 (Registrar,
   Veredicto, Repetir). Normaliza siempre al snapshot ya escalado que
   KetoBudget.getTodayUsed() espera (suma item.carbs directo, sin dividir por
   portion/100) — alimentos.astro ya escribe así; plan.astro no, y queda fuera
   de alcance corregirlo aquí. */
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

  function getPlan() {
    return parseJSON(localStorage.getItem('mealPlan_' + todayKey()), {});
  }

  function savePlan(plan) {
    localStorage.setItem('mealPlan_' + todayKey(), JSON.stringify(plan));
  }

  function inferMealSlot() {
    var h = new Date().getHours();
    if (h < 11) return 'desayuno';
    if (h < 16) return 'almuerzo';
    if (h < 21) return 'cena';
    return 'snacks';
  }

  function logItem(mealSlot, item) {
    var slot = mealSlot || inferMealSlot();
    var plan = getPlan();
    if (!Array.isArray(plan[slot])) plan[slot] = [];

    var entry = {
      id: item.id || ('log_' + Date.now()),
      name: item.name || 'Alimento',
      portion: Number(item.portion) || 100,
      calories: Number(item.calories) || 0,
      protein: Number(item.protein) || 0,
      fat: Number(item.fat) || 0,
      carbs: Number(item.carbs) || 0,
      addedAt: new Date().toISOString()
    };
    plan[slot].push(entry);
    savePlan(plan);

    if (window.KetoBudget) window.KetoBudget.refresh();
    document.dispatchEvent(new CustomEvent('v3:meal-logged', { detail: { item: entry, mealSlot: slot } }));
    return entry;
  }

  function repeatItem(existingItem) {
    var clone = Object.assign({}, existingItem, { id: 'log_' + Date.now() });
    delete clone.addedAt;
    delete clone.mealSlot;
    return logItem(existingItem.mealSlot, clone);
  }

  function getRecentItems(n) {
    var plan = getPlan();
    var all = [];
    Object.keys(plan).forEach(function (slot) {
      if (!Array.isArray(plan[slot])) return;
      plan[slot].forEach(function (item) {
        all.push(Object.assign({}, item, { mealSlot: slot }));
      });
    });
    all.sort(function (a, b) { return new Date(b.addedAt || 0) - new Date(a.addedAt || 0); });
    return all.slice(0, n || 3);
  }

  window.KetoMealLog = {
    logItem: logItem,
    repeatItem: repeatItem,
    getRecentItems: getRecentItems,
    inferMealSlot: inferMealSlot
  };
})();
