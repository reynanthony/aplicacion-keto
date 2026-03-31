// ==================== RECETAS KETO EXPANDIDA ====================

// Imágenes locales de recetas (SVG minimalistas)
var RECIPE_IMAGES = {
  'huevos-bacon': './images/recipes/huevos.svg',
  'pollo-asado': './images/recipes/pollo-jugoso.svg',
  'filete-salmon': './images/recipes/salmon.svg',
  'carbón-carne': './images/recipes/carne-molida.svg',
  'hamburguesa-keto': './images/recipes/carne-molida.svg',
  'pasta-zucchini': './images/recipes/vegetales.svg',
  'tortilla-espinaca': './images/recipes/huevos.svg',
  'cafe-keto': './images/recipes/cafe.svg',
  'batido-queso': './images/recipes/batido.svg',
  'ensalada-aguacate': './images/recipes/aguacate.svg',
  'pancakes-keto': './images/recipes/pan.svg',
  'pizza-crust': './images/recipes/pan.svg',
  'pure-coliflor': './images/recipes/pure-coliflor.svg',
  'hongos-ajo': './images/recipes/hongos.svg',
  'pollo-jugoso': './images/recipes/pollo-jugoso.svg',
  'carne-molida': './images/recipes/carne-molida.svg',
  'aderezo-keto': './images/recipes/aderezo.svg',
  'huevos-revueltos': './images/recipes/huevos.svg',
  'arroz-coliflor': './images/recipes/arroz-coliflor.svg',
  'pollo-ajillo': './images/recipes/pollo-jugoso.svg',
  'atun-aguacate': './images/recipes/aguacate.svg',
  'huevos-cocidos': './images/recipes/huevos.svg',
  'verduras-salteadas': './images/recipes/vegetales.svg',
  'omelette-queso': './images/recipes/huevos.svg'
};

