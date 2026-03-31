// ==================== FOOD API - KetoLab ====================
// API de USDA FoodData Central (gratuita)
// Documentación: https://fdc.nal.usda.gov/api-guide.html

const FOOD_API_BASE = 'https://api.nal.usda.gov/fdc/v1';

// Obtener API key desde localStorage o usar demo
var USDA_API_KEY = (function() {
  var savedKey = localStorage.getItem('usda_api_key');
  if (savedKey && savedKey.trim() && savedKey !== 'DEMO_KEY') {
    return savedKey.trim();
  }
  return 'DEMO_KEY';
})();

// Cache local de búsquedas
var foodSearchCache = {};

// Función para configurar API key
function configureUSDAKey() {
  var newKey = prompt('Ingresa tu API key de USDA FoodData Central:\n(Regístrate gratis en https://fdc.nal.usda.gov/api-guide.html)');
  if (newKey && newKey.trim()) {
    localStorage.setItem('usda_api_key', newKey.trim());
    window.USDA_API_KEY = newKey.trim();
    showToast('API key guardada correctamente');
  }
}

// Obtener datos desde la API del USDA
async function searchFoodsOnline(query, limit = 10) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  var cacheKey = query.toLowerCase().trim();
  if (foodSearchCache[cacheKey]) {
    console.log('[FoodAPI] Usando cache para:', query);
    return foodSearchCache[cacheKey];
  }
  
  try {
    var url = FOOD_API_BASE + '/foods/search?query=' + encodeURIComponent(query) + '&pageSize=' + limit + '&dataType=Foundation,SR Legacy,Branded&api_key=' + USDA_API_KEY + '';
    
    var response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }
    
    var data = await response.json();
    
    var results = data.foods || [];
    
    // Transformar al formato de KetoLab
    var formatted = results.map(function(food) {
      return {
        id: 'usda_' + food.fdcId,
        name: food.description,
        portion: 100,
        calories: getNutrientValue(food, 1008) || 0,  // Energy (kcal)
        protein: getNutrientValue(food, 1003) || 0,   // Protein
        fat: getNutrientValue(food, 1004) || 0,       // Total lipid (fat)
        carbs: getNutrientValue(food, 1005) || 0,     // Carbohydrate
        category: mapFoodCategory(food.foodCategory),
        brand: food.brandOwner || food.brandName || null,
        fdcId: food.fdcId,
        servings: food.servings || null
      };
    }).filter(function(f) {
      return f.calories > 0;
    });
    
    // Guardar en cache
    foodSearchCache[cacheKey] = formatted;
    
    console.log('[FoodAPI] Encontrados:', formatted.length, 'alimentos para:', query);
    return formatted;
    
  } catch (error) {
    console.error('[FoodAPI] Error:', error);
    return [];
  }
}

// Obtener valor de nutriente por ID
function getNutrientValue(food, nutrientId) {
  if (!food.foodNutrients) return null;
  
  var nutrient = food.foodNutrients.find(function(n) {
    return n.nutrientId === nutrientId || n.number === nutrientId;
  });
  
  return nutrient ? nutrient.value : null;
}

// Mapear categoría del USDA a categorías de KetoLab
function mapFoodCategory(usdaCategory) {
  if (!usdaCategory) return 'Otros';
  
  var cat = usdaCategory.toLowerCase();
  
  if (cat.includes('meat') || cat.includes('poultry') || cat.includes('fish') || cat.includes('egg')) {
    return 'Proteínas';
  }
  if (cat.includes('dairy') || cat.includes('cheese') || cat.includes('milk') || cat.includes('yogurt')) {
    return 'Lácteos';
  }
  if (cat.includes('vegetable') || cat.includes('legume')) {
    return 'Verduras';
  }
  if (cat.includes('fat') || cat.includes('oil') || cat.includes('butter') || cat.includes('lard')) {
    return 'Grasas';
  }
  if (cat.includes('nut') || cat.includes('seed')) {
    return 'Frutos secos';
  }
  if (cat.includes('fruit')) {
    return 'Frutas';
  }
  if (cat.includes('beverage') || cat.includes('coffee') || cat.includes('tea')) {
    return 'Otros';
  }
  
  return 'Otros';
}

