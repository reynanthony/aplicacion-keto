// ==================== SUGERENCIAS DE RECETAS ====================

var recipesDB = {
  'huevos-bacon': { title: 'Huevos con Bacon', icon: 'egg', color: '#ff6b35', protein: 22, fat: 35, carbs: 1 },
  'pollo-asado': { title: 'Pollo Asado Crujiente', icon: 'set_meal', color: '#ff6b35', protein: 45, fat: 20, carbs: 0 },
  'filete-salmon': { title: 'Salmon a la Plancha', icon: 'set_meal', color: '#ff6b35', protein: 40, fat: 30, carbs: 0 },
  'carbon-carne': { title: 'Bistec a la Parrilla', icon: 'restaurant', color: '#ff6b35', protein: 48, fat: 36, carbs: 0 },
  'hamburguesa-keto': { title: 'Hamburguesa Keto', icon: 'fastfood', color: '#ffc107', protein: 35, fat: 42, carbs: 2 },
  'pasta-zucchini': { title: 'Fideos de Calabacin', icon: 'soup_kitchen', color: '#00bcd4', protein: 5, fat: 9, carbs: 6 },
  'tortilla-espinaca': { title: 'Tortilla de Espinacas', icon: 'egg', color: '#4caf50', protein: 18, fat: 22, carbs: 3 },
  'cafe-keto': { title: 'Cafe Keto', icon: 'local_cafe', color: '#ffc107', protein: 2, fat: 34, carbs: 0 },
  'batido-queso': { title: 'Batido de Queso Cottage', icon: 'local_drink', color: '#ff6b35', protein: 20, fat: 8, carbs: 4 },
  'ensalada-aguacate': { title: 'Ensalada de Aguacate', icon: 'eco', color: '#4caf50', protein: 4, fat: 32, carbs: 8 },
  'pancakes-keto': { title: 'Pancakes de Queso', icon: 'breakfast_dining', color: '#ffc107', protein: 16, fat: 22, carbs: 3 },
  'pizza-crust': { title: 'Pizza Base de Queso', icon: 'local_pizza', color: '#ffc107', protein: 24, fat: 28, carbs: 4 },
  'pure-coliflor': { title: 'Pure de Coliflor', icon: 'soup_kitchen', color: '#4caf50', protein: 4, fat: 15, carbs: 8 },
  'hongos-ajo': { title: 'Hongos Salteados', icon: 'forest', color: '#795548', protein: 3, fat: 10, carbs: 4 },
  'pollo-jugoso': { title: 'Pechuga de Pollo', icon: 'egg_alt', color: '#ffb300', protein: 45, fat: 10, carbs: 0 },
  'carne-molida': { title: 'Carne Molida Keto', icon: 'restaurant', color: '#ff4d00', protein: 35, fat: 32, carbs: 1 },
  'aderezo-keto': { title: 'Aderezo Cesar', icon: 'local_bar', color: '#ffc107', protein: 0, fat: 58, carbs: 0 },
  'huevos-revueltos': { title: 'Huevos Revueltos', icon: 'egg', color: '#ffc107', protein: 24, fat: 30, carbs: 2 },
  'arroz-coliflor': { title: 'Arroz de Coliflor', icon: 'rice_bowl', color: '#9c27b0', protein: 3, fat: 7, carbs: 6 }
};

function getMacroColors(recipe) {
  var dominant = 'fat';
  var maxVal = recipe.fat || 0;
  if ((recipe.protein || 0) > maxVal) { dominant = 'protein'; maxVal = recipe.protein; }
  if ((recipe.carbs || 0) > maxVal) { dominant = 'carbs'; }
  
  var colors = {
    protein: { from: '#ff6b35', to: '#c2185b', icon: '#ffb74d', label: 'PRO' },
    fat: { from: '#ffc107', to: '#ff8f00', icon: '#ffeb3b', label: 'GRASA' },
    carbs: { from: '#00bcd4', to: '#0097a7', icon: '#4dd0e1', label: 'CARBS' }
  };
  return colors[dominant];
}

