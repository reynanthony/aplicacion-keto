// ==================== SUPABASE KETO AI CLIENT ====================
// Cliente para Edge Functions de Supabase + OpenAI
// Versión: 2.1 - Con fallback

var KetoAI = (function() {
  'use strict';

  var ai = {
    supabase: null,
    functionsUrl: '',
    isOnline: false,

    init: function() {
      if (typeof window.supabase !== 'undefined' && window.supabase) {
        this.supabase = window.supabase;
        var url = this.supabase.supabaseUrl || window.SUPABASE_URL || '';
        this.functionsUrl = url + '/functions/v1/';
        console.log('[KetoAI] 🔄 Verificando conexión...');
        this.testConnection();
      } else {
        console.warn('[KetoAI] ❌ Supabase no disponible');
      }
      return this;
    },

    testConnection: async function() {
      try {
        if (!this.functionsUrl) {
          this.isOnline = false;
          return false;
        }
        
        var response = await fetch(this.functionsUrl + 'keto-ai', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': window.SUPABASE_ANON_KEY
          },
          body: JSON.stringify({ action: 'ping' })
        });
        
        this.isOnline = response.status !== 404 && response.status !== 0;
        if (this.isOnline) {
          console.log('[KetoAI] ✅ Conectado a Edge Functions');
        } else {
          console.warn('[KetoAI] ⚠️ Edge Function no disponible');
        }
        return this.isOnline;
      } catch(e) {
        console.warn('[KetoAI] ❌ Error de conexión:', e.message);
        this.isOnline = false;
        return false;
      }
    },

    callFunction: async function(action, data) {
      if (!this.isOnline) {
        console.log('[KetoAI] Modo offline - usando fallback');
        return this.getFallback(action, data);
      }

      try {
        var headers = {
          'Content-Type': 'application/json',
          'apikey': window.SUPABASE_ANON_KEY
        };

        var response = await fetch(this.functionsUrl + 'keto-ai', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ action: action, data: data })
        });

        if (!response.ok) {
          var error = await response.text();
          console.error('[KetoAI] Error:', response.status, error);
          this.isOnline = false;
          return this.getFallback(action, data);
        }

        return await response.json();
      } catch(e) {
        console.error('[KetoAI] Error:', e);
        this.isOnline = false;
        return this.getFallback(action, data);
      }
    },

    getEmbedding: async function(texto) {
      return await this.callFunction('get_embedding', { texto: texto });
    },

    generateRecipe: async function(opciones) {
      return await this.callFunction('generate_recipe', opciones);
    },

    detectCritical: async function(ingrediente) {
      return await this.callFunction('detect_critical', { ingrediente: ingrediente });
    },

    suggestSubstitute: async function(ingrediente, contexto, tipo) {
      return await this.callFunction('suggest_substitute', {
        ingrediente: ingrediente,
        contexto: contexto,
        tipo: tipo
      });
    },

    analyzeRecipe: async function(receta) {
      return await this.callFunction('analyze_recipe', { receta: receta });
    },

    getFallback: function(action, data) {
      switch(action) {
        case 'generate_recipe':
          return this.getFallbackRecipe(data);
        case 'detect_critical':
          return this.getFallbackDetection(data);
        case 'suggest_substitute':
          return this.getFallbackSubstitute(data);
        default:
          return null;
      }
    },

    getFallbackRecipe: function(opciones) {
      var mealType = opciones && opciones.mealType ? opciones.mealType : 'almuerzo';
      var macros = opciones && opciones.macrosObjetivo ? opciones.macrosObjetivo : { calories: 400, netCarbs: 8 };
      
      var recetas = this.getRecetasPredefinidas();
      var filtro = recetas.filter(function(r) { return r.mealType === mealType; });
      var disponibles = filtro.length > 0 ? filtro : recetas;
      
      var receta = disponibles[Math.floor(Math.random() * disponibles.length)];
      
      return {
        success: true,
        receta: {
          nombre: receta.nombre,
          mealType: receta.mealType,
          ingredientes: receta.ingredientes,
          instrucciones: receta.instrucciones,
          tiempoPrep: receta.tiempoPrep,
          dificultad: receta.dificultad,
          porciones: receta.porciones,
          macrosPorcion: {
            calories: macros.calories,
            netCarbs: macros.netCarbs,
            protein: Math.round(macros.calories * 0.25 / 4),
            fat: Math.round(macros.calories * 0.70 / 9)
          },
          tips: receta.tips,
          source: 'fallback'
        }
      };
    },

    getFallbackDetection: function(data) {
      var ingrediente = (data && data.ingrediente ? data.ingrediente : '').toLowerCase();
      var criticos = ['arroz', 'pasta', 'pan', 'papa', 'azucar', 'avena', 'frijoles', 'lentejas', 'platano', 'mango'];
      var moderados = ['zanahoria', 'remolacha', 'cebolla', 'tomate', 'manzana', 'naranja'];
      
      var esCritico = criticos.some(function(c) { return ingrediente.indexOf(c) >= 0; });
      var esModerado = moderados.some(function(c) { return ingrediente.indexOf(c) >= 0; });
      
      return {
        esCritico: esCritico,
        nivel: esCritico ? 'critico' : (esModerado ? 'moderado' : 'seguro'),
        carbsNetos100g: esCritico ? 25 : (esModerado ? 7 : 2),
        motivo: esCritico ? 'Alto en carbohidratos' : (esModerado ? 'Moderado en carbs' : 'Bajo en carbohidratos'),
        alternativas: esCritico ? ['coliflor', 'nabo', 'calabacin'] : []
      };
    },

    getFallbackSubstitute: function(data) {
      var ingrediente = (data && data.ingrediente ? data.ingrediente : '').toLowerCase();
      var sust = {
        'arroz': { nombre: 'coliflor', proporcion: '1:1', notas: 'Textura similar' },
        'pasta': { nombre: 'calabacin', proporcion: '1:1', notas: 'Fideos de calabacin' },
        'papa': { nombre: 'nabo', proporcion: '1:1', notas: 'Bajo en carbs' },
        'pan': { nombre: 'pan keto', proporcion: '1:1', notas: 'Hecho con almendra' },
        'azucar': { nombre: 'eritritol', proporcion: '1:1', notas: 'Sin carbs' }
      };
      
      var keys = Object.keys(sust);
      for (var i = 0; i < keys.length; i++) {
        if (ingrediente.indexOf(keys[i]) >= 0) {
          return {
            original: ingrediente,
            alternativas: [sust[keys[i]], { nombre: 'nabo', proporcion: '1:1', notas: 'Opción baja en carbs' }]
          };
        }
      }
      
      return {
        original: ingrediente,
        alternativas: [
          { nombre: 'coliflor', proporcion: '1:1', notas: 'Versátil y bajo en carbs' },
          { nombre: 'calabacin', proporcion: '1:1', notas: 'Textura ligera' }
        ]
      };
    },

    getRecetasPredefinidas: function() {
      return [
        {
          nombre: 'Huevos Revueltos con Espinacas',
          mealType: 'desayuno',
          ingredientes: [
            { nombre: 'huevos', cantidad: '3 unidades' },
            { nombre: 'espinacas', cantidad: '100g' },
            { nombre: 'mantequilla', cantidad: '15g' },
            { nombre: 'sal', cantidad: 'al gusto' },
            { nombre: 'pimienta', cantidad: 'al gusto' }
          ],
          instrucciones: [
            'Calienta la mantequilla en una sartén a fuego medio',
            'Bate los huevos y viértelos en la sartén',
            'Agrega las espinacas y revuelve suavemente',
            'Cocina por 3-4 minutos hasta que los huevos estén hechos',
            'Sazona con sal y pimienta'
          ],
          tiempoPrep: 10,
          dificultad: 'fácil',
          porciones: 1,
          tips: ['Usa huevos orgánicos para mejor sabor', 'Añade queso feta para más proteína']
        },
        {
          nombre: 'Pollo al Horno con Brócoli',
          mealType: 'almuerzo',
          ingredientes: [
            { nombre: 'pechuga de pollo', cantidad: '200g' },
            { nombre: 'brócoli', cantidad: '150g' },
            { nombre: 'aceite de oliva', cantidad: '20g' },
            { nombre: 'ajo', cantidad: '2 dientes' },
            { nombre: 'romero', cantidad: '5g' },
            { nombre: 'sal', cantidad: 'al gusto' }
          ],
          instrucciones: [
            'Precalienta el horno a 200°C',
            'Coloca el pollo en una bandeja para horno',
            'Rocía con aceite de oliva y añade el ajo picado',
            'Agrega el romero y la sal',
            'Hornea por 25 minutos',
            'Añade el brócoli y hornea 10 minutos más'
          ],
          tiempoPrep: 40,
          dificultad: 'fácil',
          porciones: 1,
          tips: ['Marina el pollo 30 min antes para más sabor', 'El brócoli queda crujiente así']
        },
        {
          nombre: 'Salmón con Espárragos',
          mealType: 'cena',
          ingredientes: [
            { nombre: 'filete de salmón', cantidad: '180g' },
            { nombre: 'espárragos', cantidad: '100g' },
            { nombre: 'limón', cantidad: '1/2 unidad' },
            { nombre: 'mantequilla', cantidad: '15g' },
            { nombre: 'eneldo', cantidad: '5g' },
            { nombre: 'sal', cantidad: 'al gusto' }
          ],
          instrucciones: [
            'Precalienta el horno a 190°C',
            'Coloca el salmón en una bandeja con papel aluminio',
            'Coloca los espárragos alrededor',
            'Añade mantequilla en cubitos sobre el salmón',
            'Exprime el limón y espolvorea el eneldo',
            'Hornea por 15-18 minutos'
          ],
          tiempoPrep: 25,
          dificultad: 'fácil',
          porciones: 1,
          tips: ['No cocines de más o queda seco', 'El salmón queda jugoso en 15 min']
        },
        {
          nombre: 'Bolas de Queso con Almendras',
          mealType: 'snacks',
          ingredientes: [
            { nombre: 'queso cheddar', cantidad: '80g' },
            { nombre: 'almendras', cantidad: '30g' },
            { nombre: 'mantequilla', cantidad: '15g' }
          ],
          instrucciones: [
            'Forma bolitas con el queso cheddar',
            'Envuelve cada bolita en almendras picadas',
            'Refrigera por 30 minutos',
            'Sirve con mantequilla si deseas'
          ],
          tiempoPrep: 15,
          dificultad: 'fácil',
          porciones: 2,
          tips: ['Usa queso frío para que sea más fácil formar las bolas']
        },
        {
          nombre: 'Tortilla de Queso y Aguacate',
          mealType: 'desayuno',
          ingredientes: [
            { nombre: 'huevos', cantidad: '3 unidades' },
            { nombre: 'queso mozzarella', cantidad: '50g' },
            { nombre: 'aguacate', cantidad: '1/2 unidad' },
            { nombre: 'sal', cantidad: 'al gusto' },
            { nombre: 'pimienta', cantidad: 'al gusto' }
          ],
          instrucciones: [
            'Bate los huevos con sal y pimienta',
            'Vierte en una sartén antiadherente caliente',
            'Cuando empiece a cuajar, añade el queso',
            'Dobla la tortilla por la mitad',
            'Sirve con rodajas de aguacate'
          ],
          tiempoPrep: 10,
          dificultad: 'fácil',
          porciones: 1,
          tips: ['El aguacate debe estar maduro', 'Añade sambal para más sabor']
        },
        {
          nombre: 'Ensalada César Keto',
          mealType: 'almuerzo',
          ingredientes: [
            { nombre: 'lechuga romana', cantidad: '150g' },
            { nombre: 'pollo a la plancha', cantidad: '150g' },
            { nombre: 'queso parmesano', cantidad: '30g' },
            { nombre: 'tocino', cantidad: '50g' },
            { nombre: 'aguacate', cantidad: '50g' },
            { nombre: 'aceite de oliva', cantidad: '15g' }
          ],
          instrucciones: [
            'Corta la lechuga en tiras',
            'Cocina el pollo y córtalo en tiras',
            'Fríe el tocino hasta que esté crujiente',
            'Mezcla todos los ingredientes',
            'Rocía con aceite de oliva',
            'Añade el parmesano rallado'
          ],
          tiempoPrep: 20,
          dificultad: 'fácil',
          porciones: 1,
          tips: ['La versión sin crutones es igual de deliciosa']
        },
        {
          nombre: 'Bistec con Coliflor',
          mealType: 'cena',
          ingredientes: [
            { nombre: 'bistec', cantidad: '200g' },
            { nombre: 'coliflor', cantidad: '200g' },
            { nombre: 'mantequilla', cantidad: '20g' },
            { nombre: 'ajo', cantidad: '3 dientes' },
            { nombre: 'romero', cantidad: '5g' },
            { nombre: 'sal', cantidad: 'al gusto' }
          ],
          instrucciones: [
            'Sazona el bistec con sal y romero',
            'Cocina a la plancha 4 min por lado',
            'Deja reposar 5 minutos',
            'Prepara el puré de coliflor: cocina y tritura con mantequilla',
            'Sirve el bistec sobre el puré'
          ],
          tiempoPrep: 25,
          dificultad: 'media',
          porciones: 1,
          tips: ['El puré de coliflor es más ligero que el de papa']
        },
        {
          nombre: 'Huevo Relleno con Atún',
          mealType: 'snacks',
          ingredientes: [
            { nombre: 'huevos', cantidad: '3 unidades' },
            { nombre: 'atún', cantidad: '80g' },
            { nombre: 'mayonesa', cantidad: '20g' },
            { nombre: 'mostaza', cantidad: '5g' },
            { nombre: 'perejil', cantidad: '5g' }
          ],
          instrucciones: [
            'Cocina los huevos 10 minutos',
            'Pélalos y córtalos por la mitad',
            'Mezcla las yemas con atún, mayonesa y mostaza',
            'Rellena las mitades de huevo',
            'Espolvorea con perejil'
          ],
          tiempoPrep: 20,
          dificultad: 'fácil',
          porciones: 2,
          tips: ['Perfecto para llevar al trabajo']
        }
      ];
    },

    generarRecetaKeto: async function(mealType, macrosObjetivo) {
      var perfil = window.UserLearning ? window.UserLearning.generarPerfilUsuario() : null;
      var evitados = perfil && perfil.ingredientesEvitados ? perfil.ingredientesEvitados.map(function(i) { return i.nombre; }) : [];
      var prefs = perfil ? {
        nivel: perfil.nivelExperiencia,
        favoritos: (perfil.ingredientesFavoritos || []).slice(0, 3).map(function(i) { return i.nombre; })
      } : {};

      var resultado = await this.generateRecipe({
        mealType: mealType,
        macrosObjetivo: macrosObjetivo || {
          calories: 450,
          netCarbs: 8,
          protein: 30,
          fat: 35
        },
        preferencias: prefs,
        evitar: evitados
      });

      if (resultado && resultado.success && resultado.receta) {
        return resultado.receta;
      }

      console.log('[KetoAI] Usando receta predefinida');
      var fallback = this.getFallback({ mealType: mealType, macrosObjetivo: macrosObjetivo });
      return fallback.receta;
    },

    isAvailable: function() {
      return this.isOnline;
    },

    getStatus: function() {
      return {
        online: this.isOnline,
        functionsUrl: this.functionsUrl
      };
    }
  };

  return ai;
})();

if (typeof window !== 'undefined') {
  window.KetoAI = KetoAI.init();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KetoAI;
}