// Obtener detalle de un alimento por ID
async function getFoodDetail(fdcId) {
  try {
    var url = FOOD_API_BASE + '/food/' + fdcId + '?api_key=DEMO_KEY';
    
    var response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }
    
    var food = await response.json();
    
    return {
      id: 'usda_' + food.fdcId,
      name: food.description,
      portion: 100,
      calories: getNutrientValue(food, 1008) || 0,
      protein: getNutrientValue(food, 1003) || 0,
      fat: getNutrientValue(food, 1004) || 0,
      carbs: getNutrientValue(food, 1005) || 0,
      category: mapFoodCategory(food.foodCategory),
      brand: food.brandOwner || null,
      fdcId: food.fdcId,
      nutrients: food.foodNutrients || [],
      servingSizes: food.servingSizes || []
    };
    
  } catch (error) {
    console.error('[FoodAPI] Error obteniendo detalle:', error);
    return null;
  }
}

// Agregar alimento de la API a la base de datos local
function addFoodFromAPI(apiFood) {
  var currentFoods = getFoods();
  
  // Verificar si ya existe
  var exists = currentFoods.some(function(f) {
    return f.id === apiFood.id;
  });
  
  if (exists) {
    showToast('Este alimento ya existe en tu base de datos');
    return false;
  }
  
  // Agregar a la lista
  var newFood = {
    id: apiFood.id,
    name: apiFood.name,
    portion: apiFood.portion || 100,
    calories: Math.round(apiFood.calories || 0),
    protein: Math.round((apiFood.protein || 0) * 10) / 10,
    fat: Math.round((apiFood.fat || 0) * 10) / 10,
    carbs: Math.round((apiFood.carbs || 0) * 10) / 10,
    category: apiFood.category || 'Otros',
    units: [
      { name: 'gramos', grams: 1 },
      { name: 'porción', grams: apiFood.portion || 100 }
    ],
    isOnline: true,
    fdcId: apiFood.fdcId,
    addedAt: new Date().toISOString()
  };
  
  currentFoods.push(newFood);
  localStorage.setItem('ketoFoods', JSON.stringify(currentFoods));
  
  console.log('[FoodAPI] Alimento agregado:', newFood.name);
  return true;
}

// Buscar en API y mostrar resultados en modal
var onlineSearchResults = [];
var currentOnlineSearch = '';

async function searchOnlineFoods(query) {
  if (!query || query.length < 2) {
    return [];
  }
  
  currentOnlineSearch = query;
  onlineSearchResults = [];
  
  // Usar función unificada que busca en ambas APIs
  var results = await searchAllFoodSources(query, 10);
  
  // Filtrar solo si la búsqueda no cambió
  if (currentOnlineSearch === query) {
    onlineSearchResults = results;
    return results;
  }
  
  return [];
}

// Mostrar resultados de búsqueda en el UI
function renderOnlineSearchResults(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  
  if (onlineSearchResults.length === 0) {
    container.innerHTML = '<p class="text-center text-on-surface-variant py-8">Busca un alimento para ver resultados</p>';
    return;
  }
  
  var html = '';
  
  onlineSearchResults.forEach(function(food, index) {
    var categoryColor = getCategoryColor(food.category);
    html += '<div class="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer" onclick="showOnlineFoodDetail(' + index + ')">';
    html += '<div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:' + categoryColor + '20">';
    html += '<span class="material-symbols-outlined" style="color:' + categoryColor + '">restaurant</span>';
    html += '</div>';
    html += '<div class="flex-1 min-w-0">';
    html += '<p class="text-sm font-medium text-white truncate">' + escapeHtml(food.name) + '</p>';
    html += '<p class="text-xs text-on-surface-variant">' + food.calories + ' cal • P:' + food.protein + 'g • G:' + food.fat + 'g • C:' + food.carbs + 'g</p>';
    if (food.brand) {
      html += '<p class="text-[10px] text-on-surface-variant/60">' + escapeHtml(food.brand) + '</p>';
    }
    html += '</div>';
    html += '<span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>';
    html += '</div>';
  });
  
  container.innerHTML = html;
}

