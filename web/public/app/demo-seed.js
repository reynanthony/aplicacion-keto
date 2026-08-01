// ==============================================
// KetoCore Demo Seed
// Puebla localStorage con datos de muestra realistas para que el "modo
// prueba" muestre la app real (no un clon estático) sin necesidad de cuenta.
// Idempotente: no pisa una sesión real ni resetea el progreso si el
// visitante vuelve a entrar por /app/demo/ más de una vez.
// ==============================================
window.seedDemoDataIfNeeded = function () {
  var existingId = null;
  try { existingId = localStorage.getItem('ketocore_user_id'); } catch (e) {}

  if (existingId === 'demo-carlos') {
    // Ya sembrado en una visita anterior -- no resetear el progreso del visitante.
    try { localStorage.setItem('ketocore_demo_mode', '1'); } catch (e) {}
    return;
  }
  if (existingId) {
    // Usuario real ya logueado -- no tocar su sesión ni sus datos.
    return;
  }

  localStorage.setItem('ketocore_demo_mode', '1');
  localStorage.setItem('ketocore_user_id', 'demo-carlos');
  localStorage.setItem('ketocore_onboarding_done', 'true');

  var today = new Date();
  var todayKey = today.toISOString().slice(0, 10);

  localStorage.setItem('keto_profile', JSON.stringify({
    nombre: 'Carlos Ramírez',
    startWeight: 98,
    goalWeight: 82,
    weight: 91.3
  }));

  localStorage.setItem('keto_macros', JSON.stringify({
    calories: 1850, protein: 145, fat: 135, carbs: 22
  }));

  // Tendencia de peso: 21 días, descenso suave de 98 a 91.3kg con ruido leve.
  var history = [];
  var startW = 98, endW = 91.3;
  for (var i = 20; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var progressed = (20 - i) / 20;
    var w = startW - (startW - endW) * progressed + (Math.sin(i * 1.3) * 0.2);
    history.push({ date: d.toISOString().slice(0, 10), weight: Math.round(w * 10) / 10 });
  }
  localStorage.setItem('keto_weight_history', JSON.stringify(history));

  localStorage.setItem('ketoStreak', JSON.stringify({
    currentStreak: 12, bestStreak: 21, ketoDays: 21, lastKetoDate: todayKey, activitiesToday: 1
  }));

  localStorage.setItem('mealsLoggedTotal', JSON.stringify(47));

  localStorage.setItem('mealPlan_' + todayKey, JSON.stringify({
    desayuno: [{ id: 'huevos-tocino', name: 'Huevos con tocino', baseCalories: 420, baseProtein: 28, baseFat: 34, baseCarbs: 3, basePortion: 200, portion: 200, addedAt: new Date().toISOString() }],
    almuerzo: [{ id: 'pollo-aguacate', name: 'Pollo con aguacate', baseCalories: 560, baseProtein: 42, baseFat: 38, baseCarbs: 6, basePortion: 300, portion: 300, addedAt: new Date().toISOString() }],
    cena: [{ id: 'salmon-esparragos', name: 'Salmón con espárragos', baseCalories: 480, baseProtein: 36, baseFat: 32, baseCarbs: 5, basePortion: 250, portion: 250, addedAt: new Date().toISOString() }],
    snacks: [{ id: 'nueces', name: 'Nueces mixtas', baseCalories: 210, baseProtein: 5, baseFat: 20, baseCarbs: 4, basePortion: 30, portion: 30, addedAt: new Date().toISOString() }]
  }));

  // Valores numéricos por hábito (no booleanos). Mezcla de completados y
  // parciales para un estado de progreso creíble, no 0% ni 100%.
  localStorage.setItem('checklist_' + todayKey, JSON.stringify({
    water: 3, electrolitos: 500, workout: 35, walk: 40, protein: 165, sleep: 8
  }));
};
