/* KETOCORE.OS · datos de demostración para la UI v2.
   Muestra EXACTAMENTE la forma que espera KC.render(pantalla, datos).
   Se carga solo con <AppShell demo>. Bórralo de producción al conectar Supabase. */
(function () {
  var common = {
    user: { initial: 'C', name: 'Carlos' },
    date: 'Sábado 26 sep',
    status: [
      { text: 'Sincronizado', color: 'mint', dot: true, live: true },
      { text: 'Ciclo #14', color: 'neutral' },
      { text: 'Ayuno 16:8', color: 'neutral' },
      { text: 'Modo estricto', color: 'neutral' }
    ]
  };
  var energy = {
    kcal: { value: 1440, goal: 1850 },
    balance: -410,
    fat: { value: 104, goal: 115, note: '11 g restantes' },
    protein: { value: 92, goal: 118, note: '26 g restantes' },
    carbs: { value: 18, goal: 25, note: 'máx 25 g' },
    fiber: { value: 14, goal: 25, note: '11 g restantes' }
  };
  var protocols = [
    { id: 'p1', name: 'Hidratación', icon: 'drop', color: 'mint', state: 'done', meta: '3.0 / 3.0 L', note: 'Hecho 16:30', pct: 100 },
    { id: 'p2', name: 'Electrolitos', icon: 'flask', color: 'amber', state: 'active', meta: '350 / 500 ml', pct: 70, actionLabel: '+150 ml', actionValue: '150', actionVariant: 'primary' },
    { id: 'p3', name: 'Entrenamiento', icon: 'dumbbell', color: 'red', state: 'active', meta: '45 / 60 min', pct: 75, actionLabel: '+15 min', actionValue: '15' },
    { id: 'p6', name: 'Caminata al sol', icon: 'sun', color: 'neutral', state: 'pending', meta: '0 / 20 min', pct: 0, canToggle: true }
  ];
  var weight = {
    title: '−2.4 kg este mes', status: 'Al día',
    series: [86.2, 86.0, 86.1, 85.8, 85.9, 85.7, 85.5, 85.6, 85.4, 85.3, 85.4, 85.1, 85.0, 85.2, 84.9, 84.8, 84.9, 84.6, 84.5, 84.6, 84.4, 84.3, 84.4, 84.2, 84.1, 84.0, 84.1, 83.9, 83.9, 83.8],
    goal: 78, start: 86.2, current: 83.8, lost: 2.4, left: 5.8
  };
  var adherence = {
    avg: 80, delta: 6, goal: 82,
    days: [
      { d: 'Mi', v: 83, level: 'mid' }, { d: 'Ju', v: 100, level: 'full' }, { d: 'Vi', v: 66, level: 'mid' },
      { d: 'Sá', v: 100, level: 'full' }, { d: 'Do', v: 50, level: 'low' }, { d: 'Lu', v: 83, level: 'mid' },
      { d: 'Hoy', v: 78, level: 'mid', today: true }
    ]
  };
  function merge(o) { var r = {}; for (var k in common) r[k] = common[k]; for (var j in o) r[j] = o[j]; return r; }

  // calendario de septiembre 2026 (empieza martes)
  var cells = [{ n: '', empty: true }];
  var lv = [3,2,3,3,1,3,2,3,3,3,0,2,3,3,3,2,3,1,3,3,3,3,2,3,3,2];
  for (var d = 1; d <= 30; d++) cells.push({ n: d, l: d <= 26 ? lv[d - 1] : 0, today: d === 26 });

  window.KC_DEMO = {
    hoy: merge({
      greeting: 'Buenas noches, Carlos',
      today: {
        progress: { value: 73, pct: 73, chip: '73%' },
        health: { value: 86, pct: 86, chip: 'Óptimo' },
        adherence: { value: 82, pct: 82, chip: '+6%' },
        streak: { value: 14, pct: 67, chip: 'Récord 21' }
      },
      energy: energy,
      metrics: {
        water: { value: 2.1, goal: 3, unit: 'L', chip: '70%', foot1: '−900 ml', foot2: '8 vasos' },
        electrolytes: { value: 350, goal: 500, unit: 'ml', chip: 'Pendiente', foot1: '−150 ml', foot2: 'tarde' },
        training: { value: 45, goal: 60, unit: 'min', chip: 'En curso', foot1: '+15 min', foot2: '380 kcal' },
        sleep: { value: 7.5, goal: 8, unit: 'h', chip: '94%', foot1: '−30 min', foot2: 'anoche' }
      },
      protocols: protocols,
      protocolsDone: '4 / 6',
      weight: weight,
      adherence: adherence,
      coach: {
        insight: 'Cierra electrolitos y entrenamiento y el día queda en verde: proteges tu racha de 14 días.',
        action: 'Toma 150 ml de electrolitos y completa 15 min de entrenamiento antes de las 21:00.',
        eta: 'en 35 min', cta: 'Recordarme a las 20:30', remindAt: '20:30'
      }
    }),

    macros: merge({
      subtitle: 'Sábado 26 · ventana 12:30–20:30',
      ketoStatus: 'En cetosis',
      days: [
        { date: '2026-09-20', dow: 'D', n: 20, l: 1, pressed: 'false' },
        { date: '2026-09-21', dow: 'L', n: 21, l: 3, pressed: 'false' },
        { date: '2026-09-22', dow: 'M', n: 22, l: 3, pressed: 'false' },
        { date: '2026-09-23', dow: 'X', n: 23, l: 2, pressed: 'false' },
        { date: '2026-09-24', dow: 'J', n: 24, l: 3, pressed: 'false' },
        { date: '2026-09-25', dow: 'V', n: 25, l: 2, pressed: 'false' },
        { date: '2026-09-26', dow: 'S', n: 26, l: 2, pressed: 'true' }
      ],
      energy: energy,
      fasting: {
        state: 'Ventana abierta', elapsed: '9 h 12 m', target: '16 h',
        winStyle: 'left:52%;width:33%', nowStyle: 'left:90%',
        scale: ['00', '06', '12', '18', '24'],
        next: 'Ayuno empieza a las 20:30', pctText: 'Ayer 16 h 20 m ✓'
      },
      meals: [
        { id: 'm1', time: '12:30', name: 'Desayuno tardío', items: 'Huevos, aguacate, tocino', kcal: 580, macros: 'G 48 · P 28 · C 5' },
        { id: 'm2', time: '16:15', name: 'Almuerzo', items: 'Salmón, espárragos, mantequilla', kcal: 640, macros: 'G 44 · P 52 · C 7' },
        { id: 'm3', time: '18:45', name: 'Snack', items: 'Nueces de macadamia', kcal: 220, macros: 'G 12 · P 12 · C 6', color: 'cyan' }
      ],
      mealsTotal: '3 comidas'
    }),

    habitos: merge({
      subtitle: 'Hábitos · semana 39',
      streak: { value: 14, best: 21, toBest: 7, pct: 67 },
      protocols: protocols.concat([
        { id: 'p4', name: 'Sueño 8 h', icon: 'moon', color: 'mint', state: 'done', meta: '7.5 / 8 h', note: 'Anoche', pct: 94 },
        { id: 'p5', name: 'Ayuno 16 h', icon: 'clock', color: 'mint', state: 'done', meta: '16 h 20 m', note: 'Cumplido', pct: 100 }
      ]),
      protocolsDone: '4 / 6',
      calendar: { month: 'Septiembre 2026', summary: '82% del mes', cells: cells },
      reminders: [
        { id: 'r1', name: 'Electrolitos de la tarde', time: '17:00 · diario', icon: 'flask', color: 'amber', on: true },
        { id: 'r2', name: 'Cerrar ventana de comida', time: '20:15 · diario', icon: 'clock', color: 'mint', on: true },
        { id: 'r3', name: 'Pesarme en ayunas', time: '07:00 · L, X, V', icon: 'scale', color: 'cyan', on: false }
      ],
      badges: [
        { name: 'Racha 7', icon: 'flame', color: 'amber' },
        { name: 'Racha 14', icon: 'flame', color: 'amber' },
        { name: 'Ayuno 20 h', icon: 'clock', color: 'mint' },
        { name: '−2 kg', icon: 'trophy', color: 'cyan' },
        { name: 'Racha 30', icon: 'lock', color: 'neutral', locked: true },
        { name: '100 comidas', icon: 'lock', color: 'neutral', locked: true },
        { name: '−5 kg', icon: 'lock', color: 'neutral', locked: true },
        { name: 'Perfecto x7', icon: 'lock', color: 'neutral', locked: true }
      ],
      badgesCount: '4 / 8'
    }),

    progreso: merge({
      subtitle: 'Desde el 27 de agosto',
      weight: weight,
      stats: {
        goal: { value: 29, pct: 29, chip: '2.4 / 8.2 kg' },
        bmi: { value: 26.2, pct: 62, chip: '−0.8' },
        fat: { value: 24.1, pct: 48, chip: '−1.6%' },
        rate: { value: -0.6, pct: 60, chip: 'Saludable' }
      },
      measures: [
        { name: 'Cintura', icon: 'ruler', value: 91, unit: 'cm', delta: '−3 cm', dirClass: 'kc-delta-down', date: 'Hace 2 días' },
        { name: 'Cadera', icon: 'ruler', value: 102, unit: 'cm', delta: '−2 cm', dirClass: 'kc-delta-down', date: 'Hace 2 días' },
        { name: 'Masa magra', icon: 'target', value: 63.6, unit: 'kg', delta: '+0.3 kg', dirClass: 'kc-delta-down', date: 'Báscula · hoy' }
      ],
      adherence: adherence
    })
  };
})();