// Mostrar detalle de alimento online
function showOnlineFoodDetail(index) {
  var food = onlineSearchResults[index];
  if (!food) return;
  
  var modal = document.getElementById('onlineFoodModal');
  var content = document.getElementById('onlineFoodContent');
  
  if (!modal || !content) return;
  
  var html = '<div class="space-y-4">';
  html += '<div class="text-center">';
  html += '<h3 class="text-lg font-bold text-white">' + escapeHtml(food.name) + '</h3>';
  if (food.brand) {
    html += '<p class="text-sm text-on-surface-variant">' + escapeHtml(food.brand) + '</p>';
  }
  html += '<span class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium" style="background:' + getCategoryColor(food.category) + '20;color:' + getCategoryColor(food.category) + '">' + food.category + '</span>';
  html += '</div>';
  
  html += '<div class="grid grid-cols-4 gap-2 text-center">';
  html += '<div class="p-2 rounded-lg bg-surface-container-high"><p class="text-lg font-bold text-white">' + food.calories + '</p><p class="text-xs text-on-surface-variant">kcal</p></div>';
  html += '<div class="p-2 rounded-lg bg-surface-container-high"><p class="text-lg font-bold text-orange-400">' + food.protein + 'g</p><p class="text-xs text-on-surface-variant">Proteína</p></div>';
  html += '<div class="p-2 rounded-lg bg-surface-container-high"><p class="text-lg font-bold text-yellow-400">' + food.fat + 'g</p><p class="text-xs text-on-surface-variant">Grasa</p></div>';
  html += '<div class="p-2 rounded-lg bg-surface-container-high"><p class="text-lg font-bold text-cyan-400">' + food.carbs + 'g</p><p class="text-xs text-on-surface-variant">Carbs</p></div>';
  html += '</div>';
  
  html += '<p class="text-xs text-on-surface-variant text-center">Porción: 100g</p>';
  
  html += '<button onclick="addOnlineFood(' + index + ')" class="w-full py-3 bg-primary-container text-white rounded-xl font-medium hover:bg-primary-container/80 transition-all flex items-center justify-center gap-2">';
  html += '<span class="material-symbols-outlined">add</span>Agregar a mi base de datos';
  html += '</button>';
  
  html += '</div>';
  
  content.innerHTML = html;
  
  modal.style.display = 'flex';
}

// Agregar alimento de búsqueda online
function addOnlineFood(index) {
  var food = onlineSearchResults[index];
  if (!food) return;
  
  var added = addFoodFromAPI(food);
  
  if (added) {
    showToast('Alimento agregado correctamente');
    closeOnlineFoodModal();
    
    // Recargar lista si estamos en alimentos.html
    if (typeof renderFoods === 'function') {
      renderFoods();
    }
  }
}

