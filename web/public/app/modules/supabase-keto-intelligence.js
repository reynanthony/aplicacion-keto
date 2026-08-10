// ==================== SUPABASE KETO INTELLIGENCE MODULE ====================
// Sistema keto inteligente usando Supabase como backend
// Versión: 2.3 - Con fallback offline

var KetoSupabaseEngine = (function() {
  'use strict';

  var engine = {
    supabase: null,
    initialized: false,
    userId: null,
    isOnline: false,
    localFallback: {
      feedback: [],
      planes: [],
      perfil: null
    },

    init: function() {
      var self = this;

      this.loadLocalData();

      try {
        if (localStorage.getItem('ketocore_demo_mode') === '1') {
          console.log('[KetoSupabase] Modo demo — omitiendo conexión a Supabase');
          this.initialized = true;
          return this;
        }
      } catch (e) {}

      if (typeof window.supabase !== 'undefined' && window.supabase) {
        this.supabase = window.supabase;
        this.initialized = true;
        console.log('[KetoSupabase] 🔄 Verificando conexión...');
        
        this.testConnection().then(function(connected) {
          if (connected) {
            self.isOnline = true;
            console.log('[KetoSupabase] ✅ Conectado a Supabase');
            self.getCurrentUser();
            self.sincronizarDesdeNube();
          } else {
            self.isOnline = false;
            console.log('[KetoSupabase] ⚠️ Modo offline (Supabase no disponible)');
          }
        });
      } else {
        console.warn('[KetoSupabase] ❌ SDK de Supabase no encontrado - modo offline');
        this.initialized = true;
      }
      
      return this;
    },

    loadLocalData: function() {
      try {
        var stored = localStorage.getItem('keto_supabase_local');
        if (stored) {
          this.localFallback = JSON.parse(stored);
        }
      } catch(e) {
        console.error('[KetoSupabase] Error cargando datos locales:', e);
      }
    },

    saveLocalData: function() {
      try {
        localStorage.setItem('keto_supabase_local', JSON.stringify(this.localFallback));
      } catch(e) {
        console.error('[KetoSupabase] Error guardando datos locales:', e);
      }
    },

    testConnection: async function() {
      try {
        if (!this.supabase) return false;
        var tables = ['ingredientes', 'keto_feedback', 'keto_planes_semanales'];
        for (var t = 0; t < tables.length; t++) {
          try {
            var { error } = await this.supabase.from(tables[t]).select('count', { count: 'exact', head: true });
            if (!error) return true;
          } catch(e) {}
        }
        return false;
      } catch(e) {
        return false;
      }
    },

    getCurrentUser: async function() {
      if (this.supabase && this.isOnline) {
        try {
          var user = await this.supabase.auth.getUser();
          this.userId = user.data ? user.data.user ? user.data.user.id : null : null;
          console.log('[KetoSupabase] Usuario:', this.userId || 'no autenticado');
          return this.userId;
        } catch(e) {
          console.error('[KetoSupabase] Error:', e);
          return null;
        }
      }
      return this.localFallback.userId || null;
    },

    guardarFeedback: async function(tipo, datos) {
      var feedback = {
        tipo: tipo,
        data: datos,
        created_at: new Date().toISOString()
      };

      this.localFallback.feedback.push(feedback);
      this.saveLocalData();

      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            feedback.user_id = userId;
            await this.supabase.from('keto_feedback').insert(feedback);
            console.log('[KetoSupabase] Feedback sincronizado');
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error sincronizando feedback:', e);
        }
      }

      return feedback;
    },

    obtenerFeedback: async function(limit) {
      limit = limit || 100;
      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            var result = await this.supabase
              .from('keto_feedback')
              .select('*')
              .eq('user_id', userId)
              .order('created_at', { ascending: false })
              .limit(limit);
            if (!result.error && result.data) {
              return result.data;
            }
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error obteniendo feedback:', e);
        }
      }
      return this.localFallback.feedback.slice(-limit);
    },

    guardarPerfil: async function(perfil) {
      this.localFallback.perfil = perfil;
      this.saveLocalData();

      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            await this.supabase.from('keto_perfil_usuario').upsert({
              user_id: userId,
              nivel_experiencia: perfil.nivelExperiencia || 'nuevo',
              ingredientes_favoritos: perfil.ingredientesFavoritos || [],
              ingredientes_evitados: perfil.ingredientesEvitados || [],
              macros_preferidos: perfil.macrosPreferidos || {},
              preferencias_dieteticas: perfil.preferencias || {},
              actualizado_el: new Date().toISOString()
            });
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error guardando perfil:', e);
        }
      }
    },

    obtenerPerfil: async function() {
      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            var result = await this.supabase
              .from('keto_perfil_usuario')
              .select('*')
              .eq('user_id', userId)
              .single();
            if (!result.error && result.data) {
              return {
                nivelExperiencia: result.data.nivel_experiencia,
                ingredientesFavoritos: result.data.ingredientes_favoritos || [],
                ingredientesEvitados: result.data.ingredientes_evitados || [],
                macrosPreferidos: result.data.macros_preferidos || {}
              };
            }
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error obteniendo perfil:', e);
        }
      }
      return this.localFallback.perfil;
    },

    guardarPlan: async function(plan) {
      this.localFallback.planes.push({
        plan: plan,
        sincronizado: false,
        created_at: new Date().toISOString()
      });
      this.saveLocalData();

      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            await this.supabase.from('keto_planes_semanales').insert({
              user_id: userId,
              nombre: plan.nombre || 'Plan ' + new Date().toLocaleDateString(),
              plan: plan,
              dias: plan.dias || 7,
              macros_objetivo: plan.macrosObjetivo || {},
              confirmado: false
            });
            console.log('[KetoSupabase] Plan sincronizado');
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error guardando plan:', e);
        }
      }
    },

    obtenerPlanes: async function(limit) {
      limit = limit || 10;
      if (this.isOnline && this.supabase) {
        try {
          var userId = await this.getCurrentUser();
          if (userId) {
            var result = await this.supabase
              .from('keto_planes_semanales')
              .select('*')
              .eq('user_id', userId)
              .order('generado_el', { ascending: false })
              .limit(limit);
            if (!result.error && result.data) {
              return result.data;
            }
          }
        } catch(e) {
          console.warn('[KetoSupabase] Error obteniendo planes:', e);
        }
      }
      return this.localFallback.planes.slice(-limit);
    },

    sincronizarDesdeNube: async function() {
      if (!this.isOnline) return;
      try {
        var pendientes = this.localFallback.feedback.filter(function(f) { return !f.sincronizado; });
        for (var i = 0; i < pendientes.length; i++) {
          var f = pendientes[i];
          var userId = await this.getCurrentUser();
          if (userId) {
            f.user_id = userId;
            f.sincronizado = true;
            await this.supabase.from('keto_feedback').insert(f);
          }
        }
        console.log('[KetoSupabase] Sincronización completa');
      } catch(e) {
        console.error('[KetoSupabase] Error en sincronización:', e);
      }
    },

    buscarSustitutoLocal: function(ingrediente) {
      var sustitutos = {
        'arroz': ['coliflor', 'nabo', 'arroz de calabacin'],
        'pasta': ['calabacin', 'fideos konjac', 'coliflor'],
        'papa': ['nabo', 'calabacin', 'coliflor'],
        'pan': ['pan keto', 'torta de almendra'],
        'avena': ['semillas chia', 'harina de coco'],
        'frijoles': ['edamame', 'tofu'],
        'azucar': ['eritritol', 'stevia', 'monk fruit'],
        'miel': ['eritritol', 'stevia'],
        'leche': ['leche de coco', 'leche de almendra']
      };

      var ingLower = (ingrediente || '').toLowerCase();
      var keys = Object.keys(sustitutos);
      
      for (var i = 0; i < keys.length; i++) {
        if (ingLower.indexOf(keys[i]) >= 0) {
          return sustitutos[keys[i]].map(function(s) {
            return { nombre: s, categoria: 'sustituto', similitud: 0.9 };
          });
        }
      }

      return [];
    },

    buscarSustitutoVectorial: async function(ingrediente, limit) {
      limit = limit || 5;
      if (!this.isOnline || !this.supabase) {
        console.log('[KetoSupabase] Búsqueda offline - usando alternativa local');
        return this.buscarSustitutoLocal(ingrediente);
      }

      try {
        var result = await this.supabase.rpc('buscar_sustituto_keto', {
          texto_busqueda: ingrediente,
          match_count: limit
        });
        if (!result.error && result.data && result.data.length > 0) {
          return result.data;
        }
      } catch(e) {
        console.warn('[KetoSupabase] Error búsqueda vectorial:', e);
      }

      return this.buscarSustitutoLocal(ingrediente);
    },

    buscarRecetaSimilar: async function(nombreReceta, limit) {
      limit = limit || 3;
      if (!this.isOnline || !this.supabase) {
        console.log('[KetoSupabase] Búsqueda offline');
        return [];
      }

      try {
        var result = await this.supabase.rpc('buscar_receta_similar', {
          texto_busqueda: nombreReceta,
          match_count: limit
        });
        if (!result.error && result.data) {
          return result.data;
        }
      } catch(e) {
        console.warn('[KetoSupabase] Error:', e);
      }

      return [];
    },

    isAvailable: function() {
      return this.isOnline;
    },

    getStatus: function() {
      return {
        online: this.isOnline,
        userId: this.userId,
        localFeedbackCount: this.localFallback.feedback.length,
        localPlanesCount: this.localFallback.planes.length
      };
    },

    clearLocalData: function() {
      this.localFallback = {
        feedback: [],
        planes: [],
        perfil: null
      };
      localStorage.removeItem('keto_supabase_local');
      console.log('[KetoSupabase] Datos locales limpiados');
    }
  };

  return engine;
})();

if (typeof window !== 'undefined') {
  window.KetoSupabase = KetoSupabaseEngine.init();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KetoSupabaseEngine;
}