const RECIPES_DB = {
  "huevos-bacon": {title: "Huevos con Bacon", icon: "egg", prepTime: "10 min", calories: 420, protein: 22, fat: 35, carbs: 1, ingredients: ["3 huevos", "3-4 tiras bacon", "20g mantequilla", "Sal y pimienta"], prep: "Freír el bacon hasta crujiente. En la misma grasa, freír los huevos. Sazonar.", category: "desayuno", image: './images/recipes/huevos.svg'},
  "pollo-asado": {title: "Pollo Asado Crujiente", icon: "set_meal", prepTime: "45 min", calories: 380, protein: 45, fat: 20, carbs: 0, ingredients: ["1 pollo entero", "50g mantequilla", "Ajo, romero, tomillo", "Sal gruesa"], prep: "Untar pollo con mantequilla y especias. Hornear a 200°C por 40-45 min hasta dorado.", category: "principal", image: './images/recipes/pollo-jugoso.svg'},
  "filete-salmon": {title: "Salmón a la Plancha", icon: "set_meal", prepTime: "15 min", calories: 450, protein: 40, fat: 30, carbs: 0, ingredients: ["200g filete salmón", "30g mantequilla", "Limón, eneldo", "Sal y pimienta"], prep: "Sazonar el salmón. Cocinar 4-5 min por lado en sarten caliente con mantequilla.", category: "principal", image: './images/recipes/salmon.svg'},
  "carbón-carne": {title: "Bistec a la Parrilla", icon: "restaurant", prepTime: "20 min", calories: 520, protein: 48, fat: 36, carbs: 0, ingredients: ["250g bistec", "30g mantequilla", "Ajo, romero", "Sal y pimienta"], prep: "Sazonar y dejar reposar 30 min. Cocinar a fuego alto 3-4 min por lado.", category: "principal", image: './images/recipes/carne-molida.svg'},
  "hamburguesa-keto": {title: "Hamburguesa Keto", icon: "fastfood", prepTime: "15 min", calories: 550, protein: 35, fat: 42, carbs: 2, ingredients: ["150g carne molida", "1 huevo", "30g queso cheddar", "Lechuga, tomate"], prep: "Mezclar carne con huevo y formar hamburguesa. Cocinar 3-4 min por lado. Agregar queso.", category: "principal", image: './images/recipes/carne-molida.svg'},
  "pasta-zucchini": {title: "Fideos de Calabacín", icon: "soup_kitchen", prepTime: "15 min", calories: 120, protein: 5, fat: 9, carbs: 6, ingredients: ["2 zucchini medianos", "30g mantequilla", "2 dientes ajo", "Parmesano"], prep: "Cortar zucchini en espiral. Saltear en mantequilla con ajo 3-4 min. Agregar parmesano.", category: "acompañamiento", image: './images/recipes/vegetales.svg'},
  "tortilla-espinaca": {title: "Tortilla de Espinacas", icon: "egg", prepTime: "12 min", calories: 280, protein: 18, fat: 22, carbs: 3, ingredients: ["3 huevos", "50g espinacas", "30g queso feta", "20g mantequilla"], prep: "Batir huevos y agregar espinacas. Cocinar en sarten con mantequilla a fuego lento.", category: "desayuno", image: './images/recipes/huevos.svg'},
  "cafe-keto": {title: "Café Keto (Bulletproof)", icon: "local_cafe", prepTime: "5 min", calories: 320, protein: 2, fat: 34, carbs: 0, ingredients: ["200ml café negro", "20g mantequilla", "10g aceite de coco"], prep: "Licuar café con mantequilla y aceite de coco hasta espumoso.", category: "desayuno", image: './images/recipes/cafe.svg'},
  "batido-queso": {title: "Batido de Queso Cottage", icon: "local_drink", prepTime: "3 min", calories: 180, protein: 20, fat: 8, carbs: 4, ingredients: ["150g queso cottage", "50ml crema", "Canela", "Endulzante keto"], prep: "Mezclar todos los ingredientes hasta suave.", category: "desayuno", image: './images/recipes/batido.svg'},
  "ensalada-aguacate": {title: "Ensalada de Aguacate", icon: "eco", prepTime: "8 min", calories: 350, protein: 4, fat: 32, carbs: 8, ingredients: ["1 aguacate", "60g queso feta", "Aceitunas", "Aceite de oliva", "Limón"], prep: "Cortar aguacate en cubos. Mezclar con feta, aceitunas y aderezar.", category: "almuerzo", image: './images/recipes/aguacate.svg'},
  "pancakes-keto": {title: "Pancakes de Queso", icon: "breakfast_dining", prepTime: "15 min", calories: 280, protein: 16, fat: 22, carbs: 3, ingredients: ["2 huevos", "60g queso ricotta", "20g mantequilla", "Canela", "Endulzante"], prep: "Mezclar ingredientes. Cocinar en sarten caliente formando pancakes pequenos.", category: "desayuno", image: './images/recipes/pan.svg'},
  "pizza-crust": {title: "Pizza Base de Queso", icon: "local_pizza", prepTime: "20 min", calories: 380, protein: 24, fat: 28, carbs: 4, ingredients: ["100g mozzarella rallada", "2 huevos", "Salsa keto", "Toppings a eleccion"], prep: "Mezclar mozzarella con huevos, formar base. Hornear 10 min a 200°C. Agregar toppings y hornear 5 min mas.", category: "principal", image: './images/recipes/pan.svg'},
  "pure-coliflor": {title: "Pure de Coliflor", icon: "soup_kitchen", prepTime: "20 min", calories: 180, protein: 4, fat: 15, carbs: 8, ingredients: ["1 coliflor", "50g mantequilla", "Sal, pimienta, nuez moscada"], prep: "Cocer al vapor. Triturar con mantequilla y especias.", category: "acompañamiento", image: './images/recipes/pure-coliflor.svg'},
  "hongos-ajo": {title: "Hongos Salteados", icon: "forest", prepTime: "10 min", calories: 120, protein: 3, fat: 10, carbs: 4, ingredients: ["300g champiñones", "30g mantequilla", "2 dientes ajo", "Perejil"], prep: "Saltear champiñones en mantequilla con ajo.", category: "acompañamiento", image: './images/recipes/hongos.svg'},
  "pollo-jugoso": {title: "Pechuga de Pollo", icon: "egg_alt", prepTime: "20 min", calories: 280, protein: 45, fat: 10, carbs: 0, ingredients: ["2 pechugas", "Sal, ajo en polvo", "Aceite de oliva"], prep: "Sazonar, sellar y cocinar a fuego bajo.", category: "principal", image: './images/recipes/pollo-jugoso.svg'},
  "carne-molida": {title: "Carne Molida Keto", icon: "restaurant", prepTime: "15 min", calories: 450, protein: 35, fat: 32, carbs: 1, ingredients: ["500g carne molida", "Ajo, comino", "30g mantequilla"], prep: "Dorar en mantequilla con especias.", category: "principal", image: './images/recipes/carne-molida.svg'},
  "aderezo-keto": {title: "Aderezo Cesar", icon: "local_bar", prepTime: "5 min", calories: 520, protein: 0, fat: 58, carbs: 0, ingredients: ["4 cdas aceite oliva", "Vinagre", "Mostaza", "Sal y pimienta"], prep: "Mezclar todos los ingredientes.", category: "aderezo", image: './images/recipes/aderezo.svg'},
  "huevos-revueltos": {title: "Huevos Revueltos", icon: "egg", prepTime: "10 min", calories: 380, protein: 24, fat: 30, carbs: 2, ingredients: ["3-5 huevos", "20g mantequilla", "30g mozzarella"], prep: "Mover suavemente a fuego bajo.", category: "desayuno", image: './images/recipes/huevos.svg'},
  "arroz-coliflor": {title: "Arroz de Coliflor", icon: "rice_bowl", prepTime: "15 min", calories: 85, protein: 3, fat: 7, carbs: 6, ingredients: ["1 coliflor", "Aceite de oliva", "Sal y pimienta"], prep: "Procesar y saltear.", category: "acompañamiento", image: './images/recipes/arroz-coliflor.svg'},
  "pollo-ajillo": {title: "Pollo al Ajillo", icon: "set_meal", prepTime: "25 min", calories: 320, protein: 42, fat: 14, carbs: 2, ingredients: ["300g pollo", "6 dientes ajo", "30g mantequilla", "Perejil"], prep: "Freír ajo, agregar pollo, cocinar hasta dorado.", category: "principal", image: './images/recipes/pollo-jugoso.svg'},
  "atun-aguacate": {title: "Atun con Aguacate", icon: "eco", prepTime: "10 min", calories: 380, protein: 30, fat: 26, carbs: 4, ingredients: ["150g atún", "1 aguacate", "Mayonesa keto", "Limón"], prep: "Mezclar atún con mayonesa, servir sobre aguacate.", category: "principal", image: './images/recipes/aguacate.svg'},
  "huevos-cocidos": {title: "Huevos Cocidos", icon: "egg", prepTime: "12 min", calories: 155, protein: 13, fat: 11, carbs: 1, ingredients: ["3 huevos", "Sal", "Mayonesa"], prep: "Hervir huevos 10 min, enfríar, pelar y servir con mayonesa.", category: "snacks", image: './images/recipes/huevos.svg'},
  "verduras-salteadas": {title: "Verduras Salteadas", icon: "eco", prepTime: "15 min", calories: 80, protein: 3, fat: 6, carbs: 5, ingredients: ["200g verduras mixtas", "20g mantequilla", "Ajo", "Sal y pimienta"], prep: "Saltear verduras en mantequilla con ajo.", category: "acompañamiento", image: './images/recipes/vegetales.svg'},
  "omelette-queso": {title: "Omelette de Queso", icon: "egg", prepTime: "10 min", calories: 350, protein: 20, fat: 28, carbs: 2, ingredients: ["3 huevos", "50g queso cheddar", "20g mantequilla"], prep: "Batir huevos, verter en sarten con mantequilla, agregar queso, doblar.", category: "desayuno", image: './images/recipes/huevos.svg'}
};

// Función para obtener imagen de receta
function getRecipeImage(recipeId) {
  return RECIPE_IMAGES[recipeId] || './images/recipes/default.svg';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECIPES_DB, RECIPE_IMAGES, getRecipeImage };
}