// Cerrar modal de alimento online
function closeOnlineFoodModal() {
  var modal = document.getElementById('onlineFoodModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Obtener color de categoría
function getCategoryColor(category) {
  var colors = {
    'Proteínas': '#ff4d00',
    'Verduras': '#4caf50',
    'Grasas': '#ffb300',
    'Lácteos': '#9c27b0',
    'Frutos secos': '#ff9800',
    'Frutas': '#e91e63',
    'Otros': '#2196f3'
  };
  return colors[category] || '#ff4d00';
}

// Limpiar cache de búsquedas
function clearFoodCache() {
  foodSearchCache = {};
  console.log('[FoodAPI] Cache limpiado');
}

// ==================== OPENFOODFACTS API ====================
// API gratuita y abierta de alimentos
// Documentación: https://world.openfoodfacts.org/api

const OPENFOODFACTS_BASE = 'https://world.openfoodfacts.org/cgi/search.pl';

// Cache para OpenFoodFacts
var openFoodFactsCache = {};

// Buscar alimentos en OpenFoodFacts
async function searchOpenFoodFacts(query, limit = 15) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  var cacheKey = query.toLowerCase().trim();
  if (openFoodFactsCache[cacheKey]) {
    console.log('[OpenFoodFacts] Usando cache para:', query);
    return openFoodFactsCache[cacheKey];
  }
  
  try {
    var url = OPENFOODFACTS_BASE + '?search_terms=' + encodeURIComponent(query) + 
              '&search_simple=1&action=process&json=1&page_size=' + limit + '&fields=code,product_name,nutriments,brands,categories';
    
    var response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('OpenFoodFacts error: ' + response.status);
    }
    
    var data = await response.json();
    
    if (!data.products || data.products.length === 0) {
      return [];
    }
    
    // Transformar al formato de KetoLab
    var formatted = data.products
      .filter(function(p) {
        return p.product_name && p.nutriments;
      })
      .map(function(product) {
        var nutriments = product.nutriments || {};
        
        // Obtener valores por 100g
        var calories = nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0;
        var protein = nutriments['proteins_100g'] || nutriments['proteins'] || 0;
        var fat = nutriments['fat_100g'] || nutriments['fat'] || 0;
        var carbs = nutriments['carbohydrates_100g'] || nutriments['carbohydrates'] || 0;
        
        // Calcular net carbs (total - fibra)
        var fiber = nutriments['fiber_100g'] || nutriments['fiber'] || 0;
        var netCarbs = Math.max(0, carbs - fiber);
        
        return {
          id: 'off_' + product.code,
          name: product.product_name,
          portion: 100,
          calories: Math.round(calories),
          protein: Math.round(protein * 10) / 10,
          fat: Math.round(fat * 10) / 10,
          carbs: Math.round(netCarbs * 10) / 10,
          fiber: Math.round(fiber * 10) / 10,
          category: mapOpenFoodFactsCategory(product.categories),
          brand: product.brands || null,
          source: 'OpenFoodFacts'
        };
      })
      .filter(function(f) {
        return f.calories > 0;
      });
    
    // Guardar en cache
    openFoodFactsCache[cacheKey] = formatted;
    
    console.log('[OpenFoodFacts] Encontrados:', formatted.length, 'alimentos para:', query);
    return formatted;
    
  } catch (error) {
    console.error('[OpenFoodFacts] Error:', error);
    return [];
  }
}

// Mapear categoría de OpenFoodFacts a categorías de KetoLab
function mapOpenFoodFactsCategory(categories) {
  if (!categories) return 'Otros';
  
  var cat = categories.toLowerCase();
  
  if (cat.includes('meat') || cat.includes('poultry') || cat.includes('fish') || cat.includes('egg') || cat.includes('chicken') || cat.includes('beef') || cat.includes('pork')) {
    return 'Proteínas';
  }
  if (cat.includes('dairy') || cat.includes('cheese') || cat.includes('milk') || cat.includes('yugurt') || cat.includes('butter') || cat.includes('cream')) {
    return 'Lácteos';
  }
  if (cat.includes('vegetable') || cat.includes('legume') || cat.includes('plant') || cat.includes('broccoli') || cat.includes('spinach')) {
    return 'Verduras';
  }
  if (cat.includes('nut') || cat.includes('almond') || cat.includes('walnut') || cat.includes('seed')) {
    return 'Frutos secos';
  }
  if (cat.includes('fruit') || cat.includes('apple') || cat.includes('banana') || cat.includes('berry')) {
    return 'Frutas';
  }
  if (cat.includes('oil') || cat.includes('fat') || cat.includes('butter') || cat.includes('lard')) {
    return 'Grasas';
  }
  
  return 'Otros';
}

// Función unificada para buscar en todas las APIs
async function searchAllFoodSources(query, limit = 10) {
  var results = [];
  
  try {
    // Buscar en USDA
    var usdaResults = await searchFoodsOnline(query, limit);
    results = results.concat(usdaResults);
  } catch (e) {
    console.warn('[searchAllFoodSources] USDA error:', e);
  }
  
  try {
    // Buscar en OpenFoodFacts
    var offResults = await searchOpenFoodFacts(query, limit);
    results = results.concat(offResults);
  } catch (e) {
    console.warn('[searchAllFoodSources] OpenFoodFacts error:', e);
  }
  
  // Eliminar duplicados por nombre
  var seen = {};
  var uniqueResults = results.filter(function(item) {
    var key = item.name.toLowerCase().trim();
    if (seen[key]) {
      return false;
    }
    seen[key] = true;
    return true;
  });
  
  return uniqueResults.slice(0, limit * 2);
}
