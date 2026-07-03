/**
 * ==========================================
 * KETO INSPECTOR - Motor de Análisis
 * Analiza recetas y detecta ingredientes
 * que ponen en riesgo la cetosis
 * ==========================================
 */

var KetoInspector = (function() {
  'use strict';

  var CONFIG = {
    LIMITE_CARB_NETOS_PORCION: 10,
    PUNTAJE_SEGURO: 70,
    RIESGO_CRITICO: 'critico',
    RIESGO_MODERADO: 'moderado',
    RIESGO_SEGURO: 'seguro'
  };

  var ingredientesDB = [];

  function init() {
    loadIngredientes();
    console.log('[KetoInspector] Inicializado con', ingredientesDB.length, 'ingredientes');
    return KetoInspector;
  }

  function loadIngredientes() {
    var stored = localStorage.getItem('ketoInspector_ingredientes');
    var storedVersion = localStorage.getItem('ketoInspector_version');
    var currentVersion = '2.1'; // Incrementar para forzar actualizacion
    
    if (stored && storedVersion === currentVersion) {
      try {
        ingredientesDB = JSON.parse(stored);
      } catch (e) {
        console.error('[KetoInspector] Error:', e);
        ingredientesDB = getDefaultIngredientes();
        saveIngredientes();
      }
    } else {
      console.log('[KetoInspector] Actualizando base de datos a version', currentVersion);
      ingredientesDB = getDefaultIngredientes();
      localStorage.setItem('ketoInspector_version', currentVersion);
      saveIngredientes();
    }
  }

  function saveIngredientes() {
    localStorage.setItem('ketoInspector_ingredientes', JSON.stringify(ingredientesDB));
  }

  function getDefaultIngredientes() {
    return [
      // PROTEÍNAS
      { nombre: 'huevos', nombre_normalizado: 'huevos', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs, alto proteína' },
      { nombre: 'pollo', nombre_normalizado: 'pollo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'pechuga de pollo', nombre_normalizado: 'pechuga_pollo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'carne molida', nombre_normalizado: 'carne_molida', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'bistec', nombre_normalizado: 'bistec', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'salmon', nombre_normalizado: 'salmon', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs, rico en omega-3' },
      { nombre: 'atun', nombre_normalizado: 'atun', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'merluza', nombre_normalizado: 'merluza', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'costillas de cerdo', nombre_normalizado: 'costillas_cerdo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'cerdo', nombre_normalizado: 'cerdo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'cordero', nombre_normalizado: 'cordero', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs, alta calidad proteica' },
      { nombre: 'carnero', nombre_normalizado: 'carnero', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'ternera', nombre_normalizado: 'ternera', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'res', nombre_normalizado: 'res', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'carne molida de res', nombre_normalizado: 'carne_molida_res', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'pavo', nombre_normalizado: 'pavo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs, bajo en grasa' },
      { nombre: 'codorniz', nombre_normalizado: 'codorniz', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 400, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'conejo', nombre_normalizado: 'conejo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 400, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'liebre', nombre_normalizado: 'liebre', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 400, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'higado', nombre_normalizado: 'higado', categoria: 'proteinas', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb, rico en nutrientes' },
      { nombre: 'higado de pollo', nombre_normalizado: 'higado_pollo', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'mollejas', nombre_normalizado: 'mollejas', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'chorizo', nombre_normalizado: 'chorizo', categoria: 'proteinas', carb_netos_100g: 2, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'salchicha', nombre_normalizado: 'salchicha', categoria: 'proteinas', carb_netos_100g: 2, nivel: 'moderado', limite: 100, alternativas: [], razon: 'Bajo carb, revisar ingredientes' },
      { nombre: 'jamon', nombre_normalizado: 'jamon', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 150, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'tocino', nombre_normalizado: 'tocino', categoria: 'grasas', carb_netos_100g: 1, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb, alto en grasa' },
      { nombre: 'bacon', nombre_normalizado: 'bacon', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'mariscos', nombre_normalizado: 'mariscos', categoria: 'proteinas', carb_netos_100g: 3, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'sardina', nombre_normalizado: 'sardina', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs, rica en omega-3' },
      { nombre: 'sardinas', nombre_normalizado: 'sardinas', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs, rica en omega-3' },
      { nombre: 'caballa', nombre_normalizado: 'caballa', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs, rica en omega-3' },
      { nombre: 'macarela', nombre_normalizado: 'macarela', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs, rica en omega-3' },
      { nombre: 'bonito', nombre_normalizado: 'bonito', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'bacalao', nombre_normalizado: 'bacalao', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'rape', nombre_normalizado: 'rape', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'rodaballo', nombre_normalizado: 'rodaballo', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'trucha', nombre_normalizado: 'trucha', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'tilapia', nombre_normalizado: 'tilapia', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'gambas', nombre_normalizado: 'gambas', categoria: 'proteinas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'camaron', nombre_normalizado: 'camaron', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'pulpo', nombre_normalizado: 'pulpo', categoria: 'proteinas', carb_netos_100g: 2, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'calamar', nombre_normalizado: 'calamar', categoria: 'proteinas', carb_netos_100g: 2, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'mejillones', nombre_normalizado: 'mejillones', categoria: 'proteinas', carb_netos_100g: 3, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'almejas', nombre_normalizado: 'almejas', categoria: 'proteinas', carb_netos_100g: 3, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'langostinos', nombre_normalizado: 'langostinos', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'cangrejo', nombre_normalizado: 'cangrejo', categoria: 'proteinas', carb_netos_100g: 1, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      
      // GRASAS
      { nombre: 'mantequilla', nombre_normalizado: 'mantequilla', categoria: 'grasas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'aceite de oliva', nombre_normalizado: 'aceite_oliva', categoria: 'grasas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Grasa saludable' },
      { nombre: 'aceite de coco', nombre_normalizado: 'aceite_coco', categoria: 'grasas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Rico en MCTs' },
      { nombre: 'crema de coco', nombre_normalizado: 'crema_coco', categoria: 'grasas', carb_netos_100g: 5, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Baja en carbs' },
      { nombre: 'leche de coco', nombre_normalizado: 'leche_coco', categoria: 'grasas', carb_netos_100g: 3, nivel: 'seguro', limite: 150, alternativas: [], razon: 'Baja en carbs' },
      { nombre: 'mayonesa', nombre_normalizado: 'mayonesa', categoria: 'grasas', carb_netos_100g: 0, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'aceite', nombre_normalizado: 'aceite', categoria: 'grasas', carb_netos_100g: 0, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Cero carbs' },
      
      // QUESOS
      { nombre: 'queso cheddar', nombre_normalizado: 'queso_cheddar', categoria: 'lacteos', carb_netos_100g: 1, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'queso mozzarella', nombre_normalizado: 'queso_mozzarella', categoria: 'lacteos', carb_netos_100g: 2, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'queso feta', nombre_normalizado: 'queso_feta', categoria: 'lacteos', carb_netos_100g: 2, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'queso ricotta', nombre_normalizado: 'queso_ricotta', categoria: 'lacteos', carb_netos_100g: 3, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'queso parmesano', nombre_normalizado: 'queso_parmesano', categoria: 'lacteos', carb_netos_100g: 2, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'queso cottage', nombre_normalizado: 'queso_cottage', categoria: 'lacteos', carb_netos_100g: 3, nivel: 'seguro', limite: 150, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'queso crema', nombre_normalizado: 'queso_crema', categoria: 'lacteos', carb_netos_100g: 4, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      
      // VERDURAS KETO
      { nombre: 'espinacas', nombre_normalizado: 'espinacas', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Muy baja en carbs' },
      { nombre: 'coliflor', nombre_normalizado: 'coliflor', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Excelente sustituto de arroz' },
      { nombre: 'brocoli', nombre_normalizado: 'brocoli', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Baja en carbs' },
      { nombre: 'calabacin', nombre_normalizado: 'calabacin', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 400, alternativas: [], razon: 'Excelente sustituto de pasta' },
      { nombre: 'lechuga', nombre_normalizado: 'lechuga', categoria: 'verduras', carb_netos_100g: 1, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Casi cero carbs' },
      { nombre: 'esparragos', nombre_normalizado: 'esparragos', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'pimiento', nombre_normalizado: 'pimiento', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'champinones', nombre_normalizado: 'champinones', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajos en carbs' },
      { nombre: 'cebollas', nombre_normalizado: 'cebollas', categoria: 'verduras', carb_netos_100g: 7, nivel: 'moderado', limite: 50, alternativas: [], razon: 'Moderada, controlar porción' },
      { nombre: 'ajo', nombre_normalizado: 'ajo', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'tomate', nombre_normalizado: 'tomate', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'limon', nombre_normalizado: 'limon', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'nabo', nombre_normalizado: 'nabo', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'apio', nombre_normalizado: 'apio', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'perejil', nombre_normalizado: 'perejil', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'guisantes', nombre_normalizado: 'guisantes', categoria: 'verduras', carb_netos_100g: 8, nivel: 'moderado', limite: 50, alternativas: [], razon: 'Moderados en carbs' },
      { nombre: 'pepino', nombre_normalizado: 'pepino', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 400, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'pimiento rojo', nombre_normalizado: 'pimiento_rojo', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'pimiento verde', nombre_normalizado: 'pimiento_verde', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'col rizada', nombre_normalizado: 'col_rizada', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb, rica en nutrientes' },
      { nombre: 'kale', nombre_normalizado: 'kale', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'rucula', nombre_normalizado: 'rucula', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'acelga', nombre_normalizado: 'acelga', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'berenjena', nombre_normalizado: 'berenjena', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'calabaza', nombre_normalizado: 'calabaza', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'alcachofa', nombre_normalizado: 'alcachofa', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'remolacha', nombre_normalizado: 'remolacha', categoria: 'verduras', carb_netos_100g: 6, nivel: 'moderado', limite: 100, alternativas: [], razon: 'Moderada en carbs' },
      { nombre: 'col', nombre_normalizado: 'col', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'repollo', nombre_normalizado: 'repollo', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'nopal', nombre_normalizado: 'nopal', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'chayote', nombre_normalizado: 'chayote', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 300, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'jicama', nombre_normalizado: 'jicama', categoria: 'verduras', carb_netos_100g: 4, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'puerro', nombre_normalizado: 'puerro', categoria: 'verduras', carb_netos_100g: 5, nivel: 'moderado', limite: 100, alternativas: [], razon: 'Moderado, controlar porcion' },
      { nombre: 'rabano', nombre_normalizado: 'rabano', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'rabanito', nombre_normalizado: 'rabanito', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'cebolla morada', nombre_normalizado: 'cebolla_morada', categoria: 'verduras', carb_netos_100g: 7, nivel: 'moderado', limite: 50, alternativas: [], razon: 'Moderada, controlar porcion' },
      { nombre: 'cebolla blanca', nombre_normalizado: 'cebolla_blanca', categoria: 'verduras', carb_netos_100g: 7, nivel: 'moderado', limite: 50, alternativas: [], razon: 'Moderada, controlar porcion' },
      { nombre: 'cilantro', nombre_normalizado: 'cilantro', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'hierbabuena', nombre_normalizado: 'hierbabuena', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'eneldo', nombre_normalizado: 'eneldo', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'albahaca', nombre_normalizado: 'albahaca', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'tomillo', nombre_normalizado: 'tomillo', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'romero', nombre_normalizado: 'romero', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'orégano', nombre_normalizado: 'oregano', categoria: 'verduras', carb_netos_100g: 3, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'cebollino', nombre_normalizado: 'cebollino', categoria: 'verduras', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      
      // ESPECIAS
      { nombre: 'canela', nombre_normalizado: 'canela', categoria: 'especias', carb_netos_100g: 5, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy baja en carbs efectivo' },
      { nombre: 'pimienta negra', nombre_normalizado: 'pimienta_negra', categoria: 'especias', carb_netos_100g: 4, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'pimienta blanca', nombre_normalizado: 'pimienta_blanca', categoria: 'especias', carb_netos_100g: 4, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'cúrcuma', nombre_normalizado: 'curcuma', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'jengibre', nombre_normalizado: 'jengibre', categoria: 'especias', carb_netos_100g: 5, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Bajo carb efectivo' },
      { nombre: 'comino', nombre_normalizado: 'comino', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'pimentón', nombre_normalizado: 'pimenton', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'paprika', nombre_normalizado: 'paprika', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'azafrán', nombre_normalizado: 'azafran', categoria: 'especias', carb_netos_100g: 2, nivel: 'seguro', limite: 10, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'clavo', nombre_normalizado: 'clavo', categoria: 'especias', carb_netos_100g: 2, nivel: 'seguro', limite: 10, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'nuez moscada', nombre_normalizado: 'nuez_moscada', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 10, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'cardamomo', nombre_normalizado: 'cardamomo', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'anís', nombre_normalizado: 'anis', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'hinojo', nombre_normalizado: 'hinojo', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'laurel', nombre_normalizado: 'laurel', categoria: 'especias', carb_netos_100g: 2, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'estragón', nombre_normalizado: 'estragón', categoria: 'especias', carb_netos_100g: 2, nivel: 'seguro', limite: 20, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'salsa de soja', nombre_normalizado: 'salsa_soja', categoria: 'especias', carb_netos_100g: 5, nivel: 'moderado', limite: 20, alternativas: [], razon: 'Moderada en sodio' },
      { nombre: 'vinagre', nombre_normalizado: 'vinagre', categoria: 'especias', carb_netos_100g: 0, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'vinagre de manzana', nombre_normalizado: 'vinagre_manzana', categoria: 'especias', carb_netos_100g: 1, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'mostaza', nombre_normalizado: 'mostaza', categoria: 'especias', carb_netos_100g: 3, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Muy bajo carb' },
      { nombre: 'ajo en polvo', nombre_normalizado: 'ajo_polvo', categoria: 'especias', carb_netos_100g: 4, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'cebolla en polvo', nombre_normalizado: 'cebolla_polvo', categoria: 'especias', carb_netos_100g: 4, nivel: 'seguro', limite: 30, alternativas: [], razon: 'Bajo carb' },
      
      // FRUTOS SECOS
      { nombre: 'almendras', nombre_normalizado: 'almendras', categoria: 'frutos_secos', carb_netos_100g: 10, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajas en carb neto' },
      { nombre: 'nueces', nombre_normalizado: 'nueces', categoria: 'frutos_secos', carb_netos_100g: 7, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajas en carbs' },
      { nombre: 'macadamia', nombre_normalizado: 'macadamia', categoria: 'frutos_secos', carb_netos_100g: 5, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajas en carbs' },
      { nombre: 'semillas de chia', nombre_normalizado: 'semillas_chia', categoria: 'frutos_secos', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajas en carbs' },
      { nombre: 'semillas de linaza', nombre_normalizado: 'semillas_linaza', categoria: 'frutos_secos', carb_netos_100g: 2, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Muy bajas en carbs' },
      { nombre: 'pasas', nombre_normalizado: 'pasas', categoria: 'frutos_secos', carb_netos_100g: 75, nivel: 'critico', limite: 0, alternativas: ['nueces'], razon: 'Muy altas en azúcar' },
      
      // OTROS
      { nombre: 'cafe', nombre_normalizado: 'cafe', categoria: 'bebidas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'te verde', nombre_normalizado: 'te_verde', categoria: 'bebidas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'caldo de pollo', nombre_normalizado: 'caldo_pollo', categoria: 'bebidas', carb_netos_100g: 0, nivel: 'seguro', limite: 500, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'sal', nombre_normalizado: 'sal', categoria: 'especias', carb_netos_100g: 0, nivel: 'seguro', limite: 1000, alternativas: [], razon: 'Cero carbs' },
      { nombre: 'pimienta', nombre_normalizado: 'pimienta', categoria: 'especias', carb_netos_100g: 5, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Bajo carb' },
      { nombre: 'canela', nombre_normalizado: 'canela', categoria: 'especias', carb_netos_100g: 10, nivel: 'moderado', limite: 10, alternativas: [], razon: 'Moderada' },
      
      // HARINAS - CRÍTICAS
      { nombre: 'harina de trigo', nombre_normalizado: 'harina_trigo', categoria: 'harinas', carb_netos_100g: 73, nivel: 'critico', limite: 0, alternativas: ['harina de almendra', 'harina de coco'], razon: 'Alto contenido de carbs, gluten' },
      { nombre: 'harina de arroz', nombre_normalizado: 'harina_arroz', categoria: 'harinas', carb_netos_100g: 78, nivel: 'critico', limite: 0, alternativas: ['harina de coco'], razon: 'Alto índice glucémico' },
      { nombre: 'harina de almendra', nombre_normalizado: 'harina_almendra', categoria: 'harinas', carb_netos_100g: 10, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Baja en carbs para repostería keto' },
      { nombre: 'harina de coco', nombre_normalizado: 'harina_coco', categoria: 'harinas', carb_netos_100g: 8, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Baja en carbs' },

      // AZÚCARES - CRÍTICOS
      { nombre: 'azucar', nombre_normalizado: 'azucar', categoria: 'azucares', carb_netos_100g: 100, nivel: 'critico', limite: 0, alternativas: ['eritritol', 'stevia'], razon: 'Pure sucrose, eleva glucosa' },
      { nombre: 'azucar blanco', nombre_normalizado: 'azucar_blanco', categoria: 'azucares', carb_netos_100g: 100, nivel: 'critico', limite: 0, alternativas: ['eritritol'], razon: 'Pure sucrose' },
      { nombre: 'miel', nombre_normalizado: 'miel', categoria: 'azucares', carb_netos_100g: 82, nivel: 'critico', limite: 0, alternativas: ['eritritol'], razon: 'Alto contenido de fructosa' },
      { nombre: 'eritritol', nombre_normalizado: 'eritritol', categoria: 'edulcorantes', carb_netos_100g: 0, nivel: 'seguro', limite: 50, alternativas: [], razon: 'Alcohol de azúcar sin impacto metabólico' },
      { nombre: 'stevia', nombre_normalizado: 'stevia', categoria: 'edulcorantes', carb_netos_100g: 0, nivel: 'seguro', limite: 10, alternativas: [], razon: 'Endulzante natural sin calorías' },

      // FRUTAS
      { nombre: 'fresas', nombre_normalizado: 'fresas', categoria: 'frutas', carb_netos_100g: 6, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Bajas en carbohidratos' },
      { nombre: 'frambuevas', nombre_normalizado: 'frambuevas', categoria: 'frutas', carb_netos_100g: 5, nivel: 'seguro', limite: 150, alternativas: [], razon: 'Muy altas en fibra' },
      { nombre: 'aguacate', nombre_normalizado: 'aguacate', categoria: 'frutas', carb_netos_100g: 2, nivel: 'seguro', limite: 200, alternativas: [], razon: 'Muy bajo carb neto' },
      { nombre: 'platano', nombre_normalizado: 'platano', categoria: 'frutas', carb_netos_100g: 20, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Muy alto en carbohidratos' },
      { nombre: 'manzana', nombre_normalizado: 'manzana', categoria: 'frutas', carb_netos_100g: 12, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alto contenido de azúcar' },
      { nombre: 'naranja', nombre_normalizado: 'naranja', categoria: 'frutas', carb_netos_100g: 10, nivel: 'moderado', limite: 50, alternativas: ['limon'], razon: 'Contiene fructosa' },

      // VERDURAS CRÍTICAS
      { nombre: 'patata', nombre_normalizado: 'patata', categoria: 'verduras', carb_netos_100g: 15, nivel: 'critico', limite: 0, alternativas: ['coliflor'], razon: 'Alto contenido de almidón' },
      { nombre: 'batata', nombre_normalizado: 'batata', categoria: 'verduras', carb_netos_100g: 17, nivel: 'critico', limite: 0, alternativas: ['nabo'], razon: 'Alto índice glucémico' },
      { nombre: 'zanahoria', nombre_normalizado: 'zanahoria', categoria: 'verduras', carb_netos_100g: 7, nivel: 'seguro', limite: 100, alternativas: [], razon: 'Baja en carbs cuando se controla la porcion' },
      
      // LÁCTEOS
      { nombre: 'leche', nombre_normalizado: 'leche', categoria: 'lacteos', carb_netos_100g: 5, nivel: 'moderado', limite: 150, alternativas: ['leche de coco'], razon: 'Contiene lactosa' },
      { nombre: 'leche entera', nombre_normalizado: 'leche_entera', categoria: 'lacteos', carb_netos_100g: 5, nivel: 'moderado', limite: 150, alternativas: ['leche de coco'], razon: 'Contiene lactosa' },
      
      // PANES Y PASTAS
      { nombre: 'pan', nombre_normalizado: 'pan', categoria: 'panes', carb_netos_100g: 46, nivel: 'critico', limite: 0, alternativas: ['pan keto'], razon: 'Alto contenido de carbs' },
      { nombre: 'pasta', nombre_normalizado: 'pasta', categoria: 'pasta', carb_netos_100g: 29, nivel: 'critico', limite: 0, alternativas: ['calabacin'], razon: 'Alto contenido de carbs' },
      { nombre: 'arroz blanco', nombre_normalizado: 'arroz_blanco', categoria: 'granos', carb_netos_100g: 27, nivel: 'critico', limite: 0, alternativas: ['arroz de coliflor'], razon: 'Alto índice glucémico' },
      { nombre: 'avena', nombre_normalizado: 'avena', categoria: 'granos', carb_netos_100g: 56, nivel: 'critico', limite: 0, alternativas: ['semillas de chia'], razon: 'Muy alta en carbs' },
      { nombre: 'arroz', nombre_normalizado: 'arroz', categoria: 'granos', carb_netos_100g: 28, nivel: 'critico', limite: 0, alternativas: ['arroz de coliflor'], razon: 'Alto contenido de carbs' },
      { nombre: 'arroz integral', nombre_normalizado: 'arroz_integral', categoria: 'granos', carb_netos_100g: 23, nivel: 'critico', limite: 0, alternativas: ['arroz de coliflor'], razon: 'Alto contenido de carbs' },
      { nombre: 'frijoles', nombre_normalizado: 'frijoles', categoria: 'legumbres', carb_netos_100g: 20, nivel: 'critico', limite: 0, alternativas: ['frijoles de soja'], razon: 'Muy altos en carbs' },
      { nombre: 'frijoles negros', nombre_normalizado: 'frijoles_negros', categoria: 'legumbres', carb_netos_100g: 23, nivel: 'critico', limite: 0, alternativas: ['edamame'], razon: 'Muy altos en carbs' },
      { nombre: 'frijoles rojos', nombre_normalizado: 'frijoles_rojos', categoria: 'legumbres', carb_netos_100g: 22, nivel: 'critico', limite: 0, alternativas: ['edamame'], razon: 'Muy altos en carbs' },
      { nombre: 'lentejas', nombre_normalizado: 'lentejas', categoria: 'legumbres', carb_netos_100g: 20, nivel: 'critico', limite: 0, alternativas: ['coliflor'], razon: 'Muy altas en carbs' },
      { nombre: 'quinoa', nombre_normalizado: 'quinoa', categoria: 'granos', carb_netos_100g: 21, nivel: 'critico', limite: 0, alternativas: ['coliflor'], razon: 'Alta en carbs' },
      { nombre: 'papaya', nombre_normalizado: 'papaya', categoria: 'frutas', carb_netos_100g: 10, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alta en azúcar' },
      { nombre: 'uva', nombre_normalizado: 'uva', categoria: 'frutas', carb_netos_100g: 17, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Muy alta en azúcar' },
      { nombre: 'platano', nombre_normalizado: 'platano', categoria: 'frutas', carb_netos_100g: 20, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alto índice glucémico' },
      { nombre: 'mango', nombre_normalizado: 'mango', categoria: 'frutas', carb_netos_100g: 15, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alto en azúcar' },
      { nombre: 'manzana', nombre_normalizado: 'manzana', categoria: 'frutas', carb_netos_100g: 14, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alta en azúcar' },
      { nombre: 'naranja', nombre_normalizado: 'naranja', categoria: 'frutas', carb_netos_100g: 12, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alta en azúcar' },
      { nombre: 'piña', nombre_normalizado: 'pina', categoria: 'frutas', carb_netos_100g: 13, nivel: 'critico', limite: 0, alternativas: ['fresas'], razon: 'Alta en azúcar' },
      
      // SALSAS
      { nombre: 'salsa barbecue', nombre_normalizado: 'salsa_barbecue', categoria: 'salsas', carb_netos_100g: 29, nivel: 'critico', limite: 0, alternativas: ['tomate'], razon: 'Mucho azúcar añadida' },
      { nombre: 'salsa de soja', nombre_normalizado: 'salsa_soja', categoria: 'salsas', carb_netos_100g: 7, nivel: 'moderado', limite: 30, alternativas: ['aminoacidos de coco'], razon: 'Contiene trigo y algo de carbs' },
      
      // OTROS INGREDIENTES
      { nombre: 'chocolate', nombre_normalizado: 'chocolate', categoria: 'otros', carb_netos_100g: 30, nivel: 'critico', limite: 0, alternativas: ['chocolate 90%'], razon: 'Alto contenido de azúcar' },
      { nombre: 'crutones', nombre_normalizado: 'crutones', categoria: 'otros', carb_netos_100g: 50, nivel: 'critico', limite: 0, alternativas: ['semillas'], razon: 'Pan seco alto en carbs' },
      { nombre: 'aderezo', nombre_normalizado: 'aderezo', categoria: 'salsas', carb_netos_100g: 5, nivel: 'moderado', limite: 50, alternativas: ['aceite de oliva'], razon: 'Puede contener azúcar' }
    ];
  }

  function normalizarNombre(nombre) {
    if (!nombre) return '';
    return nombre.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .trim();
  }

  function buscarIngrediente(nombre) {
    var normalizado = normalizarNombre(nombre);
    var found = ingredientesDB.find(function(i) {
      return i.nombre.toLowerCase() === nombre.toLowerCase() ||
             i.nombre_normalizado === normalizado;
    });
    if (!found) {
      found = ingredientesDB.find(function(i) {
        return i.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
               normalizado.includes(i.nombre_normalizado);
      });
    }
    // Si no se encuentra, retornar null (no seguro)
    return found;
  }

function inspeccionarReceta(receta) {
    var ingList = receta.ingredientes || receta.ingredients || [];
    if (!receta || !ingList || ingList.length === 0) {
      return { success: false, error: 'Receta sin ingredientes', ingredientes_analizados: [] };
    }
    
    var analisis = [];
    var totalCarbNetos = 0;
    var tieneCritico = false;
    var tieneModerado = false;

    ingList.forEach(function(item) {
      var cantidad = parseFloat(item.cantidad || item.quantity) || 100;
      var unidad = item.unidad || item.unit || 'g';
      cantidad = convertirAGramos(cantidad, unidad);
      
      var nombreIng = item.nombre || item.name || 'desconocido';
      var info = buscarIngrediente(nombreIng);
      
      if (info) {
        var carbEstimados = (info.carb_netos_100g * cantidad) / 100;
        totalCarbNetos += carbEstimados;
        
        if (info.nivel === 'critico') tieneCritico = true;
        if (info.nivel === 'moderado') tieneModerado = true;
        
        // Usar alternativas inteligentes para críticos
        var smartAlt = getAlternativasInteligentes({nombre: nombreIng, nivel: info.nivel, categoria: info.categoria});
        
        analisis.push({
          nombre: nombreIng,
          cantidad: cantidad + ' ' + unidad,
          nivel: info.nivel,
          carb_netos_estimados: Math.round(carbEstimados * 100) / 100,
          sugerencia: (smartAlt.alternativas && smartAlt.alternativas.length > 0) 
            ? 'Usar: ' + smartAlt.alternativas[0] + ' (' + smartAlt.razon + ')'
            : 'Reducir a ' + info.limite + 'g',
          alternativa: smartAlt.alternativas[0] || null,
          alternativas: smartAlt.alternativas || [],
          razon: smartAlt.razon || info.razon
        });
      } else {
        // No encontrado en DB - inferir categoria
        var categoriaInferida = inferCategory(nombreIng);
        
        // Determinar nivel basado en la categoria inferida
        var nivelInferido = 'moderado';
        var categoriasSeguras = ['proteinas', 'pescado', 'huevos', 'verduras', 'lacteos', 'frutos_secos', 'grasas', 'edulcorantes', 'bebidas'];
        if (categoriasSeguras.indexOf(categoriaInferida) >= 0) {
          nivelInferido = 'seguro';
        } else if (categoriaInferida === 'granos' || categoriaInferida === 'legumbres') {
          nivelInferido = 'critico';
        }
        
        var smartAlt = getAlternativasInteligentes({nombre: nombreIng, nivel: nivelInferido, categoria: categoriaInferida});
        
        analisis.push({
          nombre: nombreIng,
          cantidad: cantidad + ' ' + unidad,
          nivel: nivelInferido,
          categoria_inferida: categoriaInferida,
          carb_netos_estimados: 0,
          sugerencia: (smartAlt.alternativas && smartAlt.alternativas.length > 0)
            ? 'Usar: ' + smartAlt.alternativas[0] + ' (' + smartAlt.razon + ')'
            : nivelInferido === 'seguro' ? 'Ingrediente keto' : 'Revisar manualmente',
          alternativa: smartAlt.alternativas[0] || null,
          alternativas: smartAlt.alternativas || [],
          razon: smartAlt.razon || 'No esta en la base de datos'
        });
        
        if (nivelInferido === 'critico') tieneCritico = true;
        if (nivelInferido === 'moderado') tieneModerado = true;
      }
    });

    var porciones = parseInt(receta.porciones) || 1;
    var carbPorcion = totalCarbNetos / porciones;
    var puntajeKeto = calcularPuntajeKeto(carbPorcion, tieneCritico, tieneModerado);

    var nivelSeguridad = 'seguro';
    if (puntajeKeto < 40 || tieneCritico) {
      nivelSeguridad = 'riesgo_alto';
    } else if (puntajeKeto < CONFIG.PUNTAJE_SEGURO || tieneModerado) {
      nivelSeguridad = 'moderado';
    }

    return {
      success: true,
      receta_id: receta.id,
      nombre_original: receta.nombre,
      puntaje_keto: puntajeKeto,
      nivel_seguridad: nivelSeguridad,
      ingredientes_analizados: analisis,
      total_carbohidratos_netos_receta: Math.round(totalCarbNetos * 100) / 100,
      carbohidratos_netos_porcion: Math.round(carbPorcion * 100) / 100,
      porcion_sugerida: generarPorcionSugerida(carbPorcion),
      limite_diario: CONFIG.LIMITE_CARB_NETOS_PORCION,
      requiere_optimizacion: nivelSeguridad !== 'seguro'
    };
  }

  function convertirAGramos(cantidad, unidad) {
    var conversion = {
      'g': 1, 'gramos': 1, 'kg': 1000,
      'ml': 1, 'litro': 1000, 'l': 1000,
      'oz': 28.35, 'onza': 28.35, 'lb': 453.6, 'libra': 453.6,
      'taza': 240, 'cda': 15, 'cdita': 5,
      'unidad': 100, 'u': 100
    };
    var factor = conversion[unidad.toLowerCase()] || 1;
    return cantidad * factor;
  }

  function calcularPuntajeKeto(carbPorcion, tieneCritico, tieneModerado) {
    var puntaje = 100;
    if (carbPorcion > 20) puntaje -= 50;
    else if (carbPorcion > 15) puntaje -= 35;
    else if (carbPorcion > 10) puntaje -= 20;
    else if (carbPorcion > 5) puntaje -= 10;
    if (tieneCritico) puntaje -= 40;
    if (tieneModerado) puntaje -= 20;
    return Math.max(0, Math.min(100, puntaje));
  }

  function generarPorcionSugerida(carbPorcion) {
    if (carbPorcion <= 5) return 'Receta segura. Porción completa.';
    else if (carbPorcion <= CONFIG.LIMITE_CARB_NETOS_PORCION) return 'Porción moderada.';
    else if (carbPorcion <= 15) return 'Reducir a 1/2 porción o modificar receta.';
    else return 'NO RECOMENDADO. Excede límite diario de carbs.';
  }

  function inspeccionarIngrediente(nombre, cantidad, unidad) {
    var cantidadGramos = convertirAGramos(parseFloat(cantidad) || 100, unidad || 'g');
    var info = buscarIngrediente(nombre);
    if (!info) {
      return { nombre: nombre, nivel: 'desconocido', seguro: true };
    }
    var carbEstimados = (info.carb_netos_100g * cantidadGramos) / 100;
    return {
      nombre: nombre,
      cantidad: cantidad + ' ' + unidad,
      nivel: info.nivel,
      carb_netos_estimados: Math.round(carbEstimados * 100) / 100,
      alternativas: info.alternativas,
      razon: info.razon,
      seguro: info.nivel === 'seguro',
      requiere_advertencia: info.nivel === 'critico'
    };
  }

  function filtrarRecetasSeguras(recetas, puntajeMinimo) {
    puntajeMinimo = puntajeMinimo || CONFIG.PUNTAJE_SEGURO;
    return recetas.filter(function(receta) {
      var reporte = inspeccionarReceta(receta);
      return reporte.success && reporte.puntaje_keto >= puntajeMinimo;
    });
  }

  function buscarAlternativasReceta(mealType, excludeIds) {
    excludeIds = excludeIds || [];
    if (typeof window.KETO_RECIPES === 'undefined') return [];
    
    var alternativas = [];
    Object.keys(window.KETO_RECIPES).forEach(function(key) {
      var r = window.KETO_RECIPES[key];
      if (r.mealType === mealType && excludeIds.indexOf(key) === -1) {
        var reporte = inspeccionarReceta(r);
        if (reporte && reporte.nivel_seguridad === 'seguro') {
          alternativas.push({
            id: key,
            title: r.title,
            calories: r.calories,
            netCarbs: r.netCarbs || r.carbs,
            puntaje_keto: reporte.puntaje_keto,
            nivel_seguridad: reporte.nivel_seguridad
          });
        }
      }
    });
    
    return alternativas.sort(function(a, b) { return b.puntaje_keto - a.puntaje_keto; }).slice(0, 5);
  }

  function optimizarReceta(receta) {
    var reporte = inspeccionarReceta(receta);
    if (!reporte.success) return { error: 'No se pudo analizar' };
    
    var alternativas = buscarAlternativasReceta(receta.mealType, [receta.id]);
    
    return {
      reporte_original: reporte,
      alternativas: alternativas,
      mensaje: 'Esta receta tiene opciones más seguras'
    };
  }

  var CULINARY_KNOWLEDGE = {
    funciones: {
      'base_almidon': {
        descripcion: 'Reemplaza arroz, pasta, papas',
        alternativas: ['coliflor', 'nabo', 'calabacin', 'brocoli', 'fideos de konjac'],
        notas: 'Mantiene textura similar'
      },
      'textura_cremosa': {
        descripcion: 'Salsas y cremas',
        alternativas: ['aguacate', 'queso crema', 'crema de coco', 'nata'],
        notas: 'Para cremas y sopas'
      },
      'dulzor': {
        descripcion: 'Endulzantes',
        alternativas: ['eritritol', 'stevia', 'monk fruit'],
        notas: 'Sin impacto en glucosa'
      },
      'volumen': {
        descripcion: 'Llenar plato',
        alternativas: ['espinacas', 'lechuga', 'col rizada', 'acelgas'],
        notas: 'Muy bajo en carbs'
      },
      'grasa': {
        descripcion: 'Grasas saludables',
        alternativas: ['mantequilla', 'aceite de oliva', 'aceite de coco', 'ghee'],
        notas: 'Esenciales para cetosis'
      },
      'liquido': {
        descripcion: 'Caldo y líquidos',
        alternativas: ['caldo de pollo', 'caldo de carne', 'leche de coco'],
        notas: 'Para guisos y sopas'
      },
      'proteina': {
        descripcion: 'Fuentes de proteína',
        alternativas: ['pollo', 'res', 'cerdo', 'pescado', 'huevos', 'tofu'],
        notas: 'Varía según plato'
      },
      'verdura': {
        descripcion: 'Verduras keto',
        alternativas: ['brocoli', 'coliflor', 'espinacas', 'calabacin', 'pimiento'],
        notas: 'Bajas en carbs'
      },
      'legumbre': {
        descripcion: 'Legumbres y frijoles',
        alternativas: ['tofu', 'edamame', 'semillas de girasol'],
        notas: 'Solo en pequeñas cantidades'
      },
      'fruta': {
        descripcion: 'Frutas bajas en carb',
        alternativas: ['fresas', 'frambuesas', 'arándanos', 'coco'],
        notas: 'Con moderación'
      }
    },
    reemplazos: {
      // ARROZ Y DERIVADOS
      'arroz': { func: 'base_almidon', alt: ['coliflor', 'nabo', 'arroz de calabacin'], nota: 'Rice → Cauliflower rice' },
      'arroz blanco': { func: 'base_almidon', alt: ['coliflor', 'nabo', 'arroz de calabacin'], nota: 'White rice → Cauliflower' },
      'arroz integral': { func: 'base_almidon', alt: ['coliflor', 'nabo', 'calabacin'], nota: 'Brown rice → Riced veggies' },
      'arroz jazmin': { func: 'base_almidon', alt: ['coliflor', 'arroz de calabacin'], nota: 'Jasmine → Cauliflower' },
      'arroz bomba': { func: 'base_almidon', alt: ['coliflor', 'nabo'], nota: 'Paella rice → Veggie base' },
      'brown_rice': { func: 'base_almidon', alt: ['coliflor', 'nabo', 'arroz de calabacin'], nota: 'Brown rice → Cauliflower' },
      'white_rice': { func: 'base_almidon', alt: ['coliflor', 'nabo', 'arroz de calabacin'], nota: 'White rice → Cauliflower' },
      
      // PASTA Y FIDEOS
      'pasta': { func: 'base_almidon', alt: ['calabacin', 'coliflor', 'fideos konjac'], nota: 'Pasta → Zucchini noodles' },
      'pasta integral': { func: 'base_almidon', alt: ['calabacin', 'fideos konjac'], nota: 'Whole wheat → Zoodles' },
      'espagueti': { func: 'base_almidon', alt: ['calabacin', 'fideos konjac'], nota: 'Spaghetti → Zoodles' },
      'fideos': { func: 'base_almidon', alt: ['calabacin', 'fideos konjac'], nota: 'Noodles → Zoodles' },
      'fideos de arroz': { func: 'base_almidon', alt: ['calabacin', 'verduras'], nota: 'Rice noodles → Veggie' },
      'noodles': { func: 'base_almidon', alt: ['calabacin', 'fideos konjac'], nota: 'Noodles → Zoodles' },
      'laminas lasaña': { func: 'base_almidon', alt: ['calabacin', 'berenjena'], nota: 'Lasagna → veggie layers' },
      
      // PAPAS Y TUBERCULOS
      'papa': { func: 'base_almidon', alt: ['nabo', 'coliflor', 'calabacin'], nota: 'Potato → Turnip mash' },
      'patata': { func: 'base_almidon', alt: ['nabo', 'coliflor', 'calabacin'], nota: 'Potato → Turnip' },
      'patatas': { func: 'base_almidon', alt: ['nabo', 'coliflor'], nota: 'Potatoes → Turnips' },
      'batata': { func: 'base_almidon', alt: ['nabo', 'calabacin'], nota: 'Sweet potato → Turnip' },
      'camote': { func: 'base_almidon', alt: ['nabo', 'calabacin'], nota: 'Sweet potato → Turnip' },
      'potato': { func: 'base_almidon', alt: ['nabo', 'coliflor', 'calabacin'], nota: 'Potato → Turnip' },
      'sweet_potato': { func: 'base_almidon', alt: ['nabo', 'calabacin'], nota: 'Sweet potato → Turnip' },
      
      // LEGUMBRES
      'frijoles': { func: 'legumbre', alt: ['edamame', 'tofu', 'semillas de girasol'], nota: 'Beans → Tofu/Seeds' },
      'frijoles negros': { func: 'legumbre', alt: ['edamame', 'tofu'], nota: 'Black beans → Tofu' },
      'frijoles rojos': { func: 'legumbre', alt: ['edamame', 'tofu'], nota: 'Red beans → Tofu' },
      'lentejas': { func: 'legumbre', alt: ['coliflor', 'nabo', 'tofu'], nota: 'Lentils → Cauliflower' },
      'garbanzos': { func: 'legumbre', alt: ['almendras', 'semillas'], nota: 'Chickpeas → Nuts/Seeds' },
      'edamame': { func: 'legumbre', alt: ['almendras', 'semillas de girasol'], nota: 'Edamame → Low-carb option' },
      'beans': { func: 'legumbre', alt: ['edamame', 'tofu'], nota: 'Beans → Tofu' },
      'lentils': { func: 'legumbre', alt: ['coliflor', 'nabo'], nota: 'Lentils → Cauliflower' },
      'quinoa': { func: 'base_almidon', alt: ['coliflor', 'brocoli', 'nabo'], nota: 'Quinoa → Cauliflower' },
      
      // PANES Y HARINAS
      'pan': { func: 'base_almidon', alt: ['pan keto', 'torta de almendra', 'lechuga'], nota: 'Bread → Lettuce wrap' },
      'pan integral': { func: 'base_almidon', alt: ['pan keto', 'torta de almendra'], nota: 'Wheat bread → Keto bread' },
      'pan rallado': { func: 'base_almidon', alt: ['harina de almendra', 'coco rallado'], nota: 'Breadcrumbs → Almond flour' },
      'tortilla grande': { func: 'base_almidon', alt: ['tortilla de harina de almendra', 'col'], nota: 'Tortilla → Cheese shell' },
      'bread': { func: 'base_almidon', alt: ['pan keto', 'torta de almendra'], nota: 'Bread → Keto bread' },
      'avena': { func: 'base_almidon', alt: ['semillas chia', 'harina de coco'], nota: 'Oats → Chia pudding' },
      'oats': { func: 'base_almidon', alt: ['semillas chia', 'harina de coco'], nota: 'Oats → Chia pudding' },
      'galletas de arroz': { func: 'base_almidon', alt: ['nueces', 'almendras'], nota: 'Rice crackers → Nuts' },
      
      // AZUCARES Y DULZORES
      'azucar': { func: 'dulzor', alt: ['eritritol', 'stevia', 'monk fruit'], nota: 'Sugar → Erythritol' },
      'miel': { func: 'dulzor', alt: ['eritritol', 'stevia'], nota: 'Honey → Keto sweetener' },
      'jarabe de arce': { func: 'dulzor', alt: ['eritritol', 'stevia'], nota: 'Maple → Keto syrup' },
      'honey': { func: 'dulzor', alt: ['eritritol', 'stevia'], nota: 'Honey → Keto sweetener' },
      'sugar': { func: 'dulzor', alt: ['eritritol', 'stevia', 'monk fruit'], nota: 'Sugar → Keto sweetener' },
      'agave': { func: 'dulzor', alt: ['eritritol', 'stevia'], nota: 'Agave → Keto sweetener' },
      
      // FRUTAS NO KETO
      'platano': { func: 'fruta', alt: ['fresas', 'coco'], nota: 'Banana → Berries' },
      'mango': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Mango → Berries' },
      'piña': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Pineapple → Berries' },
      'papaya': { func: 'fruta', alt: ['fresas', 'coco'], nota: 'Papaya → Low-carb fruit' },
      'uva': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Grapes → Berries' },
      'manzana': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Apple → Berries' },
      'pera': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Pear → Berries' },
      'higo': { func: 'fruta', alt: ['fresas', 'almendras'], nota: 'Fig → Low-carb' },
      'dátil': { func: 'fruta', alt: ['coco', 'pasas de cacao'], nota: 'Date → Unsweetened coco' },
      'pasas': { func: 'fruta', alt: ['arándanos', 'semillas de girasol'], nota: 'Raisins → Seeds' },
      'banana': { func: 'fruta', alt: ['fresas', 'coco'], nota: 'Banana → Berries' },
      'apple': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Apple → Berries' },
      'grapes': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Grapes → Berries' },
      'pineapple': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Pineapple → Berries' },
      'mango': { func: 'fruta', alt: ['fresas', 'arándanos'], nota: 'Mango → Berries' },
      'orange': { func: 'fruta', alt: ['limón', 'fresas'], nota: 'Orange → Lemon/Berries' },
      
      // LECHE
      'leche': { func: 'liquido', alt: ['leche de coco', 'leche de almendra'], nota: 'Milk → Coconut/Almond' },
      'leche entera': { func: 'liquido', alt: ['leche de coco', 'crema de coco'], nota: 'Milk → Coconut milk' },
      'milk': { func: 'liquido', alt: ['leche de coco', 'leche de almendra'], nota: 'Milk → Coconut/Almond' },
      'crema de leche': { func: 'liquido', alt: ['crema de coco', 'nata'], nota: 'Cream → Coconut cream' },
      
      // HARINAS
      'harina de trigo': { func: 'harina', alt: ['harina de almendra', 'harina de coco'], nota: 'Wheat → Almond flour' },
      'harina de arroz': { func: 'harina', alt: ['harina de coco', 'harina de almendra'], nota: 'Rice → Almond flour' },
      'maicena': { func: 'harina', alt: ['harina de coco', 'harina de almendra'], nota: 'Cornstarch → Coconut flour' },
      'wheat_flour': { func: 'harina', alt: ['harina de almendra', 'harina de coco'], nota: 'Wheat → Almond flour' },
      'all_purpose_flour': { func: 'harina', alt: ['harina de almendra', 'harina de coco'], nota: 'AP flour → Almond flour' },
      'rice_flour': { func: 'harina', alt: ['harina de coco', 'harina de almendra'], nota: 'Rice → Almond flour' },
      
      // SALSAS
      'salsa teriyaki': { func: 'dulzor', alt: ['salsa de soja baja en sodio', 'aminoacidos de coco'], nota: 'Teriyaki → Low-sugar soy' },
      'salsa barbecue': { func: 'dulzor', alt: ['salsa de tomate sin azucar'], nota: 'BBQ → Sugar-free tomato' },
      'ketchup': { func: 'dulzor', alt: ['tomate natural'], nota: 'Ketchup → Fresh tomato' },
      'salsa gochujang': { func: 'dulzor', alt: ['pasta de chile', 'curry en polvo'], nota: 'Gochujang → Chili paste' }
    }
  };

  var CATEGORY_PATTERNS = {
    // PROTEÍNAS/CARNES
    'proteinas': ['pollo', 'carne', 'cerdo', 'res', 'ternera', 'bistec', 'lomo', 'cordero', 'carnero', 'pavo', 'codorniz', 'conejo', 'liebre', 'higado', 'molleja', 'chorizo', 'salchicha', 'jamon', 'tocino', 'bacon', 'hamburguesa', 'meat', 'beef', 'pork', 'lamb', 'turkey', 'chicken', 'veal', 'steak', 'ham', 'sausage', 'patty'],
    'pescado': ['salmon', 'atun', 'bonito', 'sardina', 'caballa', 'merluza', 'bacalao', 'rape', 'rodaballo', 'lenguado', 'trucha', 'tilapia', 'fish', 'seafood', 'tuna', 'shrimp', 'camaron', 'gambas', 'camarones', 'pulpo', 'calamar', 'sepia', 'mejillon', 'almeja', 'ostion', 'ostra', 'mariscos', 'langosta', 'cangrejo', 'camarón', 'langostino'],
    'huevos': ['huevo', 'clara', 'yema', 'omelette', 'omelet', 'egg', 'eggs'],
    
    // VERDURAS
    'verduras': ['brocoli', 'coliflor', 'espinaca', 'acelga', 'col', 'lechuga', 'rucula', 'rúcula', 'alcachofa', 'espárrago', 'pimiento', 'chile', 'aji', 'ají', 'tomate', 'jitomate', 'cebolla', 'ajo', 'puerro', 'zanahoria', 'nabo', 'rábano', 'remolacha', 'apio', 'calabaza', 'calabacin', 'calabacín', 'berenjena', 'chayote', 'nopal', 'coliflor', 'brócoli', 'vegetable', 'veggie', 'lettuce', 'cabbage', 'spinach', 'carrot', 'zucchini', 'courgette', 'cucumber', 'pepper', 'onion', 'garlic', 'mushroom', 'champiñon', 'zoodle', 'zoodles'],
    
    // GRASAS
    'grasas': ['mantequilla', 'manteca', 'aceite', 'grasa', 'ghee', 'nata', 'crema', 'mayonesa', 'avocado', 'aguacate', 'fat', 'butter', 'oil', 'lard', 'cream', 'olive_oil', 'coconut_oil'],
    
    // LÁCTEOS
    'lacteos': ['queso', 'leche', 'yogur', 'yoghurt', 'requeson', 'ricota', 'cottage', 'kefir', 'nata', 'crème', 'dairy', 'cheese', 'yogurt', 'milk', 'cream_cheese', 'mozzarella', 'cheddar', 'parmesano', 'feta', 'gouda', 'brie', 'camembert', 'provolone', 'swiss', 'blue', 'gruyere'],
    
    // FRUTOS SECOS
    'frutos_secos': ['almendra', 'nuez', 'pistacho', 'cacahuate', 'maní', 'nuez_macadamia', 'macadamia', 'pécan', 'pacana', 'avellana', 'semilla', 'chia', 'linaza', 'pipas', 'nseed', 'nut', 'almond', 'walnut', 'pistachio', 'peanut', 'cashew', 'seed'],
    
    // HARINAS/KETOS
    'harinas_keto': ['harina_almendra', 'almendra_molida', 'harina_coco', 'coco_rallado', 'coco', 'psyllium', 'salvia', 'linaza_molida', 'almond_flour', 'coconut_flour', 'flour'],
    
    // EDULCORANTES
    'edulcorantes': ['eritritol', 'stevia', 'monk_fruit', 'monkfruit', 'sukrin', 'xilitol', 'xylitol', 'sweetener', 'sweet'],
    
    // LEGUMBRES (NO KETO)
    'legumbres': ['frijol', 'frijoles', 'lenteja', 'garbanzo', 'poroto', 'haba', 'habas', 'soja', 'edamame', 'bean', 'lentil', 'chickpea', 'legume', 'legumes', 'quinoa', 'lentejas', 'fabas'],
    
    // GRAMOS/ALMIDON (NO KETO)
    'granos': ['arroz', 'pasta', 'pan', 'trigo', 'avena', 'cebada', 'centeno', 'maiz', 'maíz', 'cereal', 'grain', 'rice', 'bread', 'pasta', 'wheat', 'corn', 'potato', 'patata', 'papa', 'sweet_potato', 'yam', 'tubérculo', 'tubers'],
    
    // FRUTAS
    'frutas': ['fresa', 'frambuesa', 'mora', 'arándano', 'coco', 'aguacate', 'limón', 'limon', 'pomelo', 'toronja', 'kiwi', 'manzana', 'pera', 'naranja', 'mango', 'piña', 'uva', 'platano', 'higo', 'dátil', 'pasas', 'melón', 'sandía', 'melon', 'watermelon', 'fruit', 'apple', 'banana', 'grape', 'orange', 'berry', 'berries', 'strawberry', 'blueberry', 'raspberry'],
    
    // BEBIDAS
    'bebidas': ['agua', 'cafe', 'té', 'te', 'infusion', 'bebida', 'drink', 'coffee', 'tea', 'wine', 'vino', 'cerveza', 'beer', 'liquor', 'refresco', 'soda', 'jugo', 'zumo', 'juice'],
    
    // ESPECIAS
    'especias': ['canela', 'pimienta', 'curcuma', 'jengibre', 'comino', 'pimenton', 'paprika', 'azafran', 'clavo', 'nuez moscada', 'cardamomo', 'anis', 'hinojo', 'laurel', 'estragón', 'mostaza', 'vinagre', 'especias', 'specie', 'spice', 'cinnamon', 'pepper', 'turmeric', 'ginger', 'cumin', 'paprika', 'saffron', 'clove', 'nutmeg', 'cardamom', 'fennel', 'bay leaf', 'dijon', 'mustard']
  };

  function inferCategory(nombre) {
    var lower = nombre.toLowerCase();
    
    // Verificar patrones conocidos
    var categorias = Object.keys(CATEGORY_PATTERNS);
    for (var i = 0; i < categorias.length; i++) {
      var cat = categorias[i];
      var patterns = CATEGORY_PATTERNS[cat];
      for (var j = 0; j < patterns.length; j++) {
        if (lower.indexOf(patterns[j]) >= 0) {
          return cat;
        }
      }
    }
    
    return 'otros';
  }

  function getAlternativasPorCategoria(categoria, excludeName) {
    var alternativas = [];
    var exclude = (excludeName || '').toLowerCase();
    
    // Buscar en la base de datos
    for (var j = 0; j < ingredientesDB.length; j++) {
      var ing = ingredientesDB[j];
      if (ing.nivel === 'seguro') {
        // Coincidir por categoria
        var ingCat = (ing.categoria || '').toLowerCase();
        var matches = false;
        
        if (categoria === 'proteinas' && (ingCat === 'proteinas' || ingCat === 'lacteos')) {
          matches = true;
        } else if (categoria === 'pescado' && ingCat === 'proteinas') {
          matches = true;
        } else if (categoria === 'verduras' && ingCat === 'verduras') {
          matches = true;
        } else if (categoria === 'grasas' && (ingCat === 'grasas' || ingCat === 'lacteos')) {
          matches = true;
        } else if (categoria === 'lacteos' && ingCat === 'lacteos') {
          matches = true;
        } else if (categoria === categoria) {
          matches = true;
        }
        
        if (matches && ing.nombre.toLowerCase() !== exclude) {
          alternativas.push(ing.nombre);
        }
      }
    }
    
    // Agregar del CULINARY_KNOWLEDGE si aplica
    if (categoria === 'verduras' || categoria === 'base_almidon') {
      var verdKeto = ['coliflor', 'nabo', 'calabacin', 'brocoli', 'espinacas'];
      verdKeto.forEach(function(v) {
        if (v.toLowerCase() !== exclude && alternativas.indexOf(v) < 0) {
          alternativas.push(v);
        }
      });
    }
    
    return alternativas.slice(0, 5);
  }

  function getAlternativasInteligentes(ingrediente) {
    var nombre = (ingrediente.nombre || '').toLowerCase();
    var normalizado = normalizarNombre(nombre);
    
    // 1. PRIMERO: Buscar en CULINARY_KNOWLEDGE.reemplazos (para ingredientes NO KETO conocidos)
    var keys = Object.keys(CULINARY_KNOWLEDGE.reemplazos);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (nombre === key || nombre.indexOf(key) >= 0 || normalizado.indexOf(key) >= 0) {
        var rep = CULINARY_KNOWLEDGE.reemplazos[key];
        return {
          tipo: rep.func,
          alternativas: rep.alt,
          razon: rep.nota || ('Reemplaza ' + key + ' por alternativa keto'),
          funcion: rep.func
        };
      }
    }
    
    // 2. SEGUNDO: Buscar por coincidencias parciales más flexibles
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var palabras = nombre.split(/\s+/);
      for (var j = 0; j < palabras.length; j++) {
        if (palabras[j] === key || palabras[j].indexOf(key) >= 0) {
          var rep = CULINARY_KNOWLEDGE.reemplazos[key];
          return {
            tipo: rep.func,
            alternativas: rep.alt,
            razon: rep.nota || ('Reemplaza ' + key + ' por alternativa keto'),
            funcion: rep.func
          };
        }
      }
    }
    
    // 3. TERCERO: Si el ingrediente es seguro, no necesita alternativas
    if (ingrediente.nivel === 'seguro') {
      return { tipo: null, alternativas: [], razon: '' };
    }
    
    // 4. CUARTO: Infiere la categoria del ingrediente
    var categoria = inferCategory(nombre);
    
    // Si la categoria es algo seguro, no necesita alternativas
    var categoriasSeguras = ['proteinas', 'pescado', 'huevos', 'verduras', 'lacteos', 'frutos_secos', 'grasas', 'edulcorantes', 'bebidas', 'especias'];
    if (categoriasSeguras.indexOf(categoria) >= 0) {
      return { tipo: null, alternativas: [], razon: '' };
    }
    
    // 5. QUINTO: Para categorias no seguras, buscar alternativas de la misma funcion
    var alternativas = getAlternativasPorCategoria(categoria, nombre);
    
    // Fallback general si no hay alternativas especificas
    if (alternativas.length === 0) {
      alternativas = ['coliflor', 'nabo', 'calabacin', 'brocoli'];
    }
    
    var infoFuncion = CULINARY_KNOWLEDGE.funciones[categoria] || CULINARY_KNOWLEDGE.funciones['base_almidon'];
    
    return {
      tipo: categoria,
      alternativas: alternativas,
      razon: infoFuncion.descripcion || ('Alternativa para ' + categoria + ' keto'),
      funcion: categoria
    };
  }

return {
      init: init,
      inspeccionarReceta: inspeccionarReceta,
      inspeccionarIngrediente: inspeccionarIngrediente,
      filtrarRecetasSeguras: filtrarRecetasSeguras,
      buscarAlternativasReceta: buscarAlternativasReceta,
      optimizarReceta: optimizarReceta,
      getAlternativasInteligentes: getAlternativasInteligentes,
      getCulinaryKnowledge: function() { return CULINARY_KNOWLEDGE; },
      getConfig: function() { return CONFIG; },
    setLimiteCarb: function(valor) { CONFIG.LIMITE_CARB_NETOS_PORCION = valor; },
    setPuntajeMinimo: function(valor) { CONFIG.PUNTAJE_SEGURO = valor; },
    getIngredientes: function() { return ingredientesDB; },
    getRules: function() { 
      return { minPuntajeAutoPlan: CONFIG.PUNTAJE_SEGURO, limiteCarbPorcion: CONFIG.LIMITE_CARB_NETOS_PORCION };
    }
  };
})();

if (typeof window !== 'undefined') {
  window.KetoInspector = KetoInspector;
  window.inspectorKeto = KetoInspector;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { KetoInspector.init(); });
  } else {
    KetoInspector.init();
  }
}

console.log('[KetoInspector] Módulo cargado');
