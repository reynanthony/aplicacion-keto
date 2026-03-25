// ==================== BASE DE DATOS DE EJERCICIOS ====================

const EXERCISES_DB = {
  casa: [
    { id: "sentadillas", name: "Sentadillas", muscle: "piernas", equipment: ["casa"], difficulty: "principiante", caloriesPerMinute: 8, instructions: "Pies al ancho de hombros, espalda recta, baja como si fueras a sentarte", alternatives: ["sentadillas búlgaras", "zancadas"] },
    { id: "flexiones", name: "Flexiones de pecho", muscle: "pecho", equipment: ["casa"], difficulty: "principiante", caloriesPerMinute: 7, instructions: "Manos al ancho de hombros, cuerpo recto, baja hasta que el pecho casi toque el suelo", alternatives: ["flexiones rodillas", "flexiones inclinadas"] },
    { id: "plancha", name: "Plancha abdominal", muscle: "core", equipment: ["casa"], difficulty: "principiante", caloriesPerMinute: 5, instructions: "Apoya antebrazos y puntas de pies, cuerpo recto, contrae abdomen", alternatives: ["plancha lateral", "plancha con elevación"] },
    { id: "zancadas", name: "Zancadas", muscle: "piernas", equipment: ["casa"], difficulty: "principiante", caloriesPerMinute: 9, instructions: "Da un paso largo hacia adelante, baja la cadera hasta que ambas rodillas estén a 90°", alternatives: ["zancadas laterales", "zancadas reversas"] },
    { id: "burpees", name: "Burpees", muscle: "cardio", equipment: ["casa"], difficulty: "intermedio", caloriesPerMinute: 12, instructions: "Desde posición de pie, baja en cuclillas, lanza pies atrás, haz flexión, salta", alternatives: ["burpees sin flexión"] },
    { id: "mountain-climbers", name: "Mountain Climbers", muscle: "cardio", equipment: ["casa"], difficulty: "intermedio", caloriesPerMinute: 11, instructions: "En posición de plancha, lleva las rodillas al pecho alternadamente", alternatives: ["step touch"] },
    { id: "saltos-comba", name: "Saltos de comba", muscle: "cardio", equipment: ["casa"], difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Salta alternando pies, mantenimiento durante 1 minuto", alternatives: ["saltos lateral"] },
    { id: "puentes", name: "Puentes de glúteos", muscle: "piernas", equipment: ["casa"], difficulty: "principiante", caloriesPerMinute: 4, instructions: "Acostado boca arriba, levanta las cadera contrae gluteos abajo", alternatives: ["puente unilateral"] },
    { id: "escaladores", name: "Escaladores", muscle: "cardio", equipment: ["casa"], difficulty: "intermedio", caloriesPerMinute: 11, instructions: "En posicion de plancha, alterna llevar rodillas al pecho rapidamente", alternatives: ["escaladores lentos"] },
    { id: "saltos-star", name: "Saltos de estrella", muscle: "cardio", equipment: ["casa"], difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Salta extension brazos y piernas formando estrella", alternatives: ["saltos simultaneos"] }
  ],
  mancuernas: [
    { id: "press-mancuernas", name: "Press de hombros", muscle: "hombros", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 8, instructions: "De pie, mancuernas a la altura de hombros, sube hasta extender brazos", alternatives: ["press militar", "elevaciones laterales"] },
    { id: "curl-biceps", name: "Curl de bíceps", muscle: "biceps", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 6, instructions: "Mancuernas en cada mano, palmas hacia adelante, flexiona codos sin mover brazos", alternatives: ["curl concentrado", "curl martillo"] },
    { id: "remo-mancuerna", name: "Remo con mancuerna", muscle: "espalda", equipment: ["mancuernas", "casa"], difficulty: "intermedio", caloriesPerMinute: 8, instructions: "Apoya una rodilla y mano en banco, con la otra mano tira la mancuerna hacia la cadera", alternatives: ["remo con barra", "jalón al pecho"] },
    { id: "sentadilla-copa", name: "Sentadilla copa", muscle: "piernas", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 9, instructions: "Sujeta una mancuerna contra el pecho, baja en sentadilla manteniendo espalda recta", alternatives: ["sentadilla goblet", "sentadilla búlgara"] },
    { id: "press-banca-mancuerna", name: "Press de banca", muscle: "pecho", equipment: ["mancuernas", "casa"], difficulty: "intermedio", caloriesPerMinute: 9, instructions: "Acostado en banco/suelo, baja mancuernas hasta el pecho y empuja hacia arriba", alternatives: ["flexiones", "press inclinado"] },
    { id: "extension-triceps", name: "Extensión de tríceps", muscle: "triceps", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 5, instructions: "Mancuerna con ambas manos detrás de la cabeza, extiende hacia arriba", alternatives: ["fondos"] },
    { id: "elevacion-lateral", name: "Elevaciones laterales", muscle: "hombros", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 6, instructions: "Brazos a lados, eleva mancuernas hasta la altura de hombros", alternatives: ["elevaciones frontales"] },
    { id: "patada-gluteo", name: "Patada de gluteo", muscle: "piernas", equipment: ["mancuernas", "casa"], difficulty: "principiante", caloriesPerMinute: 5, instructions: "En cuatro puntos, extiende una pierna hacia atras con peso", alternatives: ["puente unilateral"] }
  ],
  gimnasio: [
    { id: "press-banca-barra", name: "Press de banca", muscle: "pecho", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Acostado en banco, agarra la barra, baja hasta el pecho, empuja", alternatives: ["press banca mancuernas", "fondos"] },
    { id: "sentadilla-barra", name: "Sentadilla con barra", muscle: "piernas", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 11, instructions: "Barra en trapecio, baja manteniendo espalda recta, sube con fuerza", alternatives: ["sentadilla hack", "prensa"] },
    { id: "peso-muerto", name: "Peso muerto", muscle: "espalda", equipment: ["gimnasio"], difficulty: "avanzado", caloriesPerMinute: 12, instructions: "Pies al ancho de hombros, agarra la barra, espalda recta, levanta con piernas", alternatives: ["peso muerto rumano", "hiperextensiones"] },
    { id: "jalon-polea", name: "Jalón al pecho", muscle: "espalda", equipment: ["gimnasio"], difficulty: "principiante", caloriesPerMinute: 8, instructions: "Sentado, agarre amplio, tira la barra hacia el pecho, controla subida", alternatives: ["dominadas asistidas", "remo polea"] },
    { id: "press-militar", name: "Press militar", muscle: "hombros", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 9, instructions: "Barra a la altura de hombros, extiende hacia arriba", alternatives: ["press con mancuernas"] },
    { id: "curl-barra", name: "Curl con barra", muscle: "biceps", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 7, instructions: "Barra con peso, flexiona codos manteniendo brazos quietos", alternatives: ["curl martillo"] },
    { id: "fondos", name: "Fondos", muscle: "triceps", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 8, instructions: "Manos en barras paralelas, baja el cuerpo extension codos", alternatives: ["fondos asistidos"] },
    { id: "prensa", name: "Prensa", muscle: "piernas", equipment: ["gimnasio"], difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Pies en plataforma, baja el peso flexionando rodillas", alternatives: ["sentadilla"] }
  ]
};

function getExercisesByEquipment(equipment) {
  var exercises = [];
  if (equipment.includes('casa')) exercises = exercises.concat(EXERCISES_DB.casa);
  if (equipment.includes('mancuernas')) exercises = exercises.concat(EXERCISES_DB.mancuernas);
  if (equipment.includes('gimnasio')) exercises = exercises.concat(EXERCISES_DB.gimnasio);
  return exercises;
}

function generateWorkoutRoutine(equipment, level, duration) {
  var availableExercises = getExercisesByEquipment(equipment);
  var filteredByLevel = availableExercises.filter(function(e) {
    if (level === 'principiante') return e.difficulty === 'principiante';
    if (level === 'intermedio') return ['principiante', 'intermedio'].includes(e.difficulty);
    return true;
  });
  var muscleGroups = ['pecho', 'espalda', 'piernas', 'hombros', 'core'];
  var selectedExercises = [];
  muscleGroups.forEach(function(muscle) {
    var candidates = filteredByLevel.filter(function(e) { return e.muscle === muscle; });
    if (candidates.length > 0) {
      selectedExercises.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
  });
  var setsPerExercise = Math.max(3, Math.floor(duration / 15));
  return selectedExercises.map(function(ex) {
    return { sets: setsPerExercise, reps: ex.muscle === 'core' ? 45 : 12 };
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXERCISES_DB, getExercisesByEquipment, generateWorkoutRoutine };
}
