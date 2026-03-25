// ==================== GENERADOR AUTOMÁTICO DE RUTINAS ====================

var autoWorkoutGenerator = (function() {
  'use strict';

  var exercisesDB = {
    casa: [
      { id: "sentadillas", name: "Sentadillas", muscle: "piernas", difficulty: "principiante", caloriesPerMinute: 8, instructions: "Pies al ancho de hombros, espalda recta, baja como si fueras a sentarte", alternatives: ["sentadillas búlgaras", "zancadas"] },
      { id: "flexiones", name: "Flexiones de pecho", muscle: "pecho", difficulty: "principiante", caloriesPerMinute: 7, instructions: "Manos al ancho de hombros, cuerpo recto, baja hasta que el pecho casi toque el suelo", alternatives: ["flexiones rodillas", "flexiones inclinadas"] },
      { id: "plancha", name: "Plancha abdominal", muscle: "core", difficulty: "principiante", caloriesPerMinute: 5, instructions: "Apoya antebrazos y puntas de pies, cuerpo recto, contrae abdomen", alternatives: ["plancha lateral", "plancha con elevación"] },
      { id: "zancadas", name: "Zancadas", muscle: "piernas", difficulty: "principiante", caloriesPerMinute: 9, instructions: "Da un paso largo hacia adelante, baja la cadera hasta que ambas rodillas estén a 90°", alternatives: ["zancadas laterales", "zancadas reversas"] },
      { id: "burpees", name: "Burpees", muscle: "cardio", difficulty: "intermedio", caloriesPerMinute: 12, instructions: "Desde posición de pie, baja en cuclillas, lanza pies atrás, haz flexión, salta", alternatives: ["burpees sin flexión"] },
      { id: "mountain-climbers", name: "Mountain Climbers", muscle: "cardio", difficulty: "intermedio", caloriesPerMinute: 11, instructions: "En posición de plancha, lleva las rodillas al pecho alternadamente", alternatives: ["step touch"] },
      { id: "saltos-comba", name: "Saltos de comba", muscle: "cardio", difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Salta alternando pies, mantenimiento durante 1 minuto", alternatives: ["saltos lateral"] },
      { id: "puentes", name: "Puentes de glúteos", muscle: "piernas", difficulty: "principiante", caloriesPerMinute: 4, instructions: "Acostado boca arriba, levanta las cadera contrae gluteos abajo", alternatives: ["puente unilateral"] }
    ],
    mancuernas: [
      { id: "press-mancuernas", name: "Press de hombros", muscle: "hombros", difficulty: "principiante", caloriesPerMinute: 8, instructions: "De pie, mancuernas a la altura de hombros, sube hasta extender brazos", alternatives: ["press militar", "elevaciones laterales"] },
      { id: "curl-biceps", name: "Curl de bíceps", muscle: "biceps", difficulty: "principiante", caloriesPerMinute: 6, instructions: "Mancuernas en cada mano, palmas hacia adelante, flexiona codos sin mover brazos", alternatives: ["curl concentrado", "curl martillo"] },
      { id: "remo-mancuerna", name: "Remo con mancuerna", muscle: "espalda", difficulty: "intermedio", caloriesPerMinute: 8, instructions: "Apoya una rodilla y mano en banco, con la otra mano tira la mancuerna hacia la cadera", alternatives: ["remo con barra", "jalón al pecho"] },
      { id: "sentadilla-copa", name: "Sentadilla copa", muscle: "piernas", difficulty: "principiante", caloriesPerMinute: 9, instructions: "Sujeta una mancuerna contra el pecho, baja en sentadilla manteniendo espalda recta", alternatives: ["sentadilla goblet", "sentadilla búlgara"] },
      { id: "press-banca-mancuerna", name: "Press de banca", muscle: "pecho", difficulty: "intermedio", caloriesPerMinute: 9, instructions: "Acostado en banco/suelo, baja mancuernas hasta el pecho y empuja hacia arriba", alternatives: ["flexiones", "press inclinado"] },
      { id: "extension-triceps", name: "Extensión de tríceps", muscle: "triceps", difficulty: "principiante", caloriesPerMinute: 5, instructions: "Mancuerna con ambas manos detrás de la cabeza, extiende hacia arriba", alternatives: ["fondos"] }
    ],
    gimnasiototal: [
      { id: "press-banca-barra", name: "Press de banca", muscle: "pecho", difficulty: "intermedio", caloriesPerMinute: 10, instructions: "Acostado en banco, agarra la barra, baja hasta el pecho, empuja", alternatives: ["press banca mancuernas", "fondos"] },
      { id: "sentadilla-barra", name: "Sentadilla con barra", muscle: "piernas", difficulty: "intermedio", caloriesPerMinute: 11, instructions: "Barra en trapecio, baja manteniendo espalda recta, sube con fuerza", alternatives: ["sentadilla hack", "prensa"] },
      { id: "peso-muerto", name: "Peso muerto", muscle: "espalda", difficulty: "avanzado", caloriesPerMinute: 12, instructions: "Pies al ancho de hombros, agarra la barra, espalda recta, levanta con piernas", alternativas: ["peso muerto rumano", "hiperextensiones"] },
      { id: "jalon-polea", name: "Jalón al pecho", muscle: "espalda", difficulty: "principiante", caloriesPerMinute: 8, instructions: "Sentado, agarre amplio, tira la barra hacia el pecho, controla subida", alternatives: ["dominadas asistidas", "remo polea"] }
    ]
  };

  function getPreferences() {
    return safeParseJSON(localStorage.getItem('workout_preferences'), {
      equipment: ['casa'],
      level: 'principiante',
      duration: 30,
      daysPerWeek: 3,
      goal: 'salud'
    });
  }

  function savePreferences(prefs) {
    localStorage.setItem('workout_preferences', JSON.stringify(prefs));
  }

  function getAvailableExercises(prefs) {
    var all = [];
    
    if (prefs.equipment.includes('casa')) {
      all = all.concat(exercisesDB.casa);
    }
    if (prefs.equipment.includes('mancuernas')) {
      all = all.concat(exercisesDB.mancuernas);
    }
    if (prefs.equipment.includes('gimnasio')) {
      all = all.concat(exercisesDB.gimnasiototal);
    }
    
    return all;
  }

  function filterByLevel(exercises, level) {
    if (level === 'principiante') {
      return exercises.filter(function(e) { return e.difficulty === 'principiante'; });
    } else if (level === 'intermedio') {
      return exercises.filter(function(e) { return ['principiante', 'intermedio'].includes(e.difficulty); });
    }
    return exercises;
  }

  function selectBalancedExercises(exercises, count) {
    var muscleGroups = ['pecho', 'espalda', 'piernas', 'hombros', 'core', 'biceps', 'triceps', 'cardio'];
    var selected = [];
    var usedMuscles = {};
    
    // Primero priorizar grupos musculares diferentes
    var shuffled = exercises.sort(function() { return Math.random() - 0.5; });
    
    shuffled.forEach(function(ex) {
      if (selected.length >= count) return;
      
      if (!usedMuscles[ex.muscle] || (ex.muscle === 'cardio' && selected.filter(function(s) { return s.muscle === 'cardio'; }).length < 2)) {
        selected.push(ex);
        usedMuscles[ex.muscle] = true;
      }
    });
    
    // Si necesitamos más, agregar cardio
    while (selected.length < count) {
      var cardioEx = exercises.find(function(e) { return e.muscle === 'cardio' && !selected.includes(e); });
      if (cardioEx) {
        selected.push(cardioEx);
      } else {
        break;
      }
    }
    
    return selected;
  }

  function generateRoutine() {
    var prefs = getPreferences();
    var allExercises = getAvailableExercises(prefs);
    var filteredExercises = filterByLevel(allExercises, prefs.level);
    
    if (filteredExercises.length === 0) {
      return {
        success: false,
        error: 'No hay ejercicios disponibles para tu nivel y equipamiento.'
      };
    }
    
    // Número de ejercicios según duración
    var exerciseCount = Math.max(4, Math.floor(prefs.duration / 7));
    var selectedExercises = selectBalancedExercises(filteredExercises, exerciseCount);
    
    // Calcular series y repeticiones
    var setsPerExercise = Math.max(3, Math.floor(prefs.duration / (selectedExercises.length * 2)));
    var reps = prefs.level === 'principiante' ? 12 : (prefs.level === 'intermedio' ? 15 : 20);
    
    // Calcular calorías estimadas
    var totalCalories = selectedExercises.reduce(function(sum, ex) {
      return sum + (ex.caloriesPerMinute * prefs.duration / selectedExercises.length);
    }, 0);
    
    var routine = {
      date: new Date().toISOString().slice(0, 10),
      duration: prefs.duration,
      level: prefs.level,
      equipment: prefs.equipment,
      estimatedCalories: Math.round(totalCalories),
      exercises: selectedExercises.map(function(ex, index) {
        return {
          id: ex.id,
          name: ex.name,
          muscle: ex.muscle,
          sets: setsPerExercise,
          reps: reps,
          restSeconds: prefs.level === 'principiante' ? 60 : 45,
          instructions: ex.instructions,
          alternatives: ex.alternatives || [],
          order: index + 1
        };
      }),
      isAutoGenerated: true
    };
    
    return {
      success: true,
      routine: routine,
      preferences: prefs
    };
  }

  function saveWorkoutLog(routine, completed) {
    var logs = safeParseJSON(localStorage.getItem('workout_logs'), []);
    logs.push({
      date: routine.date,
      duration: routine.duration,
      calories: routine.estimatedCalories,
      completed: completed,
      exercises: routine.exercises.map(function(e) { return e.name; }),
      isAutoGenerated: routine.isAutoGenerated
    });
    
    // Mantener solo últimos 30 días
    if (logs.length > 30) {
      logs = logs.slice(-30);
    }
    
    localStorage.setItem('workout_logs', JSON.stringify(logs));
  }

  return {
    generate: generateRoutine,
    getPreferences: getPreferences,
    savePreferences: savePreferences,
    getAvailableExercises: getAvailableExercises,
    saveWorkoutLog: saveWorkoutLog
  };
})();

// Funciones globales
function generateAutoWorkout() {
  return autoWorkoutGenerator.generate();
}

function getWorkoutPreferences() {
  return autoWorkoutGenerator.getPreferences();
}

function saveWorkoutPreferences(prefs) {
  autoWorkoutGenerator.savePreferences(prefs);
}
