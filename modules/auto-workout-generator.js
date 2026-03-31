// ==================== GENERADOR AUTOMÁTICO DE RUTINAS ====================

var autoWorkoutGenerator = (function() {
  'use strict';

  var muscleGroups = ['pecho', 'espalda', 'piernas', 'hombros', 'biceps', 'triceps', 'abdomen'];
  var weekDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  function getAllExercises() {
    if (typeof getExercises === 'function') {
      return getExercises();
    }
    return [];
  }

  function getPreferences() {
    // Always read fresh from profile to get latest values
    var profile = safeParseJSON(localStorage.getItem('keto_profile'), null);
    
    if (profile) {
      var equipment = ['casa'];
      if (profile.trainingType === 'dumbbells') {
        equipment = ['mancuernas'];
      } else if (profile.trainingType === 'weights' || profile.trainingType === 'both' || profile.trainingType === 'machines') {
        equipment = ['gimnasiototal'];
      }
      
      var level = 'principiante';
      if (profile.experience === 'intermediate') {
        level = 'intermedio';
      } else if (profile.experience === 'advanced') {
        level = 'avanzado';
      }
      
      var trainingFreq = parseInt(profile.trainingFreq) || 3;
      var duration = 30;
      if (trainingFreq === 4 || trainingFreq === 5) {
        duration = 45;
      } else if (trainingFreq >= 6) {
        duration = 60;
      }
      
      return {
        equipment: equipment,
        level: level,
        duration: duration,
        daysPerWeek: trainingFreq,
        goal: profile.trainingGoal || 'salud'
      };
    }
    
    return {
      equipment: ['casa'],
      level: 'principiante',
      duration: 30,
      daysPerWeek: 3,
      goal: 'salud'
    };
  }

  function savePreferences(prefs) {
    localStorage.setItem('workout_preferences', JSON.stringify(prefs));
  }

  function getAvailableExercises(prefs, muscleGroup, categories) {
    var all = getAllExercises();
    
    // Use specified categories or fall back to equipment mapping
    var categoryFilter = categories || [];
    
    if (categoryFilter.length === 0) {
      // Map equipment to categories
      if (prefs.equipment.includes('casa')) {
        categoryFilter.push('calistenia');
      }
      if (prefs.equipment.includes('mancuernas')) {
        categoryFilter.push('fuerza');
      }
      if (prefs.equipment.includes('gimnasio')) {
        categoryFilter.push('fuerza', 'maquina');
      }
    }
    
    // If no mapping and no categories, use all categories
    if (categoryFilter.length === 0) {
      categoryFilter = ['calistenia', 'fuerza', 'maquina'];
    }
    
    if (categoryFilter.length > 0) {
      all = all.filter(function(e) { return categoryFilter.includes(e.category); });
    }
    
    // Filter by muscle group for the day
    if (muscleGroup && muscleGroup !== 'descanso') {
      all = all.filter(function(e) { return e.muscle === muscleGroup; });
    }
    
    all = all.filter(function(e) { return e.category !== 'cardio'; });
    
    return all;
  }

  function getIntensityParams(level, goal, daysPerWeek) {
    // Base parameters by experience level
    var params = {
      sets: 3,
      reps: 12,
      restSeconds: 90
    };
    
    // Adjust based on experience level
    if (level === 'principiante') {
      params.sets = 3;
      params.reps = 15;
      params.restSeconds = 90;
    } else if (level === 'intermedio') {
      params.sets = 4;
      params.reps = 12;
      params.restSeconds = 60;
    } else if (level === 'avanzado') {
      params.sets = 5;
      params.reps = 8;
      params.restSeconds = 45;
    }
    
    // Adjust based on goal
    if (goal === 'fuerza') {
      // More sets, fewer reps, more rest
      params.sets += 1;
      params.reps -= 2;
      params.restSeconds += 30;
    } else if (goal === 'perder_grasa' || goal === 'perdida_grasa') {
      // More reps, less rest, moderate sets
      params.reps += 3;
      params.restSeconds -= 15;
    } else if (goal === 'salud') {
      // Balanced approach - no changes
    }
    
    // Adjust based on frequency (recovery)
    if (daysPerWeek >= 5) {
      // High frequency - reduce intensity slightly
      params.sets -= 1;
      params.restSeconds += 15;
    } else if (daysPerWeek <= 2) {
      // Low frequency - can push harder
      params.sets += 1;
      params.restSeconds -= 15;
    }
    
    // Ensure minimum values
    params.sets = Math.max(2, params.sets);
    params.reps = Math.max(6, params.reps);
    params.restSeconds = Math.max(30, params.restSeconds);
    
    return params;
  }

  function selectExercisesForDay(exercises, count, level, preferCategory, intensityParams) {
    if (exercises.length === 0) return [];
    
    // Separate exercises by category for mixing
    var byCategory = {
      calistenia: exercises.filter(function(e) { return e.category === 'calistenia'; }),
      fuerza: exercises.filter(function(e) { return e.category === 'fuerza'; }),
      maquina: exercises.filter(function(e) { return e.category === 'maquina'; })
    };
    
    var selected = [];
    var categories = ['calistenia', 'fuerza', 'maquina'];
    var usedCategories = {};
    
    // If preferCategory is specified, try to include it
    if (preferCategory && byCategory[preferCategory] && byCategory[preferCategory].length > 0) {
      var prefShuffled = byCategory[preferCategory].sort(function() { return Math.random() - 0.5; });
      selected.push(prefShuffled[0]);
      usedCategories[preferCategory] = true;
    }
    
    // Fill remaining slots by mixing categories
    var remaining = count - selected.length;
    var allRemaining = [];
    
    categories.forEach(function(cat) {
      if (!usedCategories[cat]) {
        allRemaining = allRemaining.concat(byCategory[cat] || []);
      }
    });
    
    var shuffled = allRemaining.sort(function() { return Math.random() - 0.5; });
    for (var i = 0; i < remaining && i < shuffled.length; i++) {
      selected.push(shuffled[i]);
    }
    
    // Final shuffle of selected exercises
    selected = selected.sort(function() { return Math.random() - 0.5; });
    
    var sets = intensityParams ? intensityParams.sets : 3;
    var reps = intensityParams ? intensityParams.reps : 12;
    var rest = intensityParams ? intensityParams.restSeconds : 90;
    
    return selected.map(function(ex) {
      return {
        id: ex.id,
        name: ex.name,
        muscle: ex.muscle,
        sets: sets,
        reps: reps,
        restSeconds: rest,
        category: ex.category || 'calistenia'
      };
    });
  }

  function generateWeeklyPlan() {
    var prefs = getPreferences();
    var daysPerWeek = prefs.daysPerWeek || 3;
    var duration = prefs.duration || 30;
    var level = prefs.level || 'principiante';
    var goal = prefs.goal || 'salud';
    var workoutType = prefs.workoutType || localStorage.getItem('workoutType') || 'mixto';
    
    // Calculate intensity parameters based on experience, goal, and frequency
    var intensityParams = getIntensityParams(level, goal, daysPerWeek);
    
    // Determine which days to train based on daysPerWeek
    var trainingDays = [];
    var restDays = [];
    
    // Always use Monday as start, spread workouts evenly
    var dayIndices = [];
    var days = parseInt(daysPerWeek) || 3;
    
    if (days === 1) {
      dayIndices = [0]; // Monday
    } else if (days === 2) {
      dayIndices = [0, 3]; // Mon, Thu
    } else if (days === 3) {
      dayIndices = [0, 2, 4]; // Mon, Wed, Fri
    } else if (days === 4) {
      dayIndices = [0, 1, 3, 4]; // Mon, Tue, Thu, Fri
    } else if (days === 5) {
      dayIndices = [0, 1, 2, 3, 4]; // Mon-Fri
    } else if (days === 6) {
      dayIndices = [0, 1, 2, 3, 4, 5]; // Mon-Sat
    } else if (days >= 7) {
      dayIndices = [0, 1, 2, 3, 4, 5, 6]; // All days
    }
    
    // Determine categories based on workout type
    var categoryCycle;
    if (workoutType === 'calistenia') {
      categoryCycle = ['calistenia', 'calistenia', 'calistenia', 'calistenia'];
    } else if (workoutType === 'fuerza') {
      categoryCycle = ['fuerza', 'fuerza', 'fuerza', 'fuerza'];
    } else if (workoutType === 'maquina') {
      categoryCycle = ['maquina', 'maquina', 'maquina', 'maquina'];
    } else {
      // Mixto - alternate all categories
      categoryCycle = ['calistenia', 'fuerza', 'maquina', 'fuerza'];
    }
    
    // Assign muscle groups to training days with rotation
    var muscleIndex = 0;
    var weeklyPlan = {};
    
    weekDays.forEach(function(day, idx) {
      if (dayIndices.includes(idx)) {
        var muscle = muscleGroups[muscleIndex % muscleGroups.length];
        var preferCategory = categoryCycle[muscleIndex % categoryCycle.length];
        var exercises = getAvailableExercises(prefs, muscle);
        var exerciseCount = Math.max(3, Math.floor(duration / 8));
        var selectedExercises = selectExercisesForDay(exercises, exerciseCount, level, preferCategory, intensityParams);
        
        weeklyPlan[day] = {
          training: true,
          muscle: muscle,
          exercises: selectedExercises,
          duration: duration,
          estimatedCalories: Math.round(duration * 5),
          mainCategory: preferCategory,
          workoutType: workoutType,
          intensity: intensityParams
        };
        
        muscleIndex++;
      } else {
        weeklyPlan[day] = {
          training: false,
          muscle: 'descanso',
          exercises: [],
          duration: 0,
          estimatedCalories: 0
        };
      }
    });
    
    var plan = {
      startDate: new Date().toISOString().slice(0, 10),
      preferences: prefs,
      weekPlan: weeklyPlan,
      intensity: intensityParams,
      generatedAt: new Date().toISOString()
    };
    
    // Save the weekly plan
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(plan));
    
    return {
      success: true,
      plan: plan
    };
  }

  function getWeeklyPlan() {
    return safeParseJSON(localStorage.getItem('weeklyWorkoutPlan'), null);
  }

  function getTodayWorkout() {
    var plan = getWeeklyPlan();
    if (!plan || !plan.weekPlan) return null;
    
    var today = new Date();
    var dayName = weekDays[today.getDay() === 0 ? 6 : today.getDay() - 1];
    
    return plan.weekPlan[dayName] || null;
  }

  function markDayCompleted(dayName) {
    var plan = getWeeklyPlan();
    if (!plan || !plan.weekPlan || !plan.weekPlan[dayName]) return;
    
    plan.weekPlan[dayName].completed = true;
    plan.weekPlan[dayName].completedAt = new Date().toISOString();
    
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(plan));
  }

  function generateSingleRoutine() {
    var prefs = getPreferences();
    var allExercises = getAvailableExercises(prefs, null);
    var duration = prefs.duration || 30;
    var level = prefs.level || 'principiante';
    
    if (allExercises.length === 0) {
      return {
        success: false,
        error: 'No hay ejercicios disponibles.'
      };
    }
    
    var exerciseCount = Math.max(4, Math.floor(duration / 7));
    var shuffled = allExercises.sort(function() { return Math.random() - 0.5; });
    var selected = shuffled.slice(0, exerciseCount);
    
    var routine = {
      date: new Date().toISOString().slice(0, 10),
      duration: duration,
      level: level,
      equipment: prefs.equipment,
      estimatedCalories: Math.round(duration * 5),
      exercises: selected.map(function(ex) {
        return {
          id: ex.id,
          name: ex.name,
          muscle: ex.muscle,
          sets: ex.sets || 3,
          reps: ex.reps || 12,
          restSeconds: level === 'principiante' ? 90 : 60,
          category: ex.category || 'calistenia'
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
    var today = new Date().toISOString().slice(0, 10);
    
    var workoutData = {
      id: 'auto_' + Date.now(),
      date: today,
      duration: routine.duration || 30,
      calories: routine.estimatedCalories || 300,
      completed: completed,
      exercises: routine.exercises || [],
      completedExercises: routine.completedExercises || routine.exercises.length,
      isAutoGenerated: true,
      exerciseTimes: routine.exerciseTimes || {},
      actualData: routine.actualData || {}
    };
    
    logs.push(workoutData);
    
    var ketoWorkouts = safeParseJSON(localStorage.getItem('ketoWorkouts'), []);
    ketoWorkouts.push(workoutData);
    
    if (logs.length > 30) logs = logs.slice(-30);
    if (ketoWorkouts.length > 30) ketoWorkouts = ketoWorkouts.slice(-30);
    
    localStorage.setItem('workout_logs', JSON.stringify(logs));
    localStorage.setItem('ketoWorkouts', JSON.stringify(ketoWorkouts));
    
    // Mark today as completed in weekly plan
    var dayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    markDayCompleted(weekDays[dayIndex]);
  }

  return {
    generate: generateSingleRoutine,
    generateWeekly: generateWeeklyPlan,
    getWeeklyPlan: getWeeklyPlan,
    getTodayWorkout: getTodayWorkout,
    getPreferences: getPreferences,
    savePreferences: savePreferences,
    getAvailableExercises: getAvailableExercises,
    saveWorkoutLog: saveWorkoutLog,
    markDayCompleted: markDayCompleted
  };
})();

// Funciones globales
function generateAutoWorkout() {
  return autoWorkoutGenerator.generate();
}

function generateWeeklyWorkoutPlan() {
  return autoWorkoutGenerator.generateWeekly();
}

function getWeeklyWorkoutPlan() {
  return autoWorkoutGenerator.getWeeklyPlan();
}

function getTodayWorkout() {
  return autoWorkoutGenerator.getTodayWorkout();
}

function getWorkoutPreferences() {
  return autoWorkoutGenerator.getPreferences();
}

function saveWorkoutPreferences(prefs) {
  autoWorkoutGenerator.savePreferences(prefs);
}
