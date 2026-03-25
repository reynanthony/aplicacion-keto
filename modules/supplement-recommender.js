// ==================== RECOMENDADOR DE SUPLEMENTOS ====================

var supplementRecommender = (function() {
  'use strict';

  var supplementsDB = {
    essential: [
      { id: "electrolitos", name: "Electrolitos", category: "esencial", description: "Previene el 'gripe keto', esencial en adaptación", dosage: "Sodio 3-5g, Magnesio 300-400mg, Potasio 3-5g al día", timing: "Distribuir a lo largo del día", source: "Sal marina, magnesio citrato, potasio en alimentos", priority: "alta", icon: "science" },
      { id: "vitamina-d3", name: "Vitamina D3", category: "esencial", description: "Importante para absorción de calcio y sistema inmune", dosage: "2000-4000 UI al día", timing: "Con comida que contenga grasa", source: "Sol, pescados grasos, suplemento", priority: "alta", icon: "wb_sunny" },
      { id: "omega-3", name: "Omega-3 (EPA/DHA)", category: "esencial", description: "Reduce inflamación, apoya salud cardiovascular", dosage: "1000-2000mg EPA+DHA al día", timing: "Con las comidas", source: "Pescados grasos, suplemento", priority: "alta", icon: "water" }
    ],
    performance: [
      { id: "creatina", name: "Creatina monohidratada", category: "rendimiento", description: "Mejora fuerza, potencia y recuperación", dosage: "3-5g al día", timing: "Cualquier momento, post-entrenamiento", source: "Suplemento", priority: "alta", objetivo: ["musculo", "fuerza", "rendimiento"], icon: "fitness_center" },
      { id: "cafeina", name: "Cafeína", category: "energía", description: "Aumenta energía y concentración durante el entrenamiento", dosage: "100-200mg pre-entreno", timing: "30-60 min antes de entrenar", source: "Café, té, suplemento", priority: "media", objetivo: ["energia", "rendimiento"], icon: "local_cafe" },
      { id: "bcaa", name: "BCAAs", category: "recuperación", description: "Ayuda a reducir daño muscular y fatiga", dosage: "5-10g al día", timing: "Antes, durante o después del entrenamiento", source: "Suplemento", priority: "media", objetivo: ["musculo", "recuperacion"], icon: "bolt" }
    ],
    weight: [
      { id: "mct-oil", name: "Aceite MCT", category: "energía", description: "Fuente rápida de energía cetogénica, ayuda a saciedad", dosage: "10-20ml al día", timing: "Con comidas o en café", source: "Suplemento", priority: "media", objetivo: ["perdida_peso", "energia"], icon: "local_drink" },
      { id: "l-carnitina", name: "L-Carnitina", category: "oxidación", description: "Ayuda a transportar grasas a las mitocondrias", dosage: "500-2000mg al día", timing: "30-60 min antes de entrenar", source: "Suplemento, carne roja", priority: "baja", objetivo: ["perdida_peso"], icon: "local_fire_department" }
    ],
    general: [
      { id: "magnesio", name: "Magnesio", category: "salud", description: "Apoya función muscular, nerviosa y sueño", dosage: "300-400mg al día", timing: "Antes de dormir", source: "Alimentos, suplemento", priority: "media", objetivo: ["salud", "sueno"], icon: "nightlight" },
      { id: "colageno", name: "Colágeno", category: "salud", description: "Apoya salud de piel, cabello, uñas y articulaciones", dosage: "10-15g al día", timing: "Con el desayuno", source: "Suplemento", priority: "baja", objetivo: ["salud", "belleza"], icon: "spa" },
      { id: "multivitaminico", name: "Multivitamínico", category: "seguridad", description: "Asegura nutrientes esenciales", dosage: "1 dosis diaria", timing: "Con el desayuno", source: "Suplemento", priority: "media", objetivo: ["salud", "seguridad"], icon: "medication" }
    ]
  };

  function getProfile() {
    var ketoProfile = safeParseJSON(localStorage.getItem('keto_profile'), {});
    var workoutPrefs = safeParseJSON(localStorage.getItem('workout_preferences'), {});
    var userData = safeParseJSON(localStorage.getItem('userData'), {});
    
    return {
      weight: ketoProfile.weight || userData.currentWeight || 80,
      goal: ketoProfile.goalWeight ? (ketoProfile.weight > ketoProfile.goalWeight ? 'perdida_peso' : 'mantenimiento') : 'salud',
      hasExercise: workoutPrefs.duration > 0 || false,
      workoutDays: workoutPrefs.daysPerWeek || 0,
      level: workoutPrefs.level || 'principiante',
      monthsOnKeto: parseInt(ketoProfile.monthsOnKeto) || 1
    };
  }

  function getCurrentSupplements() {
    return safeParseJSON(localStorage.getItem('user_supplements'), []);
  }

  function saveCurrentSupplements(list) {
    localStorage.setItem('user_supplements', JSON.stringify(list));
  }

  function getRecommendations(profile) {
    var recommended = [];
    var essential = supplementsDB.essential.slice();
    recommended = recommended.concat(essential);
    
    if (profile.hasExercise) {
      var perf = supplementsDB.performance.slice();
      recommended = recommended.concat(perf.filter(function(s) {
        return s.objetivo.includes(profile.goal) || s.objetivo.includes('rendimiento');
      }));
      
      if (profile.workoutDays >= 3) {
        recommended.push(supplementsDB.general.find(function(s) { return s.id === 'magnesio'; }));
      }
    }
    
    if (profile.goal === 'perdida_peso') {
      recommended = recommended.concat(supplementsDB.weight);
    }
    
    if (profile.monthsOnKeto < 3) {
      var hasElectrolitos = recommended.some(function(s) { return s.id === 'electrolitos'; });
      if (!hasElectrolitos) {
        recommended.unshift(supplementsDB.essential.find(function(s) { return s.id === 'electrolitos'; }));
      }
    }
    
    var current = getCurrentSupplements();
    recommended = recommended.filter(function(r) {
      return !current.some(function(c) { return c.id === r.id; });
    });
    
    return recommended;
  }

  function generate() {
    var profile = getProfile();
    var current = getCurrentSupplements();
    var recommended = getRecommendations(profile);
    
    return {
      profile: profile,
      current: current,
      recommended: recommended,
      disclaimer: "Estas recomendaciones son informativas. Consulta con un profesional de la salud antes de iniciar cualquier suplementación."
    };
  }

  function addSupplement(supplement) {
    var current = getCurrentSupplements();
    if (!current.some(function(s) { return s.id === supplement.id; })) {
      current.push(supplement);
      saveCurrentSupplements(current);
    }
  }

  function removeSupplement(supplementId) {
    var current = getCurrentSupplements();
    current = current.filter(function(s) { return s.id !== supplementId; });
    saveCurrentSupplements(current);
  }

  return {
    generate: generate,
    getRecommendations: getRecommendations,
    getCurrentSupplements: getCurrentSupplements,
    addSupplement: addSupplement,
    removeSupplement: removeSupplement,
    supplementsDB: supplementsDB
  };
})();

// Funciones globales
function getSupplementRecommendations() {
  return supplementRecommender.generate();
}

function addSupplementToUserList(supplement) {
  supplementRecommender.addSupplement(supplement);
}

function removeSupplementFromUserList(supplementId) {
  supplementRecommender.removeSupplement(supplementId);
}

function getUserCurrentSupplements() {
  return supplementRecommender.getCurrentSupplements();
}
