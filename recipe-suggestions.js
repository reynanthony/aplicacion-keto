// ==================== SUGERENCIAS DE RECETAS ====================

// Base de datos de recetas (reducida para sugerencias)
var recipesDB = {
  'pure-coliflor': { title: 'Puré de coliflor cremoso', icon: 'soup_kitchen', color: '#4caf50', protein: 4, fat: 15, carbs: 8 },
  'hongos': { title: 'Salteado de hongos con ajo', icon: 'forest', color: '#795548', protein: 3, fat: 10, carbs: 4 },
  'pollo-jugoso': { title: 'Pechuga de pollo jugosa', icon: 'egg_alt', color: '#ffb300', protein: 45, fat: 10, carbs: 0 },
  'carne-molida': { title: 'Carne molida estilo keto', icon: 'restaurant', color: '#ff4d00', protein: 35, fat: 32, carbs: 1 },
  'huevos': { title: 'Huevos revueltos cremosos', icon: 'egg', color: '#ffb300', protein: 24, fat: 30, carbs: 2 },
  'arroz-coliflor': { title: 'Arroz de coliflor', icon: 'rice_bowl', color: '#9c27b0', protein: 3, fat: 7, carbs: 6 },
  'aderezo': { title: 'Aderezo cetogénico', icon: 'local_bar', color: '#00e3fd', protein: 0, fat: 58, carbs: 0 }
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
  'pure-coliflor': ['coliflor', 'mantequilla'],
  'hongos': ['champiñones', 'ajo', 'mantequilla'],
  'pollo-jugoso': ['pollo', 'aceite de oliva'],
  'carne-molida': ['carne molida', 'ajo'],
  'huevos': ['huevos', 'mantequilla', 'queso'],
  'arroz-coliflor': ['coliflor', 'aceite de oliva'],
  'aderezo': ['aceite de oliva', 'vinagre', 'mostaza']
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
  
  Object.entries(recipeIngredientsDB).forEach(function(_ref) {
    var recipeId = _ref[0];
    var needed = _ref[1];
    
    var matchCount = needed.filter(function(ing) {
      return availableIngredients.some(function(avail) {
        return avail.includes(ing);
      });
    }).length;
    
    if (matchCount > 0) {
      suggestions.push({
        id: recipeId,
        matchPercent: Math.round((matchCount / needed.length) * 100),
        missing: needed.filter(function(ing) {
          return !availableIngredients.some(function(avail) {
            return avail.includes(ing);
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
  
  if (suggestions.length === 0) {
    container.innerHTML = '';
    return;
  }
  
  var html = '<div class="mt-6"><h3 class="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-sm">recommend</span>Recetas que puedes preparar</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-3">';
  
  suggestions.forEach(function(s) {
    var recipe = recipesDB ? recipesDB[s.id] : null;
    if (recipe) {
      var colors = getMacroColors(recipe);
      html += '<div class="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all" onclick="openRecipeModal(\'' + s.id + '\')">';
      html += '<div class="h-28 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[' + colors.from + '] to-[' + colors.to + ']">';
      html += '<span class="material-symbols-outlined text-5xl text-white/30">' + recipe.icon + '</span>';
      html += '<div class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/30 text-[9px] font-bold text-white">' + colors.label + '</div>';
      html += '</div>';
      html += '<div class="p-3">';
      html += '<p class="font-bold text-white text-sm">' + recipe.title + '</p>';
      html += '<div class="flex gap-2 mt-1">';
      html += '<span class="text-[10px] text-orange-400">' + recipe.protein + 'g</span>';
      html += '<span class="text-[10px] text-yellow-400">' + recipe.fat + 'g</span>';
      html += '<span class="text-[10px] text-cyan-400">' + recipe.carbs + 'g</span>';
      html += '</div>';
      html += '<p class="text-xs text-green-400 mt-1">' + s.matchPercent + '% ingredientes</p>';
      }
      html += '</div></div>';
    }
  });
  
  html += '</div></div>';
  container.innerHTML = html;
}

// Auto-inicializar en dashboard
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      if (document.getElementById('recipeSuggestions')) {
        showRecipeSuggestions();
      }
    }, 800);
  });
}
