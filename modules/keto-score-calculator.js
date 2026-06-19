// ==================== ADVANCED KETO SCORE CALCULATOR - KetoCore ====================
// Sistema de puntuación keto avanzado con múltiples criterios

(function() {
  'use strict';

  var KetoScoreCalculator = {
    
    // Configuración de umbrales
    THRESHOLDS: {
      NET_CARBS: {
        EXCELLENT: 5,
        GOOD: 10,
        MODERATE: 15,
        HIGH: 20,
        CRITICAL: 30
      },
      PROTEIN_RATIO: {
        MIN: 0.15,
        IDEAL: 0.25,
        MAX: 0.40
      },
      FAT_RATIO: {
        MIN: 0.60,
        IDEAL: 0.70,
        MAX: 0.80
      },
      FIBER: {
        MIN: 3,
        GOOD: 5
      }
    },

    // Calcular score para una receta completa
    calculateRecipeScore: function(receta) {
      var ingredients = receta.ingredients || receta.ingredientes || [];
      var macros = this.sumMacros(ingredients);
      
      var result = {
        totalScore: 0,
        breakdown: {},
        verdict: '',
        nivel: '',
        esAptoKeto: false
      };

      // 1. Score de Carbohidratos Netos (0-40 puntos)
      result.breakdown.carbsScore = this.scoreNetCarbs(macros.netCarbs);
      
      // 2. Score de Ratio Grasa/Proteína (0-25 puntos)
      result.breakdown.ratioScore = this.scoreMacroRatio(macros);
      
      // 3. Score de Fibra (0-10 puntos)
      result.breakdown.fiberScore = this.scoreFiber(macros.fiber);
      
      // 4. Score de Densidad Nutricional (0-15 puntos)
      result.breakdown.densityScore = this.scoreNutrientDensity(macros);
      
      // 5. Score de Calidad de Ingredientes (0-10 puntos)
      result.breakdown.ingredientScore = this.scoreIngredientQuality(ingredients);
      
      // Score total
      result.totalScore = 
        result.breakdown.carbsScore +
        result.breakdown.ratioScore +
        result.breakdown.fiberScore +
        result.breakdown.densityScore +
        result.breakdown.ingredientScore;

      // Ajustar por preferencias del usuario
      if (window.UserLearning) {
        var ajuste = this.adjustForUserPreferences(result.totalScore, ingredients);
        result.totalScore = ajuste.score;
        result.userAdjustment = ajuste.reason;
      }

      // Veredicto
      result = this.generateVerdict(result, macros);
      result.macros = macros;
      result.ingredientCount = ingredients.length;

      return result;
    },

    // Calcular macros totales de una lista de ingredientes
    sumMacros: function(ingredients) {
      var totals = {
        calories: 0,
        protein: 0,
        fat: 0,
        totalCarbs: 0,
        fiber: 0,
        netCarbs: 0
      };

      ingredients.forEach(function(ing) {
        var cals = parseFloat(ing.calorias || ing.calories || 0);
        var prot = parseFloat(ing.proteinas || ing.protein || 0);
        var fat = parseFloat(ing.grasas || ing.fat || 0);
        var carbs = parseFloat(ing.carbohidratos || ing.carbs || 0);
        var fib = parseFloat(ing.fibra || ing.fiber || 0);

        if (ing.cantidad && ing.cantidad !== 100 && ing.unidad !== 'g') {
          var ratio = (ing.cantidad || 100) / 100;
          cals *= ratio;
          prot *= ratio;
          fat *= ratio;
          carbs *= ratio;
          fib *= ratio;
        }

        totals.calories += cals;
        totals.protein += prot;
        totals.fat += fat;
        totals.totalCarbs += carbs;
        totals.fiber += fib;
      });

      totals.netCarbs = Math.max(0, totals.totalCarbs - totals.fiber);
      return totals;
    },

    // Score de Carbohidratos Netos (máx 40 puntos)
    scoreNetCarbs: function(netCarbs) {
      var score = 0;
      var t = this.THRESHOLDS.NET_CARBS;

      if (netCarbs <= t.EXCELLENT) {
        score = 40;
      } else if (netCarbs <= t.GOOD) {
        score = 35 - ((netCarbs - t.EXCELLENT) * 2);
      } else if (netCarbs <= t.MODERATE) {
        score = 25 - ((netCarbs - t.GOOD) * 2);
      } else if (netCarbs <= t.HIGH) {
        score = 15 - ((netCarbs - t.MODERATE) * 1.5);
      } else if (netCarbs <= t.CRITICAL) {
        score = 5 - ((netCarbs - t.HIGH) * 0.5);
      } else {
        score = 0;
      }

      return Math.max(0, Math.min(40, Math.round(score)));
    },

    // Score de Ratio Macronutrientes (máx 25 puntos)
    scoreMacroRatio: function(macros) {
      var score = 0;
      var total = macros.protein + macros.fat;

      if (total === 0) return 0;

      var proteinRatio = macros.protein / total;
      var fatRatio = macros.fat / total;
      var t = this.THRESHOLDS;

      // Score de ratio de proteína
      if (proteinRatio >= t.PROTEIN_RATIO.MIN && proteinRatio <= t.PROTEIN_RATIO.MAX) {
        var proteinScore = 12;
        if (proteinRatio >= t.PROTEIN_RATIO.IDEAL) {
          proteinScore = 15 - Math.abs(proteinRatio - t.PROTEIN_RATIO.IDEAL) * 20;
        }
      } else {
        proteinScore = Math.max(0, 12 - Math.abs(proteinRatio - t.PROTEIN_RATIO.IDEAL) * 30);
      }

      // Score de ratio de grasa
      if (fatRatio >= t.FAT_RATIO.MIN && fatRatio <= t.FAT_RATIO.MAX) {
        var fatScore = 10;
        if (fatRatio >= t.FAT_RATIO.IDEAL) {
          fatScore = 10 - Math.abs(fatRatio - t.FAT_RATIO.IDEAL) * 10;
        }
      } else {
        fatScore = Math.max(0, 8 - Math.abs(fatRatio - t.FAT_RATIO.IDEAL) * 20);
      }

      score = proteinScore + fatScore;
      return Math.max(0, Math.min(25, Math.round(score)));
    },

    // Score de Fibra (máx 10 puntos)
    scoreFiber: function(fiber) {
      var t = this.THRESHOLDS.FIBER;
      var score = 0;

      if (fiber >= t.GOOD) {
        score = 10;
      } else if (fiber >= t.MIN) {
        score = 5 + ((fiber - t.MIN) / (t.GOOD - t.MIN)) * 5;
      } else {
        score = Math.max(0, fiber / t.MIN * 3);
      }

      return Math.round(score);
    },

    // Score de Densidad Nutricional (máx 15 puntos)
    scoreNutrientDensity: function(macros) {
      var score = 0;

      // Puntos por proteína (alta = mejor)
      var proteinPer100cal = macros.calories > 0 ? (macros.protein / macros.calories) * 100 : 0;
      if (proteinPer100cal >= 10) score += 5;
      else if (proteinPer100cal >= 5) score += 3;
      else if (proteinPer100cal >= 2) score += 1;

      // Puntos por grasa (alta = mejor para keto)
      var fatPer100cal = macros.calories > 0 ? (macros.fat / macros.calories) * 100 : 0;
      if (fatPer100cal >= 70) score += 5;
      else if (fatPer100cal >= 60) score += 3;
      else if (fatPer100cal >= 50) score += 1;

      // Puntos por baja azúcar
      var sugarRatio = 0; // Asumimos 0 si no hay datos
      if (sugarRatio < 2) score += 5;
      else if (sugarRatio < 5) score += 3;
      else if (sugarRatio < 10) score += 1;

      return Math.min(15, score);
    },

    // Score de Calidad de Ingredientes (máx 10 puntos)
    scoreIngredientQuality: function(ingredients) {
      var score = 0;
      var goodCount = 0;
      var total = ingredients.length;

      if (total === 0) return 5;

      ingredients.forEach(function(ing) {
        var nombre = (ing.nombre || ing.name || '').toLowerCase();
        
        // Ingredientes considerados "buenos" para keto
        var goodKeywords = ['pollo', 'carne', 'pescado', 'huevo', 'aguacate', 'queso', 
                           'brócoli', 'coliflor', 'espinaca', 'aceite', 'mantequilla',
                           'almendra', 'nuez', 'semilla'];
        
        // Ingredientes cuestionables
        var questionableKeywords = ['crema', 'tocino', 'salchicha'];
        
        // Ingredientes malos
        var badKeywords = ['arroz', 'pasta', 'pan', 'azúcar', 'harina', 'frijol', 
                          'papa', 'maíz', 'avena', 'miel'];

        var isGood = goodKeywords.some(function(k) { return nombre.indexOf(k) >= 0; });
        var isQuestionable = questionableKeywords.some(function(k) { return nombre.indexOf(k) >= 0; });
        var isBad = badKeywords.some(function(k) { return nombre.indexOf(k) >= 0; });

        if (isGood) goodCount++;
        else if (isQuestionable) goodCount += 0.5;
        else if (isBad) goodCount -= 1;
      });

      score = (goodCount / total) * 10;
      return Math.max(0, Math.min(10, Math.round(score)));
    },

    // Ajuste por preferencias del usuario
    adjustForUserPreferences: function(baseScore, ingredients) {
      var adjustment = 0;
      var reasons = [];

      if (!window.UserLearning) {
        return { score: baseScore, reason: '' };
      }

      var ul = window.UserLearning;
      var ingNames = ingredients.map(function(i) { return (i.nombre || i.name || '').toLowerCase(); });

      // Recompensar si contiene ingredientes liked
      var liked = ul.getTopLikedIngredients(5);
      liked.forEach(function(item) {
        var likeName = item.nombre.toLowerCase();
        ingNames.forEach(function(name) {
          if (name.indexOf(likeName) >= 0) {
            adjustment += 3;
            reasons.push('+' + likeName);
          }
        });
      });

      // Penalizar si contiene ingredientes evitados
      var evitados = ul.getIngredientsToAvoid();
      evitados.forEach(function(evitado) {
        var evitName = evitado.toLowerCase();
        ingNames.forEach(function(name) {
          if (name.indexOf(evitName) >= 0) {
            adjustment -= 10;
            reasons.push('-' + evitName);
          }
        });
      });

      return {
        score: Math.max(0, Math.min(100, baseScore + adjustment)),
        reason: reasons.length > 0 ? reasons.join(', ') : ''
      };
    },

    // Generar veredicto final
    generateVerdict: function(result, macros) {
      var score = result.totalScore;
      var t = this.THRESHOLDS.NET_CARBS;

      if (score >= 85 && macros.netCarbs <= t.EXCELLENT) {
        result.verdict = 'EXCELENTE - Receta keto perfecta';
        result.nivel = 'excelente';
        result.esAptoKeto = true;
      } else if (score >= 70 && macros.netCarbs <= t.GOOD) {
        result.verdict = 'BUENO - Adecuado para keto';
        result.nivel = 'bueno';
        result.esAptoKeto = true;
      } else if (score >= 50 && macros.netCarbs <= t.MODERATE) {
        result.verdict = 'MODERADO - Usar con precaución';
        result.nivel = 'moderado';
        result.esAptoKeto = false;
      } else if (score >= 30) {
        result.verdict = 'BAJO - No recomendado para keto';
        result.nivel = 'bajo';
        result.esAptoKeto = false;
      } else {
        result.verdict = 'INADECUADO - Demasiados carbs';
        result.nivel = 'inadecuado';
        result.esAptoKeto = false;
      }

      return result;
    },

    // Comparar dos recetas
    compareRecipes: function(receta1, receta2) {
      var score1 = this.calculateRecipeScore(receta1);
      var score2 = this.calculateRecipeScore(receta2);

      return {
        winner: score1.totalScore >= score2.totalScore ? receta1 : receta2,
        score1: score1.totalScore,
        score2: score2.totalScore,
        difference: Math.abs(score1.totalScore - score2.totalScore)
      };
    },

    // Obtener breakdown como texto
    getBreakdownText: function(result) {
      var lines = [];
      lines.push('=== KETO SCORE BREAKDOWN ===');
      lines.push('Net Carbs (' + (result.macros ? result.macros.netCarbs.toFixed(1) : '?') + 'g): ' + result.breakdown.carbsScore + '/40');
      lines.push('Macro Ratio: ' + result.breakdown.ratioScore + '/25');
      lines.push('Fiber: ' + result.breakdown.fiberScore + '/10');
      lines.push('Nutrient Density: ' + result.breakdown.densityScore + '/15');
      lines.push('Ingredient Quality: ' + result.breakdown.ingredientScore + '/10');
      lines.push('-------------------------');
      lines.push('TOTAL: ' + result.totalScore + '/100');
      if (result.userAdjustment) {
        lines.push('User Pref: ' + result.userAdjustment);
      }
      lines.push('VERDICT: ' + result.verdict);
      return lines.join('\n');
    }
  };

  if (typeof window !== 'undefined') {
    window.KetoScoreCalculator = KetoScoreCalculator;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = KetoScoreCalculator;
  }
})();
