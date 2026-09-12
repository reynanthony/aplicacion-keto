# Inspector Keto - Integracion

## 1) Archivos generados

- Base JSON completa (189 ingredientes nuevos): `data/keto-inspector-ingredientes.json`
- Seed JS para frontend: `data/keto-inspector-ingredientes.js`
- Migracion SQL (tabla `ingredientes` + carga + compatibilidad con `alimentos`): `migrations/2026-04-09-inspector-keto.sql`
- Motor principal: `modules/inspectorKeto.js`
- Endpoints locales: `modules/keto-inspector-api.js`
- UI reusable: `modules/keto-inspector-ui.js`
- Integracion Recetas (modo manual): `modules/keto-inspector-recetas-integration.js`
- Integracion Scanner (texto de etiqueta): `modules/keto-inspector-scanner-integration.js`

## 2) Que se integro en la app

### Despensa (`compras.html`, `compras.js`)

- Al abrir modal "Agregar a Despensa", se muestra nivel de riesgo (`CRITICO`, `MODERADO`, `SEGURO`).
- Si el alimento es `CRITICO`, al confirmar aparece advertencia con sugerencia keto y confirmacion explicita.
- En la lista de "Selecciona alimentos" se muestra badge de riesgo por alimento.

### Generador automatico (`modules/auto-meal-generator.js`, `plan.html`)

- Cada receta disponible se inspecciona con `inspectorKeto.inspeccionarReceta(...)`.
- Regla aplicada: solo pasan recetas con `puntaje_keto > umbral` (default 70, configurable por reglas).
- Si la despensa contiene solo ingredientes criticos: el generador detiene plan y devuelve compras prioritarias.
- `plan.html` ahora muestra estado especifico para:
  - despensa vacia
  - despensa solo critica
  - recetas filtradas por Inspector Keto

### Generador manual (`recetas.html`)

- Antes de agregar receta al plan, se muestra modal con reporte del Inspector Keto.
- Botones:
  - `Usar original`
  - `Aceptar version optimizada`
- Si se elige optimizada, la receta se guarda en el plan con marca `(Optimizada)` y metadata `ketoInspector`.

### Escaner (`scanner.html`)

- Se agrega clasificacion por texto de producto (simulacion etiqueta/codigo): riesgo + coincidencias.

## 3) Endpoints locales disponibles

El proyecto no usa backend dedicado para esto; se implemento API local en cliente:

- `POST /inspeccionar/receta`
- `POST /inspeccionar/despensa`
- `POST /inspeccionar/producto`

Uso:

```javascript
const result = await window.ketoInspectorApi.post('/inspeccionar/receta', {
  receta: {
    id: '123',
    title: 'Pastel de zanahoria',
    porciones: 8,
    ingredients: ['150g harina de trigo', '100g zanahoria']
  }
});

console.log(result.data.puntaje_keto);
```

## 4) Funcion principal (`inspectorKeto.js`)

### Firma principal

```javascript
window.inspectorKeto.inspeccionarReceta(receta, baseIngredientesOpcional, opcionesOpcional)
```

### Salida principal

```json
{
  "receta_id": "123",
  "nombre_original": "Pastel de zanahoria",
  "puntaje_keto": 25,
  "nivel_seguridad": "riesgo_alto",
  "ingredientes_analizados": [],
  "total_carbohidratos_netos_receta": 118.5,
  "carbohidratos_netos_por_porcion": 14.8,
  "porcion_sugerida": "1/8 de la receta (14.8g netos, excede limite diario)",
  "receta_optimizada": {}
}
```

### Extras incluidos

- Historial por usuario (`localStorage`, clave `ketoInspectorHistory_<userId>`).
- Reglas configurables (`ketoInspectorRules`), incluyendo umbral del generador automatico.
- Inspeccion de despensa y texto de producto.

## 5) Migracion SQL

Ejecutar en Supabase/PostgreSQL:

1. `migrations/2026-04-09-inspector-keto.sql`
2. Verificar tabla creada: `public.ingredientes`
3. Verificar carga: `SELECT COUNT(*) FROM public.ingredientes;`
4. Verificar merge con alimentos legacy: `SELECT COUNT(*) FROM public.ingredientes WHERE tags::text LIKE '%seguro_default%';`

## 6) Mockup textual del Inspector en UI

### Modal de receta (Manual)

- Header: `Reporte del Inspector Keto`
- Card resumen:
  - Nombre receta
  - Puntaje keto (0-100)
  - Carbs netos receta
  - Carbs por porcion
  - Mensaje de porcion sugerida
- Lista de ingredientes:
  - Nombre
  - Badge de riesgo
  - Carbs estimados
  - Sugerencia de sustitucion
- Bloque verde: `Version optimizada`
- Footer acciones:
  - `Usar original`
  - `Aceptar version optimizada`

### Modal de agregar alimento a despensa

- Debajo del nombre del alimento:
  - Badge de riesgo
  - Carbs netos estimados para la cantidad seleccionada
  - Sugerencia keto (si aplica)
- Si riesgo critico al confirmar:
  - Dialogo de advertencia no alarmista + opcion de continuar.

## 7) Restricciones cumplidas

- No se eliminaron ni modificaron los 109 alimentos existentes.
- Se marcaron como seguros por defecto para analisis (via migracion + fallback de motor).
- Analisis basado en carbohidratos netos.
- Plato seguro si porcion < 10g netos (regla configurable).
- Alternativas keto enfocadas a opciones de supermercado comun.

## 8) Ejemplo de integracion con generador de planes

```javascript
// En auto-meal-generator.js (ya aplicado)
var ketoFilter = filterRecipesByKetoScore(availability.available);
availability.available = ketoFilter.accepted;

if (Object.keys(availability.available).length === 0) {
  return {
    success: false,
    error: 'No hay recetas con puntaje keto mayor al umbral configurado.',
    ketoThreshold: ketoFilter.threshold,
    rejectedByInspector: ketoFilter.rejected
  };
}
```