var recipeIngredientsDB = {
  'huevos-bacon': ['huevos', 'bacon', 'mantequilla'],
  'pollo-asado': ['pollo', 'mantequilla', 'ajo'],
  'filete-salmon': ['salmon', 'mantequilla', 'limon'],
  'carbon-carne': ['bistec', 'mantequilla', 'ajo'],
  'hamburguesa-keto': ['carne molida', 'huevos', 'queso'],
  'pasta-zucchini': ['calabacin', 'mantequilla', 'ajo'],
  'tortilla-espinaca': ['huevos', 'espinacas', 'queso'],
  'cafe-keto': ['cafe', 'mantequilla', 'aceite de coco'],
  'batido-queso': ['queso cottage', 'crema'],
  'ensalada-aguacate': ['aguacate', 'queso feta', 'aceite de oliva'],
  'pancakes-keto': ['huevos', 'queso ricotta', 'mantequilla'],
  'pizza-crust': ['mozzarella', 'huevos', 'salsa'],
  'pure-coliflor': ['coliflor', 'mantequilla'],
  'hongos-ajo': ['champinones', 'ajo', 'mantequilla'],
  'pollo-jugoso': ['pollo', 'aceite de oliva'],
  'carne-molida': ['carne molida', 'ajo'],
  'huevos-revueltos': ['huevos', 'mantequilla', 'queso'],
  'arroz-coliflor': ['coliflor', 'aceite de oliva'],
  'aderezo-keto': ['aceite de oliva', 'vinagre', 'mostaza']
};

function getRecipeSuggestions() {
  var despensa = safeParseJSON(localStorage.getItem('despensa'), {});
  var foods = safeParseJSON(localStorage.getItem('ketoFoods'), []);
  
  var availableIngredients = [];
  Object.keys(despensa).forEach(function(foodId) {
    var food = foods.find(function(f) { return f.id === foodId; });
    if (food && despensa[foodId].stock > 0 && food.name) {
      availableIngredients.push(food.name.toLowerCase());
    }
  });
  
  var suggestions = [];
  
  Object.entries(recipeIngredientsDB).forEach(function(entry) {
    var recipeId = entry[0];
    var needed = entry[1];
    
    var matchCount = needed.filter(function(ing) {
      return availableIngredients.some(function(avail) {
        return avail.indexOf(ing) !== -1;
      });
    }).length;
    
    if (matchCount > 0) {
      suggestions.push({
        id: recipeId,
        matchPercent: Math.round((matchCount / needed.length) * 100),
        missing: needed.filter(function(ing) {
          return !availableIngredients.some(function(avail) {
            return avail.indexOf(ing) !== -1;
          });
        })
      });
    }
  });
  
  suggestions.sort(function(a, b) { return b.matchPercent - a.matchPercent; });
  return suggestions.slice(0, 3);
}

function showRecipeSuggestions() {
  var container = document.getElementById('recipeSuggestions');
  if (!container) return;
  
  var suggestions = getRecipeSuggestions();
  
  var recipesToShow = suggestions.length > 0 ? suggestions : [
    { id: 'huevos-bacon', matchPercent: 0 },
    { id: 'pollo-asado', matchPercent: 0 },
    { id: 'filete-salmon', matchPercent: 0 }
  ];
  
  var html = '<div class="mt-6 px-4 md:px-0"><h3 class="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-sm">recommend</span>Recetas Populares</h3><div class="grid grid-cols-2 md:grid-cols-3 gap-3">';
  
  recipesToShow.forEach(function(s) {
    var recipe = recipesDB ? recipesDB[s.id] : null;
    if (recipe) {
      var colors = getMacroColors(recipe);
      html += '<a href="recetas.html" class="glass-card rounded-xl overflow-hidden block hover:scale-102 transition-all">';
      html += '<div class="h-20 md:h-28 w-full overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ' + colors.from + ', ' + colors.to + ');">';
      html += '<span class="material-symbols-outlined text-4xl md:text-5xl text-white opacity-30">' + recipe.icon + '</span>';
      html += '<div class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black bg-opacity-30 text-[9px] font-bold text-white">' + colors.label + '</div>';
      html += '</div>';
      html += '<div class="p-2 md:p-3">';
      html += '<p class="font-bold text-white text-xs md:text-sm">' + recipe.title + '</p>';
      html += '<div class="flex gap-1 md:gap-2 mt-1">';
      html += '<span class="text-[9px] md:text-[10px] text-orange-400">' + recipe.protein + 'g</span>';
      html += '<span class="text-[9px] md:text-[10px] text-yellow-400">' + recipe.fat + 'g</span>';
      html += '<span class="text-[9px] md:text-[10px] text-cyan-400">' + recipe.carbs + 'g</span>';
      html += '</div>';
      html += '</div></a>';
    }
  });
  
  html += '</div></div>';
  container.innerHTML = html;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      if (document.getElementById('recipeSuggestions')) {
        showRecipeSuggestions();
      }
    }, 800);
  });
}