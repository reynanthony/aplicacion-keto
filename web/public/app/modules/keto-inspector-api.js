/*
 * Keto Inspector API local
 * Simula endpoints REST para el proyecto frontend sin backend dedicado.
 */
(function (globalScope) {
  'use strict';

  function ensureInspector() {
    if (!globalScope.inspectorKeto) {
      throw new Error('inspectorKeto no esta disponible. Carga modules/inspectorKeto.js primero.');
    }
    return globalScope.inspectorKeto;
  }

  async function request(path, payload) {
    var inspector = ensureInspector();
    var body = payload || {};

    switch (path) {
      case '/inspeccionar/receta':
        return {
          ok: true,
          path: path,
          data: inspector.inspeccionarReceta(body.receta || body, body.baseIngredientes, body.options)
        };

      case '/inspeccionar/despensa':
        return {
          ok: true,
          path: path,
          data: inspector.inspeccionarDespensa(body.despensa || body, body.foodsCatalog, body.options)
        };

      case '/inspeccionar/producto':
        return {
          ok: true,
          path: path,
          data: inspector.inspeccionarProductoTexto(body.texto || body.nombre || '', body.options)
        };

      default:
        return {
          ok: false,
          path: path,
          error: 'Endpoint no soportado: ' + path
        };
    }
  }

  var api = {
    request: request,
    post: request,

    inspeccionarReceta: function (receta, baseIngredientes, options) {
      return request('/inspeccionar/receta', {
        receta: receta,
        baseIngredientes: baseIngredientes,
        options: options
      });
    },

    inspeccionarDespensa: function (despensa, foodsCatalog, options) {
      return request('/inspeccionar/despensa', {
        despensa: despensa,
        foodsCatalog: foodsCatalog,
        options: options
      });
    },

    inspeccionarProducto: function (texto, options) {
      return request('/inspeccionar/producto', {
        texto: texto,
        options: options
      });
    }
  };

  globalScope.ketoInspectorApi = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
