// ==================== BASE DE DATOS DE SUPLEMENTOS ====================

const SUPPLEMENTS_DB = {
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

function getSupplementRecommendations(hasExercise, goal) {
  var recommendations = [];
  
  recommendations = recommendations.concat(SUPPLEMENTS_DB.essential);
  
  if (hasExercise) {
    var perfFiltered = SUPPLEMENTS_DB.performance.filter(function(s) {
      return s.objetivo.includes(goal) || s.objetivo.includes('rendimiento');
    });
    recommendations = recommendations.concat(perfFiltered);
  }
  
  if (goal === 'perdida_peso') {
    recommendations = recommendations.concat(SUPPLEMENTS_DB.weight);
  }
  
  return recommendations;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPPLEMENTS_DB, getSupplementRecommendations };
}
