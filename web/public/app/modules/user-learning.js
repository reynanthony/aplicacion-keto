// ==================== USER LEARNING ENGINE - KetoCore ====================
// Sistema de aprendizaje de preferencias del usuario basado en feedback
// Versión simplificada para frontend (localStorage)

(function() {
  'use strict';

  var STORAGE_KEY = 'keto_user_learning';
  var PROFILE_KEY = 'keto_user_profile';
  var HISTORY_KEY = 'keto_recipe_history';

  var UserLearningEngine = {
    data: null,
    initialized: false,

    init: function() {
      this.data = this.loadData();
      this.initialized = true;
      console.log('[UserLearning] Inicializado con', this.getTotalFeedbacks(), 'feedbacks guardados');
      return this;
    },

    loadData: function() {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch(e) {
          return this.getDefaultData();
        }
      }
      return this.getDefaultData();
    },

    saveData: function() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    },

    getDefaultData: function() {
      return {
        feedbacks: [],
        ingredientPreferences: {},
        dislikedIngredients: {},
        likedRecipes: {},
        dislikedRecipes: {},
        recipeRatings: {},
        skippedRecipes: {},
        sessionCount: 0,
        firstUse: new Date().toISOString(),
        lastUse: new Date().toISOString()
      };
    },

    getTotalFeedbacks: function() {
      return this.data.feedbacks ? this.data.feedbacks.length : 0;
    },

    // ==================== REGISTRO DE FEEDBACK ====================

    registrarFeedback: function(tipo, datos) {
      var feedback = {
        tipo: tipo,
        timestamp: new Date().toISOString(),
        ...datos
      };

      this.data.feedbacks.push(feedback);
      this.data.lastUse = new Date().toISOString();
      this.procesarFeedback(feedback);
      this.saveData();

      console.log('[UserLearning] Feedback registrado:', tipo, datos);
      return feedback;
    },

    registrarLikeReceta: function(recetaId, recetaNombre, ingredientes) {
      return this.registrarFeedback('like_receta', {
        recetaId: recetaId,
        recetaNombre: recetaNombre,
        ingredientes: ingredientes || []
      });
    },

    registrarDislikeReceta: function(recetaId, recetaNombre, ingredientes) {
      return this.registrarFeedback('dislike_receta', {
        recetaId: recetaId,
        recetaNombre: recetaNombre,
        ingredientes: ingredientes || []
      });
    },

    registrarCalificacion: function(recetaId, recetaNombre, calificacion, ingredientes) {
      return this.registrarFeedback('calificacion', {
        recetaId: recetaId,
        recetaNombre: recetaNombre,
        calificacion: calificacion,
        ingredientes: ingredientes || []
      });
    },

    registrarLikeIngrediente: function(ingredienteNombre) {
      return this.registrarFeedback('like_ingrediente', {
        ingrediente: ingredienteNombre
      });
    },

    registrarDislikeIngrediente: function(ingredienteNombre) {
      return this.registrarFeedback('dislike_ingrediente', {
        ingrediente: ingredienteNombre
      });
    },

    registrarRecetaVista: function(recetaId) {
      return this.registrarFeedback('vista_receta', {
        recetaId: recetaId
      });
    },

    registrarRecetaSaltada: function(recetaId) {
      var skips = this.data.skippedRecipes[recetaId] || 0;
      this.data.skippedRecipes[recetaId] = skips + 1;
      this.saveData();
    },

    // ==================== PROCESAMIENTO DE FEEDBACK ====================

    procesarFeedback: function(feedback) {
      switch(feedback.tipo) {
        case 'like_receta':
          this.procesarLikeReceta(feedback);
          break;
        case 'dislike_receta':
          this.procesarDislikeReceta(feedback);
          break;
        case 'calificacion':
          this.procesarCalificacion(feedback);
          break;
        case 'like_ingrediente':
          this.procesarLikeIngrediente(feedback);
          break;
        case 'dislike_ingrediente':
          this.procesarDislikeIngrediente(feedback);
          break;
      }
    },

    procesarLikeReceta: function(feedback) {
      var recetaId = feedback.recetaId;
      var current = this.data.likedRecipes[recetaId] || 0;
      this.data.likedRecipes[recetaId] = current + 1;

      if (feedback.ingredientes) {
        feedback.ingredientes.forEach(function(ing) {
          var likes = this.data.ingredientPreferences[ing] || 0;
          this.data.ingredientPreferences[ing] = likes + 2;
        }.bind(this));
      }
    },

    procesarDislikeReceta: function(feedback) {
      var recetaId = feedback.recetaId;
      this.data.dislikedRecipes[recetaId] = (this.data.dislikedRecipes[recetaId] || 0) + 1;

      if (feedback.ingredientes) {
        feedback.ingredientes.forEach(function(ing) {
          var likes = this.data.ingredientPreferences[ing] || 0;
          this.data.ingredientPreferences[ing] = Math.max(-10, likes - 3);
          this.data.dislikedIngredients[ing] = (this.data.dislikedIngredients[ing] || 0) + 1;
        }.bind(this));
      }
    },

    procesarCalificacion: function(feedback) {
      var recetaId = feedback.recetaId;
      var cal = feedback.calificacion;

      this.data.recipeRatings[recetaId] = this.data.recipeRatings[recetaId] || [];
      this.data.recipeRatings[recetaId].push({
        rating: cal,
        timestamp: feedback.timestamp
      });

      if (cal >= 4) {
        this.procesarLikeReceta(feedback);
      } else if (cal <= 2) {
        this.procesarDislikeReceta(feedback);
      }
    },

    procesarLikeIngrediente: function(feedback) {
      var ing = feedback.ingrediente;
      var current = this.data.ingredientPreferences[ing] || 0;
      this.data.ingredientPreferences[ing] = current + 3;
    },

    procesarDislikeIngrediente: function(feedback) {
      var ing = feedback.ingrediente;
      var current = this.data.ingredientPreferences[ing] || 0;
      this.data.ingredientPreferences[ing] = Math.max(-10, current - 3);
      this.data.dislikedIngredients[ing] = (this.data.dislikedIngredients[ing] || 0) + 1;
    },

    // ==================== CONSULTAS DE PREFERENCIAS ====================

    getIngredientPreference: function(ingredienteNombre) {
      return this.data.ingredientPreferences[ingredienteNombre] || 0;
    },

    isIngredientDisliked: function(ingredienteNombre) {
      return (this.data.dislikedIngredients[ingredienteNombre] || 0) >= 2;
    },

    isIngredientLiked: function(ingredienteNombre) {
      return (this.data.ingredientPreferences[ingredienteNombre] || 0) >= 3;
    },

    isRecipeLiked: function(recetaId) {
      return (this.data.likedRecipes[recetaId] || 0) >= 1;
    },

    isRecipeDisliked: function(recetaId) {
      return (this.data.dislikedRecipes[recetaId] || 0) >= 1;
    },

    isRecipeSkipped: function(recetaId) {
      return (this.data.skippedRecipes[recetaId] || 0) >= 3;
    },

    getRecipeRating: function(recetaId) {
      var ratings = this.data.recipeRatings[recetaId] || [];
      if (ratings.length === 0) return null;
      var sum = ratings.reduce(function(a, b) { return a + b.rating; }, 0);
      return sum / ratings.length;
    },

    getTopLikedIngredients: function(limit) {
      var prefs = this.data.ingredientPreferences;
      return Object.keys(prefs)
        .filter(function(k) { return prefs[k] > 2; })
        .sort(function(a, b) { return prefs[b] - prefs[a]; })
        .slice(0, limit)
        .map(function(ing) { return { nombre: ing, score: prefs[ing] }; });
    },

    getTopDislikedIngredients: function(limit) {
      var prefs = this.data.ingredientPreferences;
      return Object.keys(prefs)
        .filter(function(k) { return prefs[k] < -2; })
        .sort(function(a, b) { return prefs[a] - prefs[b]; })
        .slice(0, limit)
        .map(function(ing) { return { nombre: ing, score: prefs[ing] }; });
    },

    getIngredientsToAvoid: function() {
      return Object.keys(this.data.dislikedIngredients)
        .filter(function(ing) { return this.data.dislikedIngredients[ing] >= 2; }.bind(this));
    },

    // ==================== SCORING PARA RECOMENDACIONES ====================

    calculateRecipeScore: function(receta) {
      var score = 100;
      var ingredientes = receta.ingredients || receta.ingredientes || [];
      var ingNames = ingredientes.map(function(i) { return (i.name || i.nombre || '').toLowerCase(); });

      // Penalizar ingredientes evitados
      var evitados = this.getIngredientsToAvoid();
      evitados.forEach(function(evitado) {
        var evitadoLower = evitado.toLowerCase();
        ingNames.forEach(function(ing) {
          if (ing.indexOf(evitadoLower) >= 0 || evitadoLower.indexOf(ing) >= 0) {
            score -= 30;
          }
        });
      });

      // Recompensar ingredientes liked
      var liked = this.getTopLikedIngredients(10);
      liked.forEach(function(like) {
        var likeLower = like.nombre.toLowerCase();
        ingNames.forEach(function(ing) {
          if (ing.indexOf(likeLower) >= 0 || likeLower.indexOf(ing) >= 0) {
            score += 5;
          }
        });
      });

      // Penalizar recetas ya vistas/saltadas
      var recetaId = receta.id || receta.title;
      if (this.isRecipeSkipped(recetaId)) {
        score -= 50;
      }
      if (this.isRecipeDisliked(recetaId)) {
        score -= 40;
      }

      // Recompensar recetas liked
      if (this.isRecipeLiked(recetaId)) {
        score += 20;
      }

      return Math.max(0, Math.min(100, score));
    },

    scoreRecipes: function(recetas) {
      var self = this;
      return recetas.map(function(receta) {
        return {
          receta: receta,
          score: self.calculateRecipeScore(receta)
        };
      }).sort(function(a, b) { return b.score - a.score; });
    },

    // ==================== PERFIL DE USUARIO ====================

    generarPerfilUsuario: function() {
      var perfil = {
        generadoEl: new Date().toISOString(),
        sessionCount: this.data.sessionCount,
        totalFeedbacks: this.getTotalFeedbacks(),
        nivelExperiencia: this.calcularNivelExperiencia(),
        ingredientesFavoritos: this.getTopLikedIngredients(10),
        ingredientesEvitados: this.getTopDislikedIngredients(10),
        recetasFavoritas: this.getRecetasMasGustadas(5),
        recetasEvitadas: this.getRecetasMasDisgustadas(5),
        preferenciasMacros: this.inferirPreferenciasMacros()
      };

      localStorage.setItem(PROFILE_KEY, JSON.stringify(perfil));
      return perfil;
    },

    getPerfilUsuario: function() {
      var stored = localStorage.getItem(PROFILE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch(e) {}
      }
      return this.generarPerfilUsuario();
    },

    calcularNivelExperiencia: function() {
      var total = this.getTotalFeedbacks();
      if (total >= 50) return 'avanzado';
      if (total >= 20) return 'intermedio';
      if (total >= 5) return 'principiante';
      return 'nuevo';
    },

    inferirPreferenciasMacros: function() {
      var prefs = {
        prefieroBajosCarbs: false,
        prefieroAltasGrasas: true,
        prefieroProteinasAltas: false,
        sensibilidadCarbs: 'media'
      };

      var likedIngs = this.getTopLikedIngredients(15);
      var lowCarbCount = 0;
      var highFatCount = 0;

      var ketoFats = ['mantequilla', 'aguacate', 'aceite', 'queso', 'crema', 'tocino', 'nata'];
      var lowCarbVeggies = ['espinacas', 'brócoli', 'coliflor', 'calabacin', 'lechuga'];

      likedIngs.forEach(function(item) {
        var name = item.nombre.toLowerCase();
        ketoFats.forEach(function(fat) {
          if (name.indexOf(fat) >= 0) highFatCount++;
        });
        lowCarbVeggies.forEach(function(veg) {
          if (name.indexOf(veg) >= 0) lowCarbCount++;
        });
      });

      prefs.prefieroAltasGrasas = highFatCount > lowCarbCount;
      prefs.prefieroBajosCarbs = lowCarbCount > 3;

      return prefs;
    },

    getRecetasMasGustadas: function(limit) {
      var liked = this.data.likedRecipes;
      return Object.keys(liked)
        .filter(function(id) { return liked[id] >= 1; })
        .sort(function(a, b) { return liked[b] - liked[a]; })
        .slice(0, limit)
        .map(function(id) { return { id: id, likes: liked[id] }; });
    },

    getRecetasMasDisgustadas: function(limit) {
      var disliked = this.data.dislikedRecipes;
      return Object.keys(disliked)
        .filter(function(id) { return disliked[id] >= 1; })
        .sort(function(a, b) { return disliked[b] - disliked[a]; })
        .slice(0, limit)
        .map(function(id) { return { id: id, dislikes: disliked[id] }; });
    },

    // ==================== HISTORIAL ====================

    addToHistory: function(receta) {
      var history = this.getHistory();
      history.unshift({
        id: receta.id || receta.title || 'unknown',
        title: receta.title || receta.nombre || 'Receta',
        timestamp: new Date().toISOString(),
        ingredients: (receta.ingredients || receta.ingredientes || []).map(function(i) { return i.name || i.nombre || i; })
      });
      if (history.length > 50) history = history.slice(0, 50);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    },

    getHistory: function() {
      var stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch(e) {}
      }
      return [];
    },

    getRecentlyViewed: function(limit) {
      return this.getHistory().slice(0, limit || 10);
    },

    // ==================== LIMPIEZA ====================

    clearAllData: function() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(HISTORY_KEY);
      this.data = this.getDefaultData();
      console.log('[UserLearning] Datos limpiados');
    },

    exportData: function() {
      return {
        learning: this.data,
        profile: this.getPerfilUsuario(),
        history: this.getHistory()
      };
    },

    importData: function(data) {
      if (data.learning) {
        this.data = data.learning;
        this.saveData();
      }
      console.log('[UserLearning] Datos importados');
    }
  };

  if (typeof window !== 'undefined') {
    window.UserLearning = UserLearningEngine.init();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserLearningEngine;
  }
})();
