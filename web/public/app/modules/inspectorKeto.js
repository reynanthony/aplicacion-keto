/*
 * Inspector Keto - Motor de analisis de ingredientes y recetas.
 *
 * Este modulo funciona en navegador (window.inspectorKeto)
 * y tambien en Node para pruebas (module.exports).
 */
(function (globalScope) {
  'use strict';

  var STORAGE_KEYS = {
    rules: 'ketoInspectorRules',
    historyPrefix: 'ketoInspectorHistory_'
  };

  var DEFAULT_RULES = {
    limiteSeguroCarbsPorPorcion: 10,
    limiteModeradoCarbsPorPorcion: 6,
    limiteCriticoCarbsPorPorcion: 10,
    minPuntajeAutoPlan: 70,
    gramosPorDefectoIngrediente: 30,
    historialMaximo: 200
  };

  var UNIT_TO_GRAMS = {
    g: 1,
    gr: 1,
    gramo: 1,
    gramos: 1,
    kg: 1000,
    kilo: 1000,
    kilos: 1000,
    ml: 1,
    l: 1000,
    litro: 1000,
    litros: 1000,
    taza: 240,
    tazas: 240,
    cda: 15,
    cdas: 15,
    cucharada: 15,
    cucharadas: 15,
    cdita: 5,
    cditas: 5,
    cucharadita: 5,
    cucharaditas: 5,
    unidad: 50,
    unidades: 50,
    pieza: 50,
    piezas: 50,
    diente: 4,
    dientes: 4,
    lata: 140,
    latas: 140
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function round1(value) {
    return Math.round((value || 0) * 10) / 10;
  }

  function normalizeText(text) {
    return String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function readJSON(key, fallback) {
    try {
      if (typeof localStorage === 'undefined') return fallback;
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Silencioso para no romper UX en dispositivos sin espacio.
    }
  }

  function getRules() {
    var custom = readJSON(STORAGE_KEYS.rules, {});
    return Object.assign({}, DEFAULT_RULES, custom || {});
  }

  function setRules(partialRules) {
    var next = Object.assign({}, getRules(), partialRules || {});
    writeJSON(STORAGE_KEYS.rules, next);
    return next;
  }

  function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    return parseFloat(String(value).replace(',', '.')) || 0;
  }

  function parseAmountFromText(text, fallbackGrams) {
    var safeText = String(text || '');
    var normalized = normalizeText(safeText);

    var rangeMatch = normalized.match(/(\d+(?:[\.,]\d+)?)\s*-\s*(\d+(?:[\.,]\d+)?)/);
    var amountFromRange = 0;
    if (rangeMatch) {
      amountFromRange = (parseNumber(rangeMatch[1]) + parseNumber(rangeMatch[2])) / 2;
    }

    var amountMatch = normalized.match(/(\d+(?:[\.,]\d+)?)\s*(kg|kilos|kilo|g|gr|gramo|gramos|ml|l|litro|litros|taza|tazas|cda|cdas|cucharada|cucharadas|cdita|cditas|cucharadita|cucharaditas|unidad|unidades|pieza|piezas|diente|dientes|lata|latas)/);
    var amount = amountMatch ? parseNumber(amountMatch[1]) : amountFromRange;
    var unit = amountMatch ? amountMatch[2] : 'g';

    if (!amount || amount <= 0) {
      return {
        gramos: fallbackGrams,
        cantidadTexto: safeText || (fallbackGrams + 'g')
      };
    }

    var gramsPerUnit = UNIT_TO_GRAMS[unit] || 1;
    var grams = amount * gramsPerUnit;

    return {
      gramos: grams,
      cantidadTexto: amount + unit
    };
  }

  function extractIngredientName(rawText) {
    var normalized = normalizeText(rawText);
    var stripped = normalized
      .replace(/\b\d+(?:[\.,]\d+)?(?:kg|kilos|kilo|g|gr|gramo|gramos|ml|l|litro|litros|taza|tazas|cda|cdas|cdita|cditas|unidad|unidades|pieza|piezas|diente|dientes|lata|latas)\b/g, ' ')
      .replace(/\b\d+(?:[\.,]\d+)?\b/g, ' ')
      .replace(/\b(kg|kilos|kilo|g|gr|gramo|gramos|ml|l|litro|litros|taza|tazas|cda|cdas|cucharada|cucharadas|cdita|cditas|cucharadita|cucharaditas|unidad|unidades|pieza|piezas|diente|dientes|lata|latas|de|y|al)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return stripped || normalized || String(rawText || '').trim();
  }

  function getEmbeddedIngredientCatalog() {
    if (typeof globalScope.KETO_INSPECTOR_INGREDIENTES !== 'undefined' && Array.isArray(globalScope.KETO_INSPECTOR_INGREDIENTES)) {
      return globalScope.KETO_INSPECTOR_INGREDIENTES;
    }
    return [];
  }

  function getLegacyFoodsAsSafe() {
    var safeIngredients = [];
    var foods = readJSON('ketoFoods', []);

    if (Array.isArray(foods)) {
      foods.forEach(function (food) {
        if (!food || !food.name) return;
        var carbs = parseNumber(food.carbs);
        var fiber = parseNumber(food.fiber);

        safeIngredients.push({
          nombre: food.name,
          categoria: food.category || 'legacy',
          carbohidratos_netos_100g: round1(Math.max(0, carbs - fiber)),
          nivel_riesgo: 'seguro',
          limite_gramos_porcion: 120,
          alternativas: [],
          razon: 'Alimento existente en la base KetoCore marcado como seguro por defecto.',
          tags: ['legacy_ketocore', 'seguro_default']
        });
      });
    }

    return safeIngredients;
  }

  function mergeIngredientCatalog(extraIngredients) {
    var merged = [];
    var seen = {};

    function append(list) {
      if (!Array.isArray(list)) return;
      list.forEach(function (item) {
        if (!item || !item.nombre) return;
        var key = normalizeText(item.nombre);
        if (!key || seen[key]) return;
        seen[key] = true;
        merged.push(item);
      });
    }

    append(getEmbeddedIngredientCatalog());
    append(extraIngredients);
    append(getLegacyFoodsAsSafe());

    return merged;
  }

  function buildIndex(catalog) {
    var byName = {};
    var byCompact = {};
    var normalizedKeys = [];

    catalog.forEach(function (item) {
      var key = normalizeText(item.nombre);
      if (!key) return;
      byName[key] = item;
      var compact = key.replace(/\b(de|con|sin|para|a|al|la|el|los|las)\b/g, '').replace(/\s+/g, ' ').trim();
      if (compact && !byCompact[compact]) {
        byCompact[compact] = item;
      }
      normalizedKeys.push(key);
    });

    return { byName: byName, byCompact: byCompact, keys: normalizedKeys };
  }

  function findIngredientInfo(name, index) {
    var normalized = normalizeText(name);
    if (!normalized) return null;

    if (index.byName[normalized]) {
      return index.byName[normalized];
    }

    var compact = normalized.replace(/\b(de|con|sin|para|a|al|la|el|los|las)\b/g, '').replace(/\s+/g, ' ').trim();
    if (compact && index.byCompact[compact]) {
      return index.byCompact[compact];
    }

    var bestMatch = null;
    var bestScore = 0;

    index.keys.forEach(function (candidateKey) {
      var candidateCompact = candidateKey.replace(/\b(de|con|sin|para|a|al|la|el|los|las)\b/g, '').replace(/\s+/g, ' ').trim();
      if (
        normalized.indexOf(candidateKey) >= 0 ||
        candidateKey.indexOf(normalized) >= 0 ||
        (compact && candidateCompact && (compact.indexOf(candidateCompact) >= 0 || candidateCompact.indexOf(compact) >= 0))
      ) {
        var score = Math.min(candidateKey.length, normalized.length);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = index.byName[candidateKey];
        }
      }
    });

    return bestMatch;
  }

  function getUserIdFallback() {
    return (typeof localStorage !== 'undefined' && (localStorage.getItem('KetoCore_user_id') || 'anon')) || 'anon';
  }

  function historyKey(userId) {
    return STORAGE_KEYS.historyPrefix + (userId || getUserIdFallback());
  }

  function saveHistory(report, userId) {
    var key = historyKey(userId);
    var rules = getRules();
    var history = readJSON(key, []);
    history.unshift({
      fecha: new Date().toISOString(),
      receta_id: report.receta_id,
      nombre_original: report.nombre_original,
      puntaje_keto: report.puntaje_keto,
      nivel_seguridad: report.nivel_seguridad,
      total_carbohidratos_netos_receta: report.total_carbohidratos_netos_receta
    });
    writeJSON(key, history.slice(0, rules.historialMaximo));
  }

  function getHistory(userId) {
    return readJSON(historyKey(userId), []);
  }

  function clearHistory(userId) {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(historyKey(userId));
  }

  function inferRiskLevel(item, carbsPerServing, rules) {
    if (item && item.nivel_riesgo) return item.nivel_riesgo;

    var carbs100 = parseNumber(item && item.carbohidratos_netos_100g);
    if (carbsPerServing >= rules.limiteCriticoCarbsPorPorcion || carbs100 >= 20) return 'critico';
    if (carbsPerServing >= rules.limiteModeradoCarbsPorPorcion || carbs100 >= 6) return 'moderado';
    return 'seguro';
  }

  function buildSuggestion(info, grams, riskLevel, rules) {
    var alternatives = (info && Array.isArray(info.alternativas)) ? info.alternativas : [];

    if (riskLevel === 'seguro') {
      return 'Apto para keto en porcion sugerida.';
    }

    if (!alternatives.length) {
      if (riskLevel === 'critico') {
        return 'Evitar en keto o reemplazar por version baja en carbohidratos.';
      }
      return 'Consumir en porcion pequena y monitorear carbohidratos netos.';
    }

    var a1 = alternatives[0];
    var factor1 = parseNumber(a1.factor_conversion || 1);
    var g1 = round1(grams * factor1);

    if (riskLevel === 'critico' && alternatives[1]) {
      var a2 = alternatives[1];
      var factor2 = parseNumber(a2.factor_conversion || 1);
      var gAlt1 = round1((grams * factor1) * 0.75);
      var gAlt2 = round1((grams * factor2) * 0.25);
      return 'Reemplazar por ' + gAlt1 + 'g de ' + a1.nombre + ' + ' + gAlt2 + 'g de ' + a2.nombre + '.';
    }

    if (riskLevel === 'moderado') {
      var max = parseNumber(info.limite_gramos_porcion || rules.gramosPorDefectoIngrediente);
      return 'Reducir a ' + max + 'g o reemplazar por ' + g1 + 'g de ' + a1.nombre + '.';
    }

    return 'Sustituir por ' + g1 + 'g de ' + a1.nombre + '.';
  }

  function scoreRecipe(totalCarbs, carbsPerServing, counts) {
    var carbPenalty = clamp(carbsPerServing * 4.5, 0, 80);
    var riskPenalty = (counts.critico * 20) + (counts.moderado * 8);
    var bonus = counts.seguro * 1.2;
    return clamp(Math.round(100 - carbPenalty - riskPenalty + bonus), 0, 100);
  }

  function securityLevel(score, carbsPerServing, criticalCount, rules) {
    if (score >= 85 && carbsPerServing <= rules.limiteSeguroCarbsPorPorcion && criticalCount === 0) {
      return 'seguro';
    }
    if (score >= rules.minPuntajeAutoPlan && criticalCount <= 1) {
      return 'moderado';
    }
    return 'riesgo_alto';
  }

  function buildPortionSuggestion(servings, carbsPerServing, rules) {
    if (carbsPerServing <= rules.limiteSeguroCarbsPorPorcion) {
      return '1/' + servings + ' de la receta (' + round1(carbsPerServing) + 'g netos, dentro de limite keto).';
    }
    return '1/' + servings + ' de la receta (' + round1(carbsPerServing) + 'g netos, excede limite diario).';
  }

  function normalizeRecipeIngredient(item, fallbackGrams) {
    if (typeof item === 'string') {
      var parsed = parseAmountFromText(item, fallbackGrams);
      return {
        nombre: extractIngredientName(item),
        cantidadTexto: parsed.cantidadTexto,
        gramos: parsed.gramos,
        raw: item
      };
    }

    var name = item.nombre || item.name || item.ingrediente || '';
    var grams = parseNumber(item.gramos || item.quantity || item.cantidad);
    var unit = normalizeText(item.unidad || item.unit || 'g');

    if (!grams || grams <= 0) {
      var fromText = parseAmountFromText(item.cantidad || item.quantityText || '', fallbackGrams);
      grams = fromText.gramos;
      return {
        nombre: extractIngredientName(name || fromText.cantidadTexto),
        cantidadTexto: fromText.cantidadTexto,
        gramos: grams,
        raw: item
      };
    }

    var gramsPerUnit = UNIT_TO_GRAMS[unit] || 1;
    var totalGrams = grams * gramsPerUnit;

    return {
      nombre: extractIngredientName(name),
      cantidadTexto: grams + (item.unidad || item.unit || 'g'),
      gramos: totalGrams,
      raw: item
    };
  }

  function estimateOptimizedRecipe(recipeName, servings, analyzedItems, scoreFn, rules) {
    var optimizedIngredients = [];
    var replaced = [];
    var optimizedTotalCarbs = 0;

    analyzedItems.forEach(function (item) {
      var info = item._info;
      var carbs100 = parseNumber(info && info.carbohidratos_netos_100g);
      var alternatives = (info && Array.isArray(info.alternativas)) ? info.alternativas : [];

      if ((item.nivel === 'critico' || item.nivel === 'moderado') && alternatives.length > 0) {
        var alt1 = alternatives[0];
        var altFactor = parseNumber(alt1.factor_conversion || 1);
        var altGrams = round1(item._gramos * altFactor);
        var altCarbs = round1((parseNumber(alt1.carb_netos_100g) * altGrams) / 100);

        optimizedIngredients.push(altGrams + 'g ' + alt1.nombre);
        optimizedTotalCarbs += altCarbs;

        replaced.push({
          original: item.nombre,
          reemplazo: alt1.nombre,
          gramos_originales: round1(item._gramos),
          gramos_reemplazo: altGrams,
          carbos_originales: round1((carbs100 * item._gramos) / 100),
          carbos_reemplazo: altCarbs
        });
      } else {
        optimizedIngredients.push((item.cantidad || '') + ' ' + item.nombre);
        optimizedTotalCarbs += item.carb_netos_estimados;
      }
    });

    var carbsPerServing = servings > 0 ? optimizedTotalCarbs / servings : optimizedTotalCarbs;
    var counts = { critico: 0, moderado: 0, seguro: analyzedItems.length };
    var optimizedScore = scoreFn(optimizedTotalCarbs, carbsPerServing, counts);

    return {
      nombre: recipeName + ' (Version Keto Optimizada)',
      ingredientes: optimizedIngredients,
      ingredientes_reemplazados: replaced,
      total_carbohidratos_netos_estimado: round1(optimizedTotalCarbs),
      carbs_netos_por_porcion: round1(carbsPerServing),
      puntaje_keto_estimado: optimizedScore,
      nivel_seguridad_estimado: securityLevel(optimizedScore, carbsPerServing, 0, rules),
      instrucciones_rapidas: [
        'Aplica sustituciones 1:1 ajustadas por factor de conversion.',
        'Mantener porcion recomendada para no superar 10g netos por porcion.',
        'Priorizar salsas y condimentos sin azucar anadida.'
      ]
    };
  }

  function inspeccionarReceta(receta, extraIngredients, options) {
    var rules = Object.assign({}, getRules(), options || {});
    var recipe = receta || {};
    var ingredients = recipe.ingredientes || recipe.ingredients || [];
    var servings = parseInt(recipe.porciones || recipe.servings || 1, 10);
    if (!servings || servings <= 0) servings = 1;

    var catalog = mergeIngredientCatalog(extraIngredients);
    var index = buildIndex(catalog);

    var totalCarbs = 0;
    var analyzed = [];
    var counts = { critico: 0, moderado: 0, seguro: 0 };

    ingredients.forEach(function (ing) {
      var normalized = normalizeRecipeIngredient(ing, rules.gramosPorDefectoIngrediente);
      if (!normalized.nombre) return;

      var info = findIngredientInfo(normalized.nombre, index);
      var carbs100 = parseNumber(info && info.carbohidratos_netos_100g);
      var estimatedCarbs = round1((carbs100 * normalized.gramos) / 100);
      var carbsPerServing = servings > 0 ? (estimatedCarbs / servings) : estimatedCarbs;
      var risk = inferRiskLevel(info, carbsPerServing, rules);

      counts[risk] = (counts[risk] || 0) + 1;
      totalCarbs += estimatedCarbs;

      analyzed.push({
        nombre: normalized.nombre,
        cantidad: normalized.cantidadTexto,
        nivel: risk,
        carb_netos_estimados: estimatedCarbs,
        sugerencia: buildSuggestion(info || {}, normalized.gramos, risk, rules),
        _gramos: normalized.gramos,
        _info: info || {
          nombre: normalized.nombre,
          categoria: 'desconocido',
          carbohidratos_netos_100g: carbs100,
          alternativas: []
        }
      });
    });

    var carbsPerServing = servings > 0 ? totalCarbs / servings : totalCarbs;
    var score = scoreRecipe(totalCarbs, carbsPerServing, counts);
    var level = securityLevel(score, carbsPerServing, counts.critico || 0, rules);

    var report = {
      receta_id: recipe.id || recipe.receta_id || 'sin_id',
      nombre_original: recipe.nombre || recipe.title || recipe.titulo || 'Receta sin nombre',
      puntaje_keto: score,
      nivel_seguridad: level,
      ingredientes_analizados: analyzed.map(function (item) {
        return {
          nombre: item.nombre,
          cantidad: item.cantidad,
          nivel: item.nivel,
          carb_netos_estimados: item.carb_netos_estimados,
          sugerencia: item.sugerencia
        };
      }),
      total_carbohidratos_netos_receta: round1(totalCarbs),
      carbohidratos_netos_por_porcion: round1(carbsPerServing),
      porcion_sugerida: buildPortionSuggestion(servings, carbsPerServing, rules),
      receta_optimizada: estimateOptimizedRecipe(
        recipe.nombre || recipe.title || recipe.titulo || 'Receta',
        servings,
        analyzed,
        scoreRecipe,
        rules
      )
    };

    saveHistory(report, options && options.userId);
    return report;
  }

  function resolvePantryItems(despensa, foodsCatalog) {
    var foodMap = {};
    var allFoods = Array.isArray(foodsCatalog) ? foodsCatalog : readJSON('ketoFoods', []);

    if (Array.isArray(allFoods)) {
      allFoods.forEach(function (food) {
        if (food && food.id) {
          foodMap[food.id] = food;
        }
      });
    }

    var output = [];

    if (Array.isArray(despensa)) {
      despensa.forEach(function (item) {
        if (!item) return;
        output.push({
          id: item.id || item.foodId || item.nombre,
          nombre: item.nombre || item.name || item.foodName || '',
          stock_gramos: parseNumber(item.stock || item.gramos || item.cantidad || 0)
        });
      });
      return output;
    }

    var pantry = despensa || readJSON('despensa', {});
    Object.keys(pantry).forEach(function (key) {
      var stock = parseNumber(pantry[key] && pantry[key].stock);
      if (stock <= 0) return;
      var food = foodMap[key] || {};
      output.push({
        id: key,
        nombre: food.name || food.nombre || key,
        stock_gramos: stock
      });
    });

    return output;
  }

  function inspeccionarDespensa(despensa, foodsCatalog, options) {
    var rules = Object.assign({}, getRules(), options || {});
    var items = resolvePantryItems(despensa, foodsCatalog);
    var catalog = mergeIngredientCatalog(options && options.extraIngredients);
    var index = buildIndex(catalog);

    var analyzed = [];
    var counts = { critico: 0, moderado: 0, seguro: 0 };
    var comprasPrioritarias = [];

    items.forEach(function (item) {
      var info = findIngredientInfo(item.nombre, index);
      var carbs100 = parseNumber(info && info.carbohidratos_netos_100g);
      var carbsPorPorcion = (carbs100 * Math.min(item.stock_gramos, 100)) / 100;
      var nivel = inferRiskLevel(info, carbsPorPorcion, rules);
      counts[nivel] = (counts[nivel] || 0) + 1;

      analyzed.push({
        id: item.id,
        nombre: item.nombre,
        stock_gramos: round1(item.stock_gramos),
        nivel_riesgo: nivel,
        carbohidratos_netos_100g: round1(carbs100),
        recomendacion: buildSuggestion(info || {}, 100, nivel, rules)
      });

      if (nivel === 'critico' && info && Array.isArray(info.alternativas)) {
        info.alternativas.forEach(function (alt) {
          comprasPrioritarias.push({
            nombre: alt.nombre,
            carb_netos_100g: alt.carb_netos_100g,
            motivo: 'Sustituto de ' + item.nombre
          });
        });
      }
    });

    var dedupPurchases = [];
    var seen = {};
    comprasPrioritarias.forEach(function (item) {
      var key = normalizeText(item.nombre);
      if (seen[key]) return;
      seen[key] = true;
      dedupPurchases.push(item);
    });

    var total = analyzed.length;
    var soloCriticos = total > 0 && counts.critico === total;

    return {
      resumen: {
        total_items: total,
        criticos: counts.critico || 0,
        moderados: counts.moderado || 0,
        seguros: counts.seguro || 0
      },
      solo_criticos: soloCriticos,
      items: analyzed,
      compras_prioritarias: dedupPurchases.slice(0, 12)
    };
  }

  function inspeccionarProductoTexto(texto, options) {
    var catalog = mergeIngredientCatalog(options && options.extraIngredients);
    var normalized = normalizeText(texto);

    if (!normalized) {
      return {
        texto_original: texto,
        coincidencias: [],
        nivel_riesgo: 'seguro',
        resumen: 'No se detectaron ingredientes para analizar.'
      };
    }

    var matches = [];

    catalog.forEach(function (item) {
      var key = normalizeText(item.nombre);
      if (key && normalized.indexOf(key) >= 0) {
        matches.push(item);
      }
    });

    matches.sort(function (a, b) {
      var order = { critico: 3, moderado: 2, seguro: 1 };
      return (order[b.nivel_riesgo] || 0) - (order[a.nivel_riesgo] || 0);
    });

    var highest = matches[0] || null;

    return {
      texto_original: texto,
      coincidencias: matches.slice(0, 8).map(function (item) {
        return {
          nombre: item.nombre,
          nivel_riesgo: item.nivel_riesgo,
          carbohidratos_netos_100g: item.carbohidratos_netos_100g,
          razon: item.razon,
          alternativas: item.alternativas || []
        };
      }),
      nivel_riesgo: highest ? highest.nivel_riesgo : 'seguro',
      resumen: highest
        ? 'Ingrediente dominante detectado: ' + highest.nombre + ' (' + highest.nivel_riesgo + ').'
        : 'No se detectaron ingredientes de riesgo conocidos en el texto.'
    };
  }

  var api = {
    getRules: getRules,
    setRules: setRules,
    getHistory: getHistory,
    clearHistory: clearHistory,
    inspeccionarReceta: inspeccionarReceta,
    inspeccionarDespensa: inspeccionarDespensa,
    inspeccionarProductoTexto: inspeccionarProductoTexto,
    _internal: {
      normalizeText: normalizeText,
      parseAmountFromText: parseAmountFromText
    }
  };

  globalScope.inspectorKeto = api;
  globalScope.inspeccionarReceta = function (receta, baseIngredientes, options) {
    return api.inspeccionarReceta(receta, baseIngredientes, options);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
