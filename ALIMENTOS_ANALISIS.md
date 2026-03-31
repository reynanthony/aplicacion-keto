# Reporte Ejecutivo: Módulo Alimentos

## Estado Actual

**Funcionalidades implementadas:**
- Base de datos local con 45 alimentos predefinidos
- CRUD completo (crear, leer, actualizar, eliminar)
- Búsqueda por nombre + filtro por categoría
- Búsqueda online via API USDA
- Vista detail con macros
- Diseño responsive (mobile + desktop)
- Guardado en localStorage

**Tech debt / Issues:**
- Unidades definidas pero no utilizadas en la UI
- No hay forma de agregar alimento a plan/compras desde alimentos
- Filtros no persisten en URL
- Sin exportación/importación de alimentos personalizados
- Guía Keto es estática, no configurable

---

## Mejoras de Alto Valor

### 1. ⭐⭐⭐ Agregar a Plan / Compras desde Alimentos
**Valor: Alto** | **Esfuerzo: Bajo**

Desde el modal de detalle, permitir:
- "Agregar al plan del día" → selecciona comida y cantidad
- "Agregar a lista de compras"

```javascript
// En detailModal, agregar botones:
// <button onclick="addToPlan()">Agregar al plan</button>
// <button onclick="addToShoppingList()">Agregar a compras</button>
```

**Impacto:** Conecta alimentos con otras funciones del app, flujo más fluido.

---

### 2. ⭐⭐⭐ Conversor de Porciones
**Valor: Alto** | **Esfuerzo: Medio**

Los alimentos tienen `units` definidos (gramos, libras, unidades, etc.) pero no se usan.

Implementar selector de unidad en detail modal:
- Mostrar selector: "100g" → cambiar a "2 unidades"
- Recalcular macros automáticamente

```javascript
// Función ejemplo
function convertUnit(food, newUnitName) {
  const newUnit = food.units.find(u => u.name === newUnitName);
  if (!newUnit) return;
  const ratio = newUnit.grams / food.portion;
  return {
    portion: newUnit.name,
    calories: Math.round(food.calories * ratio),
    protein: (food.protein * ratio).toFixed(1),
    fat: (food.fat * ratio).toFixed(1),
    carbs: (food.carbs * ratio).toFixed(1)
  };
}
```

**Impacto:** Usabilidad muy mejorada, especialmente para usuarios que piensan en "1 huevo" vs "50g".

---

### 3. ⭐⭐⭐ Favoritos / Alimentos Frecuentes
**Valor: Alto** | **Esfuerzo: Bajo**

- Agregar estrella ⭐ a cada alimento
- Filtrar por "Favoritos" 
- Mostrar alimentos más usados en顶部

```javascript
// En currentFoods, agregar campo:
// {id: "f1", name: "Huevos", favorite: true, useCount: 15}

// Botón en detail modal:
<button onclick="toggleFavorite()" class="material-symbols-outlined">
  favorite
</button>
```

**Impacto:** Acceso rápido a alimentos del día a día.

---

### 4. ⭐⭐ Exportar/Importar Alimentos
**Valor: Medio** | **Esfuerzo: Bajo**

- Botón "Exportar" → descarga JSON con foods personalizados
- Botón "Importar" → carga JSON

```javascript
function exportCustomFoods() {
  const custom = currentFoods.filter(f => !defaultFoods.find(d => d.id === f.id));
  const blob = new Blob([JSON.stringify(custom, null, 2)], {type: 'application/json'});
  // download...
}

function importFoods(file) {
  // parse and merge...
}
```

**Impacto:** Backup de datos, compartir alimentos entre usuarios.

---

### 5. ⭐⭐ Ordenar por Macro Relevante
**Valor: Medio** | **Esfuerzo: Bajo**

- Ordenar por: Más proteína, Más grasa, Menos carbs, Más calorías
- Selector junto a filtros actuales

```html
<select id="sortBy" onchange="renderFoods()">
  <option value="name">Nombre</option>
  <option value="protein">Más proteína</option>
  <option value="carbs">Menos carbs</option>
</select>
```

---

### 6. ⭐ Indicador visual de keto-friendliness
**Valor: Bajo** | **Esfuerzo: Medio**

- Calcular "keto-score" basado en ratio grasa/proteína/carbs
- Mostrar badge: 🟢 Excelente / 🟡 Aceptable / 🔴 Evitar
- Aplicar a alimentos de la API online también

---

## Recomendación Prioritaria

**Iniciar por:**
1. Agregar a Plan/Compras (conecta módulos)
2. Favoritos (uso diario)
3. Conversor de porciones (problema real del usuario)

Estas 3 mejoras tienen alto impacto con esfuerzo bajo/medio.
