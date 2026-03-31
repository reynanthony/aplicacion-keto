// ==================== RECETAS DETALLADAS KETO - KetoLab ====================
// Base de recetas completas con macros, ingredientes y preparación

console.log('[RecipeDetails] Cargando recetas detalladas...');

var KETO_RECIPES = {
  // ==================== DESAYUNOS ====================
  "desayuno-huevos-aguacate": {
    title: "Huevos Revueltos con Aguacate",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 18,
    fat: 38,
    carbs: 8,
    netCarbs: 4,
    fiber: 4,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 100, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" },
      { id: "f32", name: "Ajo", quantity: 2, unit: "g", optional: true }
    ],
    instructions: [
      "Picar el aguacate en cubos medianos y reservar.",
      "Batir los huevos en un bowl con sal y pimienta al gusto.",
      "Derretir la mantequilla en una sartén a fuego medio-bajo.",
      "Verter los huevos batidos y cocinar removiendo suavemente con una espátula.",
      "Cuando los huevos estén casi cocidos pero aún húmedos, retirar del fuego (continuarán cocinando con el calor residual).",
      "Servir los huevos revueltos junto con el aguacate en cubos.",
      "Sazonar con sal, pimienta y opcionalmente un poco de ajo en polvo."
    ],
    tips: "No cocinar los huevos a fuego alto para evitar que se sequen. El aguacate debe estar maduro pero firme.",
    image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-tortilla-espinacas": {
    title: "Tortilla Española de Espinacas",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 320,
    protein: 22,
    fat: 24,
    carbs: 6,
    netCarbs: 3,
    fiber: 3,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f25", name: "Espinacas", quantity: 80, unit: "g" },
      { id: "f40", name: "Queso feta", quantity: 30, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Lavar bien las espinacas y escurrir.",
      "Batir los huevos con sal y pimienta.",
      "Calentar la mantequilla en una sartén antiadherente.",
      "Agregar las espinacas y cocinar 2 minutos hasta que se marchiten.",
      "Verter los huevos batidos sobre las espinacas.",
      "Cocinar a fuego bajo hasta que los bordes estén firmes.",
      "Agregar el queso feta desmenuzado por encima.",
      "Doblar la tortilla por la mitad y cocinar 1 minuto más."
    ],
    tips: "Esta tortilla puede comerse caliente o a temperatura ambiente. Es perfecta para preparar la noche anterior.",
    image: "https://images.pexels.com/photos/2286929/pexels-photo-2286929.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-bacon-huevos": {
    title: "Huevos con Bacon Crujiente",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "12 min",
    difficulty: "fácil",
    servings: 1,
    calories: 480,
    protein: 24,
    fat: 42,
    carbs: 2,
    netCarbs: 2,
    fiber: 0,
    ingredients: [
      { id: "f5", name: "Bacon", quantity: 80, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Calentar una sartén a fuego medio-alto.",
      "Cocinar el bacon 3-4 minutos por lado hasta que esté crujiente.",
      "Retirar el bacon y reservar sobre papel absorbente.",
      "En la misma sartén con la grasa del bacon, derretir la mantequilla.",
      "Cocinar los huevos fritos o escalfados a gusto.",
      "Servir inmediatamente con el bacon crujiente."
    ],
    tips: "Para huevos escalfados: hervir agua con un chorrito de vinagre, crear un remolino y añadir el huevo. Cocinar 3 minutos.",
    image: "https://images.pexels.com/photos/162967/pexels-photo-162967.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-omelette-queso": {
    title: "Omelette de Queso y Hierbas",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 26,
    fat: 30,
    carbs: 3,
    netCarbs: 2,
    fiber: 1,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 40, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" },
      { id: "f34", name: "Apio", quantity: 20, unit: "g", optional: true }
    ],
    instructions: [
      "Batir los huevos con sal, pimienta y hierbas opcionales (perejil, cebollino).",
      "Derretir la mantequilla en una sartén a fuego medio.",
      "Verter los huevos batidos y dejar cocinar sin mover por 1-2 minutos.",
      "Cuando los bordes estén firmes pero el centro aún líquido, agregar el queso.",
      "Doblar la omelette por la mitad y cocinar 30 segundos más.",
      "Deslizar sobre el plato y servir inmediatamente."
    ],
    tips: "Para una omelette más esponjosa, agregar una cucharada de agua o leche dentro de los huevos batidos.",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-yogur-keto": {
    title: "Yogur Griego con Frutos Rojos",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: 5,
    difficulty: "muy fácil",
    servings: 1,
    calories: 280,
    protein: 15,
    fat: 18,
    carbs: 12,
    netCarbs: 8,
    fiber: 4,
    ingredients: [
      { id: "f60", name: "Yogur griego natural", quantity: 200, unit: "g" },
      { id: "f18", name: "Nueces", quantity: 20, unit: "g" },
      { id: "f20", name: "Pecanas", quantity: 15, unit: "g" },
      { id: "f85", name: "Eritritol", quantity: 5, unit: "g", optional: true }
    ],
    instructions: [
      "Verter el yogur griego en un bowl o vaso alto.",
      "Agregar las nueces y pecanas picadas.",
      "Endulzar con eritritol al gusto si se desea.",
      "Mezclar suavemente y disfrutar.",
      "Opcional: agregar semillas de chía o coco rallado."
    ],
    tips: "Los frutos rojos frescos tienen menos carbohidratos que los congelados con azúcar. Elige moras, frambuesas o fresas con moderación.",
    image: "https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-pancakes-almendra": {
    title: "Pancakes de Harina de Almendra",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "media",
    servings: 1,
    calories: 350,
    protein: 14,
    fat: 28,
    carbs: 10,
    netCarbs: 5,
    fiber: 5,
    ingredients: [
      { id: "f93", name: "Harina almendra", quantity: 60, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" },
      { id: "f84", name: "Stevia", quantity: 2, unit: "g", optional: true },
      { id: "f35", name: "Queso mozzarella", quantity: 30, unit: "g", optional: true }
    ],
    instructions: [
      "Mezclar la harina de almendra con los huevos batidos hasta obtener una masa homogénea.",
      "Agregar edulcorante si se desea.",
      "Calentar mantequilla en una sartén a fuego medio.",
      "Verter 1/4 de la mezcla formando un círculo.",
      "Cocinar 2-3 minutos hasta que aparezcan burbujas.",
      "Voltear con cuidado y cocinar 1-2 minutos más.",
      "Repetir con el resto de la mezcla.",
      "Servir con mantequilla y opcionalmente queso mozzarella derretido."
    ],
    tips: "La masa debe tener consistencia espesa. Si está muy líquida, agregar más harina de almendra. No cocinar a fuego muy alto para evitar que se quemen.",
    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-cafe-bulletproof": {
    title: "Café Bulletproof Keto",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: 5,
    difficulty: "muy fácil",
    servings: 1,
    calories: 320,
    protein: 2,
    fat: 34,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    ingredients: [
      { id: "f95", name: "Café bulletproof", quantity: 250, unit: "ml" },
      { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" },
      { id: "f15", name: "Aceite de coco", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Preparar el café negro (puede ser expreso o café de filtro fuerte).",
      "Calentar ligeramente la mantequilla y el aceite de coco.",
      "Verter todo en una licuadora de alta potencia o usar batidora de leche.",
      "Licuar durante 20-30 segundos hasta obtener una consistencia espumosa.",
      "Verter en una taza y disfrutar inmediatamente."
    ],
    tips: "Este café proporciona energía sostenida durante varias horas. No es necesario tomarlo todos los días, pero es excelente para el ayuno intermitente.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-quiche-ajo": {
    title: "Quiche de Ajo y Queso",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "20 min",
    difficulty: "media",
    servings: 2,
    calories: 380,
    protein: 18,
    fat: 32,
    carbs: 5,
    netCarbs: 4,
    fiber: 1,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 200, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 60, unit: "g" },
      { id: "f32", name: "Ajo", quantity: 10, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 60, unit: "ml" }
    ],
    instructions: [
      "Precalentar el horno a 180°C.",
      "Dorar el ajo picado en mantequilla hasta que esté fragante.",
      "Batir los huevos con la nata, sal y pimienta.",
      "Agregar el queso mozzarella rallado.",
      "Verter la mezcla en moldes para muffins engrasados.",
      "Hornear durante 15-18 minutos hasta que estén firmes.",
      "Dejar enfriar 5 minutos antes de servir."
    ],
    tips: "Se pueden preparar en batches y guardar en冰箱 hasta 3 días. Son perfectos para meal prep.",
    image: "https://images.pexels.com/photos/7699696/pexels-photo-7699696.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== ALMUERZOS ====================
  "almuerzo-pollo-brcoli": {
    title: "Pechuga de Pollo con Brócoli",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 420,
    protein: 52,
    fat: 18,
    carbs: 10,
    netCarbs: 7,
    fiber: 3,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 200, unit: "g" },
      { id: "f23", name: "Brócoli", quantity: 150, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 15, unit: "ml" },
      { id: "f32", name: "Ajo", quantity: 5, unit: "g", optional: true }
    ],
    instructions: [
      "Sazonar la pechuga de pollo con sal, pimienta y especias al gusto.",
      "Calentar el aceite de oliva en una sartén a fuego medio-alto.",
      "Sellar el pollo 3-4 minutos por cada lado hasta dorar.",
      "Reducir el fuego, tapar y cocinar 10-12 minutos más hasta que esté cocido.",
      "Mientras tanto, cortar el brócoli en floretes y cocinar al vapor 5-6 minutos.",
      "Cortar el pollo en rodajas y servir con el brócoli.",
      "Rociar con un poco más de aceite de oliva y sazonar."
    ],
    tips: "Para pollo más jugoso, marinar en aceite de oliva y ajo durante 30 minutos antes de cocinar. Usar termómetro: 74°C interno.",
    image: "https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-ensalada-aguacate": {
    title: "Ensalada César Keto",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 20,
    fat: 40,
    carbs: 10,
    netCarbs: 6,
    fiber: 4,
    ingredients: [
      { id: "f29", name: "Lechuga", quantity: 150, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 100, unit: "g" },
      { id: "f40", name: "Queso feta", quantity: 50, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 30, unit: "ml" },
      { id: "f88", name: "Vinagre manzana", quantity: 10, unit: "ml" },
      { id: "f87", name: "Mostaza Dijon", quantity: 5, unit: "g" }
    ],
    instructions: [
      "Lavary secar las hojas de lechuga, luego cortarlas o rasgarlas.",
      "Cortar el aguacate en cubos o medias lunas.",
      "Desmenuzar el queso feta.",
      "Para el aderezo: mezclar aceite de oliva, vinagre de manzana y mostaza Dijon.",
      "Combinar la lechuga, aguacate y feta en un bowl.",
      "Rociar con el aderezo y mezclar suavemente.",
      "Sazonar con sal y pimienta al gusto."
    ],
    tips: "Añadir pollo a la plancha, atún o huevo duro para aumentar la proteína. El aguacate debe estar maduro.",
    image: "https://images.pexels.com/photos/5379352/pexels-photo-5379352.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-atun-aguacate": {
    title: "Bowl de Atún y Aguacate",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "10 min",
    difficulty: "muy fácil",
    servings: 1,
    calories: 480,
    protein: 35,
    fat: 34,
    carbs: 8,
    netCarbs: 4,
    fiber: 4,
    ingredients: [
      { id: "f8", name: "Atún", quantity: 140, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 150, unit: "g" },
      { id: "f86", name: "Mayonesa casera", quantity: 20, unit: "g" },
      { id: "f28", name: "Pepino", quantity: 80, unit: "g" },
      { id: "f68", name: "Rúcula", quantity: 30, unit: "g" }
    ],
    instructions: [
      "Escurrir bien el atún y colocarlo en un bowl.",
      "Mezclar el atún con la mayonesa y un poco de mostaza.",
      "Cortar el aguacate por la mitad, quitar el hueso y cortar en cubos o láminas.",
      "Cortar el pepino en rodajas finas.",
      "En un plato, colocar la rúcula como base.",
      "Añadir el aguacate y el pepino.",
      "Colocar la mezcla de atún encima.",
      "Sazonar con sal, pimienta y gotas de limón."
    ],
    tips: "Para una versión más elaborada, agregar olivas, alcaparras y tomates cherry cortados.",
    image: "https://images.pexels.com/photos/3270893/pexels-photo-3270893.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-salmn-aguacate": {
    title: "Salmón a la Plancha con Aguacate",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 38,
    fat: 40,
    carbs: 8,
    netCarbs: 4,
    fiber: 4,
    ingredients: [
      { id: "f4", name: "Salmón", quantity: 180, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 100, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" },
      { id: "f25", name: "Espinacas", quantity: 60, unit: "g" }
    ],
    instructions: [
      "Sazonar el salmón con sal, pimienta y opcionalmente eneldo.",
      "Calentar una plancha o sartén a fuego medio-alto.",
      "Agregar mantequilla y cocinar el salmón 4-5 minutos por lado.",
      "El salmón está listo cuando la carne se separa fácilmente con un tenedor.",
      "Saltear las espinacas en la misma sartén con un poco de mantequilla.",
      "Servir el salmón sobre las espinacas con aguacate al lado.",
      "Exprimir limón fresco por encima."
    ],
    tips: "Para verificar que el salmón está cocido: debe alcanzar 63°C interno o verse opaco en el centro.",
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-carne-calabacin": {
    title: "Carne Molida con Calabacín",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 32,
    fat: 32,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f3", name: "Carne molida 80/20", quantity: 150, unit: "g" },
      { id: "f33", name: "Calabacín", quantity: 200, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 40, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Cortar el calabacín en rodajas o medias lunas.",
      "Saltear el calabacín en aceite de oliva 3-4 minutos hasta que esté tierno pero crujiente.",
      "Retirar y reservar.",
      "En la misma sartén, cocinar la carne molida a fuego medio-alto.",
      "Desmenuzar la carne mientras cocina, sazonar con sal y pimienta.",
      "Cuando la carne esté dorada, agregar el calabacín de vuelta.",
      "Espolvorear queso mozzarella y tapar 2 minutos hasta que se derrita.",
      "Servir caliente."
    ],
    tips: "Agregar especias como comino, pimentón o orégano para más sabor. El calabacín puede reemplazarse por berenjena.",
    image: "https://images.pexels.com/photos/3616966/pexels-photo-3616966.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-pavo-aguacate": {
    title: "Wrap de Pavo con Aguacate",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 32,
    fat: 22,
    carbs: 12,
    netCarbs: 6,
    fiber: 6,
    ingredients: [
      { id: "f10", name: "Pavo molido", quantity: 150, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 80, unit: "g" },
      { id: "f29", name: "Lechuga", quantity: 50, unit: "g" },
      { id: "f30", name: "Tomate", quantity: 50, unit: "g" },
      { id: "f86", name: "Mayonesa casera", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Cocinar el pavo molido en una sartén hasta que esté bien cocido.",
      "Sazonar con sal, pimienta y especias opcionales (ajo en polvo, cebolla en polvo).",
      "Cortar el aguacate en láminas.",
      "Lavar y secar las hojas de lechuga.",
      "Cortar el tomate en rodajas finas.",
      "Armar el wrap: colocar lechuga, pavo, aguacate y tomate sobre una superficie plana.",
      "Agregar mayonesa al gusto.",
      "Enrollar firmemente y cortar por la mitad."
    ],
    tips: "Usar hojas grandes de lechuga como 'tortilla' para una version muy baja en carbohidratos.",
    image: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-sopa-coliflor": {
    title: "Sopa Cremosa de Coliflor",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 2,
    calories: 280,
    protein: 8,
    fat: 24,
    carbs: 10,
    netCarbs: 5,
    fiber: 5,
    ingredients: [
      { id: "f24", name: "Coliflor", quantity: 400, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 100, unit: "ml" },
      { id: "f13", name: "Aceite de oliva", quantity: 30, unit: "ml" },
      { id: "f32", name: "Ajo", quantity: 8, unit: "g" },
      { id: "f37", name: "Queso parmesano", quantity: 20, unit: "g", optional: true }
    ],
    instructions: [
      "Cortar la coliflor en floretes.",
      "Sofreír el ajo picado en aceite de oliva hasta que esté fragante.",
      "Agregar la coliflor y cubrir con agua o caldo.",
      "Hervir durante 15-20 minutos hasta que esté muy tierna.",
      "Escurrir parcialmente, reservando el líquido.",
      "Agregar la nata y mezclar hasta obtener una consistencia cremosa.",
      "Usar una batidora de mano para hacer puré si se desea más suave.",
      "Sazonar con sal, pimienta y opcionalmente nutmeg.",
      "Servir con queso parmesano rallado por encima."
    ],
    tips: "Esta sopa es muy versátil. Agregar bacon crujiente, queso cheddar o espinacas para variar.",
    image: "https://images.pexels.com/photos/1188750/pexels-photo-1188750.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== CENAS ====================
  "cena-bistec-espinacas": {
    title: "Bistec con Espinacas Salteadas",
    category: "cena",
    mealType: "cena",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 1,
    calories: 550,
    protein: 48,
    fat: 38,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f7", name: "Carne de res (bistec)", quantity: 200, unit: "g" },
      { id: "f25", name: "Espinacas", quantity: 150, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 25, unit: "g" },
      { id: "f32", name: "Ajo", quantity: 5, unit: "g" }
    ],
    instructions: [
      "Sacar el bistec del refrigerador 20-30 minutos antes para que esté a temperatura ambiente.",
      "Sazonar generosamente con sal y pimienta ambos lados.",
      "Calentar una sartén de hierro fundido a fuego alto hasta que esté muy caliente.",
      "Sellar el bistec 3-4 minutos por lado para termino medio (o más para bien cocido).",
      "Retirar y descansar sobre una tabla 5 minutos.",
      "En la misma sartén, reducir el fuego y saltear el ajo en mantequilla por 1 minuto.",
      "Agregar las espinacas y cocinar hasta que se marchiten.",
      "Cortar el bistec en rodajas diagonales y servir con las espinacas."
    ],
    tips: "No mover el bistec mientras sella. Usar termómetro: 55°C para término medio, 60°C para tres cuartos.",
    image: "https://images.pexels.com/photos/1251168/pexels-photo-1251168.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-salmn-espárragos": {
    title: "Salmón al Horno con Espárragos",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 480,
    protein: 40,
    fat: 34,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f4", name: "Salmón", quantity: 180, unit: "g" },
      { id: "f77", name: "Espárragos", quantity: 150, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Precalentar el horno a 200°C.",
      "Forrar una bandeja con papel aluminio.",
      "Colocar los espárragos y rociar con aceite de oliva.",
      "Sazonar con sal y pimienta.",
      "Colocar el salmón sobre los espárragos.",
      "Untar el salmón con mantequilla y sazonar.",
      "Hornear durante 15-18 minutos hasta que el salmón esté cocido.",
      "Servir inmediatamente con un chorrito de limón."
    ],
    tips: "Para un acabado perfecto, terminar el salmón bajo el grill 2 minutos al final.",
    image: "https://images.pexels.com/photos/3691028/pexels-photo-3691028.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pollo-ajillo": {
    title: "Pollo al Ajillo",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "media",
    servings: 2,
    calories: 420,
    protein: 45,
    fat: 24,
    carbs: 4,
    netCarbs: 3,
    fiber: 1,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 300, unit: "g" },
      { id: "f32", name: "Ajo", quantity: 20, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 30, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 15, unit: "ml" },
      { id: "f39", name: "Nata para cocinar", quantity: 60, unit: "ml", optional: true }
    ],
    instructions: [
      "Cortar el pollo en piezas o filetes.",
      "Sazonar con sal, pimienta y hierbas (tomillo, romero).",
      "Dorar el pollo en aceite de oliva 4-5 minutos por lado.",
      "Retirar y reservar.",
      "En la misma sartén, sofreír el ajo entero o picado a fuego bajo.",
      "Agregar la mantequilla y cocinar hasta que se dore ligeramente.",
      "Si se desea, agregar nata para hacer salsa cremosa.",
      "Volver a poner el pollo y cubrir con la salsa.",
      "Cocinar a fuego bajo 5-10 minutos más."
    ],
    tips: "Esta receta es aún mejor al día siguiente cuando los sabores se han mezclado.",
    image: "https://images.pexels.com/photos/3160265/pexels-photo-3160265.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-gambas-pimiento": {
    title: "Gambas al Ajillo con Pimiento",
    category: "cena",
    mealType: "cena",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 350,
    protein: 32,
    fat: 24,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f47", name: "Camarones", quantity: 200, unit: "g" },
      { id: "f27", name: "Pimiento rojo", quantity: 100, unit: "g" },
      { id: "f32", name: "Ajo", quantity: 15, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 30, unit: "ml" },
      { id: "f88", name: "Vinagre manzana", quantity: 5, unit: "ml" }
    ],
    instructions: [
      "Pelar y limpiar los camarones si no están listos.",
      "Cortar el pimiento en tiras o cubos.",
      "Calentar el aceite de oliva en una sartén grande o wok.",
      "Agregar el ajo y cocinar 1 minuto hasta que esté fragante.",
      "Añadir los camarones y cocinar 2-3 minutos por lado.",
      "Agregar el pimiento y cocinar 2 minutos más.",
      "De-glasear con vinagre de manzana.",
      "Sazonar con sal y pimienta, decorar con perejil.",
      "Servir inmediatamente con pan bajo en carbohidratos si se desea."
    ],
    tips: "Usar vino blanco en lugar de vinagre para una versión más gourmet.",
    image: "https://images.pexels.com/photos/6999532/pexels-photo-6999532.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-burger-calabacin": {
    title: "Hamburguesa Keto con Calabacín",
    category: "cena",
    mealType: "cena",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 38,
    fat: 38,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f3", name: "Carne molida 80/20", quantity: 180, unit: "g" },
      { id: "f33", name: "Calabacín", quantity: 150, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 30, unit: "g" },
      { id: "f86", name: "Mayonesa casera", quantity: 15, unit: "g" },
      { id: "f29", name: "Lechuga", quantity: 30, unit: "g" }
    ],
    instructions: [
      "Formar la carne molida en una hamburguesa, sazonar con sal y pimienta.",
      "Cortar el calabacín en rodajas gruesas (0.5 cm).",
      "Saltear o asar las rodajas de calabacín hasta que estén doradas.",
      "Cocinar la hamburguesa a la plancha 3-4 minutos por lado.",
      "Agregar el queso cheddar en los últimos 2 minutos y tapar para que se derrita.",
      "Armar: base de calabacín, lechuga, hamburguesa, mayonesa.",
      "Tapar con otra rodaja de calabacín.",
      "Servir con pepinillos o cebolla encurtida si se desea."
    ],
    tips: "Mezclar la carne con huevo para que la hamburguesa mantenga su forma mejor.",
    image: "https://images.pexels.com/photos/2679500/pexels-photo-2679500.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-cordero-hongos": {
    title: "Cordero con Hongos y Romero",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "media",
    servings: 1,
    calories: 580,
    protein: 45,
    fat: 42,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f45", name: "Cordero", quantity: 200, unit: "g" },
      { id: "f26", name: "Champiñones", quantity: 150, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 25, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Marinar el cordero con aceite de oliva, romero, ajo, sal y pimienta por 30 minutos.",
      "Sellar el cordero en una sartén muy caliente 2-3 minutos por lado.",
      "Terminar en el horno a 180°C por 10-15 minutos para término medio.",
      "Mientras tanto, saltear los champiñones en mantequilla.",
      "Sazonar con sal, pimienta y hierbas frescas.",
      "Dejar reposar el cordero 5 minutos antes de cortar.",
      "Servir el cordero con los champiñones.",
      "Acompañar con una ensalada verde ligera."
    ],
    tips: "El cordero es más tierno si se cocina a término medio. Usar termómetro: 60°C interno.",
    image: "https://images.pexels.com/photos/2255777/pexels-photo-2255777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pollo-pesto": {
    title: "Pechuga de Pollo al Pesto",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 480,
    protein: 50,
    fat: 28,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 200, unit: "g" },
      { id: "f25", name: "Espinacas", quantity: 60, unit: "g" },
      { id: "f37", name: "Queso parmesano", quantity: 25, unit: "g" },
      { id: "f17", name: "Almendras", quantity: 20, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 45, unit: "ml" }
    ],
    instructions: [
      "Para el pesto: procesar espinacas, parmesano, almendras y ajo en procesador.",
      "Añadir aceite de oliva gradualmente hasta obtener consistencia cremosa.",
      "Sazonar con sal y pimienta.",
      "Sazonar el pollo y cocinar a la plancha o horno.",
      "Untar generosamente con pesto una vez que el pollo esté cocido.",
      "Servir con vegetales al vapor o ensalada."
    ],
    tips: "El pesto casero se mantiene hasta 1 semana en el refrigerador. También sirve con calabacín en espiral.",
    image: "https://images.pexels.com/photos/5409603/pexels-photo-5409603.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== SNACKS ====================
  "snack-almendras-queso": {
    title: "Almendras con Queso Cheddar",
    category: "snacks",
    mealType: "snacks",
    prepTime: 2,
    difficulty: "muy fácil",
    servings: 1,
    calories: 280,
    protein: 12,
    fat: 26,
    carbs: 4,
    netCarbs: 2,
    fiber: 2,
    ingredients: [
      { id: "f17", name: "Almendras", quantity: 30, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 40, unit: "g" }
    ],
    instructions: [
      "Servir las almendras en un pequeño bowl.",
      "Cortar o rallar el queso cheddar.",
      "Combinar o servir por separado.",
      "Disfrutar como snack entre comidas."
    ],
    tips: "Elegir almendras crudas sin sal para opción más saludable. El queso de colores intensos tiene más sabor.",
    image: "https://images.pexels.com/photos/4207904/pexels-photo-4207904.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-aguacate-huevo": {
    title: "Mitad de Aguacate con Huevo",
    category: "snacks",
    mealType: "snacks",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 280,
    protein: 10,
    fat: 24,
    carbs: 8,
    netCarbs: 4,
    fiber: 4,
    ingredients: [
      { id: "f12", name: "Aguacate", quantity: 100, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 50, unit: "g" },
      { id: "f87", name: "Mostaza Dijon", quantity: 3, unit: "g", optional: true }
    ],
    instructions: [
      "Precalentar el horno a 180°C.",
      "Cortar el aguacate por la mitad y quitar el hueso.",
      "Hacer un hueco más grande en el centro del aguacate si es necesario.",
      "Colocar el aguacate en un molde para que no se vuelque.",
      "Romper el huevo y verter en el hueco del aguacate.",
      "Sazonar con sal, pimienta y opcionalmente mostaza.",
      "Hornear 12-15 minutos hasta que el huevo esté cocido.",
      "Servir inmediatamente."
    ],
    tips: "Para evitar que el aguacate se vuelque, cortar una pequeña parte de la base.",
    image: "https://images.pexels.com/photos/557663/pexels-photo-557663.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-huevos-cocidos": {
    title: "Huevos Cocidos con Mayonesa",
    category: "snacks",
    mealType: "snacks",
    prepTime: "12 min",
    difficulty: "fácil",
    servings: 1,
    calories: 250,
    protein: 16,
    fat: 20,
    carbs: 1,
    netCarbs: 1,
    fiber: 0,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f86", name: "Mayonesa casera", quantity: 20, unit: "g" },
      { id: "f87", name: "Mostaza Dijon", quantity: 3, unit: "g", optional: true }
    ],
    instructions: [
      "Colocar los huevos en agua fría y llevar a hervir.",
      "Una vez que hierva, cocinar 10 minutos exactos.",
      "Inmediatamente transferir a agua con hielo para detener la cocción.",
      "Pelarlos después de 5 minutos en agua fría.",
      "Cortar por la mitad y untar con mayonesa.",
      "Sazonar con sal, pimienta y mostaza.",
      "Opcional: espolvorear con pimentón o cebollino."
    ],
    tips: "Los huevos más frescos son más difíciles de pelar. Usar huevos de al menos 1 semana.",
    image: "https://images.pexels.com/photos/162967/pexels-photo-162967.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-rollitos-jamon": {
    title: "Rollitos de Jamón con Queso",
    category: "snacks",
    mealType: "snacks",
    prepTime: 5,
    difficulty: "muy fácil",
    servings: 1,
    calories: 220,
    protein: 20,
    fat: 15,
    carbs: 2,
    netCarbs: 1,
    fiber: 1,
    ingredients: [
      { id: "f51", name: "Jamon serrano", quantity: 60, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 30, unit: "g" },
      { id: "f38", name: "Queso crema", quantity: 20, unit: "g", optional: true }
    ],
    instructions: [
      "Extender las lonchas de jamón en una superficie plana.",
      "Si se desea, untar una capa fina de queso crema.",
      "Colocar el queso cheddar en un extremo.",
      "Enrollar firmemente desde el extremo con queso.",
      "Cortar por la mitad si se desea.",
      "Servir a temperatura ambiente o frío."
    ],
    tips: "Pueden prepararse con anticipación y mantenerse en el refrigerador hasta 2 días.",
    image: "https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-verduras-hummus": {
    title: "Palitos de Verdura con Hummus Keto",
    category: "snacks",
    mealType: "snacks",
    prepTime: 8,
    difficulty: "fácil",
    servings: 1,
    calories: 150,
    protein: 4,
    fat: 10,
    carbs: 10,
    netCarbs: 6,
    fiber: 4,
    ingredients: [
      { id: "f27", name: "Pimiento rojo", quantity: 80, unit: "g" },
      { id: "f28", name: "Pepino", quantity: 80, unit: "g" },
      { id: "f23", name: "Brócoli", quantity: 60, unit: "g" },
      { id: "f89", name: "Hummus bajo carb", quantity: 40, unit: "g" }
    ],
    instructions: [
      "Lavar y cortar todas las verduras en palitos o flores.",
      "Servir con el hummus bajo en carbohidratos.",
      "Dippear los vegetales en el hummus.",
      "Disfrutar inmediatamente."
    ],
    tips: "Preparar los vegetales con anticipación y guardarlos en agua fría crujirán más.",
    image: "https://images.pexels.com/photos/2470170/pexels-photo-2470170.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-bombones-almendra": {
    title: "Bombones de Almendra y Chocolate",
    category: "snacks",
    mealType: "snacks",
    prepTime: "15 min",
    difficulty: "media",
    servings: 4,
    calories: 180,
    protein: 4,
    fat: 16,
    carbs: 6,
    netCarbs: 3,
    fiber: 3,
    ingredients: [
      { id: "f43", name: "Chocolate negro 90%", quantity: 60, unit: "g" },
      { id: "f17", name: "Almendras", quantity: 40, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 10, unit: "g" },
      { id: "f85", name: "Eritritol", quantity: 5, unit: "g", optional: true }
    ],
    instructions: [
      "Tostar ligeramente las almendras en una sartén.",
      "Derretir el chocolate con mantequilla a baño maría.",
      "Mezclar las almendras en el chocolate fundido.",
      "Colocar cucharadas de la mezcla en papeles para bombones o silicona.",
      "Enfriar en el refrigerador hasta que endurezcan.",
      "Guardar en lugar fresco."
    ],
    tips: "Agregar sal marina en escamas encima para contraste de sabor dulce-salado.",
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-cottage-pina": {
    title: "Queso Cottage con Piña Keto",
    category: "snacks",
    mealType: "snacks",
    prepTime: 3,
    difficulty: "muy fácil",
    servings: 1,
    calories: 180,
    protein: 14,
    fat: 8,
    carbs: 12,
    netCarbs: 10,
    fiber: 2,
    ingredients: [
      { id: "f59", name: "Queso cottage", quantity: 150, unit: "g" },
      { id: "f80", name: "Avellanas", quantity: 20, unit: "g" },
      { id: "f85", name: "Eritritol", quantity: 3, unit: "g", optional: true }
    ],
    instructions: [
      "Servir el queso cottage en un bowl.",
      "Espolvorear con eritritol si se desea.",
      "Agregar las avellanas picadas por encima.",
      "Mezclar o comer por capas.",
      "Disfrutar frío."
    ],
    tips: "El queso cottage es alto en proteína y bajo en calorías. Perfecto para snacks nocturnos.",
    image: "https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-pepitas-chia": {
    title: "Mix de Semillas y Frutos Secos",
    category: "snacks",
    mealType: "snacks",
    prepTime: 2,
    difficulty: "muy fácil",
    servings: 1,
    calories: 200,
    protein: 6,
    fat: 18,
    carbs: 6,
    netCarbs: 3,
    fiber: 3,
    ingredients: [
      { id: "f21", name: "Semillas de chía", quantity: 15, unit: "g" },
      { id: "f83", name: "Pepitas calabaza", quantity: 15, unit: "g" },
      { id: "f82", name: "Semillas hemp", quantity: 10, unit: "g" },
      { id: "f19", name: "Macadamia", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Mezclar todos los ingredientes en un bowl.",
      "Servir inmediatamente o guardar en un frasco.",
      "Consumir como snack entre comidas.",
      "Opcional: agregar coco rallado o chocolate negro para variar."
    ],
    tips: "Este mix es rico en omega-3 y grasas saludables. Dura hasta 2 semanas en contenedor hermético.",
    image: "https://images.pexels.com/photos/5946/pexels-photo-5946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== DESAYUNOS ADICIONALES ====================
  "desayuno-francesa-keto": {
    title: "Tostada Francesa Keto",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "12 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 16,
    fat: 32,
    carbs: 8,
    netCarbs: 4,
    fiber: 4,
    ingredients: [
      { id: "f93", name: "Pan keto bajo carb", quantity: 80, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" },
      { id: "f96", name: "Canela", quantity: 3, unit: "g", optional: true }
    ],
    instructions: [
      "Batir los huevos con canela y esencia de vainilla opcional.",
      "Calentar la mantequilla en una sartén a fuego medio.",
      "Sumergir ligeramente el pan keto en la mezcla de huevos.",
      "Cocinar 2-3 minutos por cada lado hasta dorar.",
      "Servir con mantequilla adicional y eritritol espolvoreado."
    ],
    tips: "El pan keto debe tener al menos 3g de net carbs por porción. Marcar con canela para sabor adicional.",
    image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-chaffles": {
    title: "Chaffles de Queso",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 2,
    calories: 280,
    protein: 18,
    fat: 22,
    carbs: 2,
    netCarbs: 1,
    fiber: 1,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 80, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Mezclar los huevos batidos con el queso mozzarella rallado.",
      "Calentar la waflera para chaffles a temperatura media-alta.",
      "Engrasar ligeramente con mantequilla.",
      "Verter la mitad de la mezcla en la waflera.",
      "Cocinar 3-4 minutos hasta que esté dorado y crujiente.",
      "Repetir con la segunda mitad.",
      "Servir como base para toppings dulces o salados."
    ],
    tips: "Los chaffles se mantienen crujientes. Preparar en batch y tostar antes de usar para mejor textura.",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-smoothie-proteico": {
    title: "Smoothie Proteico de Chocolate",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: 5,
    difficulty: "muy fácil",
    servings: 1,
    calories: 340,
    protein: 28,
    fat: 22,
    carbs: 10,
    netCarbs: 6,
    fiber: 4,
    ingredients: [
      { id: "f60", name: "Yogur griego natural", quantity: 150, unit: "g" },
      { id: "f97", name: "Proteína whey chocolate", quantity: 30, unit: "g" },
      { id: "f15", name: "Aceite de coco", quantity: 10, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 50, unit: "g" },
      { id: "f98", name: "Leche almendras", quantity: 100, unit: "ml" }
    ],
    instructions: [
      "Agregar todos los ingredientes en la licuadora.",
      "Licuar a alta velocidad por 30-45 segundos.",
      "Verificar consistencia: agregar más leche si está muy espeso.",
      "Verter en un vaso alto.",
      "Decorar con coco rallado o cacao nibs."
    ],
    tips: "Usar hielo para un smoothie más frío y espeso. Esta versión funciona como comida completa.",
    image: "https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-huevos-rancheros": {
    title: "Huevos Rancheros Keto",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 420,
    protein: 24,
    fat: 34,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f27", name: "Pimiento rojo", quantity: 60, unit: "g" },
      { id: "f30", name: "Tomate", quantity: 80, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 40, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Cortar pimientos y tomates en cubos pequeños.",
      "Saltear los vegetales en mantequilla por 3-4 minutos.",
      "Sazonar con comino, pimentón y chile en polvo.",
      "Hacer pozos en las verduras y romper los huevos.",
      "Tapar y cocinar a fuego bajo 5-7 minutos.",
      "Espolvorear queso cheddar y tapar hasta que se derrita.",
      "Decorar con cilantro fresco si se desea."
    ],
    tips: "Para más proteína, agregar trozos de chorizo keto o tocino. Servir con aguacate al lado.",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-muffin-atun": {
    title: "Muffins de Atún y Queso",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "20 min",
    difficulty: "media",
    servings: 4,
    calories: 180,
    protein: 18,
    fat: 12,
    carbs: 2,
    netCarbs: 1,
    fiber: 1,
    ingredients: [
      { id: "f8", name: "Atún", quantity: 200, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 40, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 30, unit: "ml" },
      { id: "f26", name: "Champiñones", quantity: 30, unit: "g" }
    ],
    instructions: [
      "Precalentar el horno a 180°C.",
      "Escurrir bien el atún y deshacerlo.",
      "Picar finamente los champiñones.",
      "Mezclar huevos, nata, queso y vegetales.",
      "Agregar el atún y sazonar.",
      "Verter en moldes para muffins engrasados.",
      "Hornear 15-18 minutos hasta que estén firmes.",
      "Enfriar antes de desmoldar."
    ],
    tips: "Perfectos para meal prep. Duran hasta 4 días en el refrigerador. Calentar 30 segundos antes de comer.",
    image: "https://images.pexels.com/photos/7699696/pexels-photo-7699696.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== ALMUERZOS ADICIONALES ====================
  "almuerzo-bowl-california": {
    title: "Bowl California Keto",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 38,
    fat: 38,
    carbs: 10,
    netCarbs: 6,
    fiber: 4,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 150, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 100, unit: "g" },
      { id: "f29", name: "Lechuga", quantity: 100, unit: "g" },
      { id: "f27", name: "Pimiento rojo", quantity: 50, unit: "g" },
      { id: "f28", name: "Pepino", quantity: 60, unit: "g" },
      { id: "f86", name: "Mayonesa casera", quantity: 20, unit: "g" }
    ],
    instructions: [
      "Cortar el pollo en tiras y cocinar a la plancha con sal y pimienta.",
      "Mientras se cocina, preparar la base de lechuga en un bowl.",
      "Cortar aguacate, pimiento y pepino en cubos.",
      "Armar el bowl: lechuga base, pollo, aguacate, vegetales.",
      "Rociar con mayonesa y sazonar.",
      "Opcional: agregar semillas de sésamo."
    ],
    tips: "El pollo puede reemplazarse por camarones o tofu para variar. Añadir edamame para más proteína.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-berenjena-parmesano": {
    title: "Berenjena a la Parmegiana",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "30 min",
    difficulty: "media",
    servings: 2,
    calories: 380,
    protein: 22,
    fat: 28,
    carbs: 12,
    netCarbs: 8,
    fiber: 4,
    ingredients: [
      { id: "f48", name: "Berenjena", quantity: 300, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 80, unit: "g" },
      { id: "f37", name: "Queso parmesano", quantity: 30, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 100, unit: "ml" },
      { id: "f30", name: "Tomate", quantity: 100, unit: "g" }
    ],
    instructions: [
      "Cortar la berenjena en rodajas de 1cm.",
      "Salan y dejar reposar 15 minutos para eliminar amargor.",
      "Secar y hornear a 200°C por 20 minutos.",
      "Preparar salsa: cocinar tomates con ajo y orégano.",
      "En una bandeja, alternar capas: berenjena, salsa, mozzarella.",
      "Terminar con parmesano y hornear 15 minutos.",
      "Gratinar 3-5 minutos hasta dorar."
    ],
    tips: "La berenjena al horno代替 frita reduce calorías significativamente.",
    image: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-salmn-cake": {
    title: "Pastel de Salmón Keto",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "media",
    servings: 2,
    calories: 450,
    protein: 32,
    fat: 34,
    carbs: 4,
    netCarbs: 2,
    fiber: 2,
    ingredients: [
      { id: "f4", name: "Salmón", quantity: 250, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 50, unit: "g" },
      { id: "f26", name: "Champiñones", quantity: 50, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Procesar el salmón limpio (sin espinas) hasta obtener pasta.",
      "Mezclar con huevos, queso rallado y champiñones picados.",
      "Sazonar con sal, pimienta y eneldo.",
      "Verter en moldes engrasados.",
      "Hornear a 180°C por 20-25 minutos.",
      "Dejar enfriar 5 minutos antes de desmoldar.",
      "Servir con ensalada verde o mayonesa."
    ],
    tips: "Se puede hacer en muffin tins para porciones individuales. Congela bien hasta 1 mes.",
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-tarta-atun": {
    title: "Tarta Templada de Atún",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 2,
    calories: 400,
    protein: 30,
    fat: 28,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f8", name: "Atún", quantity: 200, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f35", name: "Queso mozzarella", quantity: 60, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 80, unit: "ml" },
      { id: "f25", name: "Espinacas", quantity: 50, unit: "g" }
    ],
    instructions: [
      "Precalentar el horno a 180°C.",
      "Escurrir el atún y mezclar con huevos batidos.",
      "Agregar espinacas cocidas, mozzarella y nata.",
      "Sazonar con sal, pimienta y hierbas.",
      "Verter en un molde redondo o individual.",
      "Hornear 15-18 minutos hasta que esté firme.",
      "Dejar reposar 5 minutos antes de cortar."
    ],
    tips: "Esta tarta es excelente fría también. Preparar la noche anterior para lunch.",
    image: "https://images.pexels.com/photos/3270893/pexels-photo-3270893.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-kebab-pollo": {
    title: "Kebab de Pollo con Salsa Tzatziki",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "media",
    servings: 1,
    calories: 480,
    protein: 42,
    fat: 30,
    carbs: 10,
    netCarbs: 6,
    fiber: 4,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 180, unit: "g" },
      { id: "f29", name: "Lechuga", quantity: 80, unit: "g" },
      { id: "f30", name: "Tomate", quantity: 60, unit: "g" },
      { id: "f28", name: "Pepino", quantity: 50, unit: "g" },
      { id: "f99", name: "Tzatziki keto", quantity: 40, unit: "g" }
    ],
    instructions: [
      "Cortar el pollo en cubos grandes.",
      "Marinar con aceite de oliva, ajo, orégano y limón por 15 minutos.",
      "Ensartar en pinchos o cocinar en sartén.",
      "Cocinar 4-5 minutos por lado hasta dorar.",
      "Preparar los vegetales: cortar lechuga, tomate y pepino.",
      "Servir el pollo sobre los vegetales.",
      "Acompañar con salsa tzatziki keto."
    ],
    tips: "Para tzatziki keto: mezclar yogur griego, pepino rallado, ajo y eneldo.",
    image: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== CENAS ADICIONALES ====================
  "cena-cerdo-manzana": {
    title: "Solomillo de Cerdo con Manzana",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "media",
    servings: 1,
    calories: 520,
    protein: 42,
    fat: 32,
    carbs: 10,
    netCarbs: 8,
    fiber: 2,
    ingredients: [
      { id: "f46", name: "Solomillo de cerdo", quantity: 180, unit: "g" },
      { id: "f100", name: "Manzana verde", quantity: 80, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 25, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 10, unit: "ml" },
      { id: "f25", name: "Espinacas", quantity: 80, unit: "g" }
    ],
    instructions: [
      "Sazonar el solomillo con sal, pimienta y tomillo.",
      "Sellar en aceite de oliva a fuego alto 2-3 minutos por lado.",
      "Reducir fuego y cocinar 10-12 minutos más.",
      "Retirar y descansar 5 minutos.",
      "En la misma sartén, derretir mantequilla y cocinar manzana en rodajas.",
      "Saltear espinacas brevemente.",
      "Cortar solomillo y servir con manzana y espinacas."
    ],
    tips: "Las manzanas verdes tienen menos azúcar que las rojas. Usar термометр para punto de cocción: 60°C.",
    image: "https://images.pexels.com/photos/15440244/pexels-photo-15440244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pollo-curry": {
    title: "Curry de Pollo Keto",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "media",
    servings: 2,
    calories: 480,
    protein: 38,
    fat: 34,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 250, unit: "g" },
      { id: "f24", name: "Coliflor", quantity: 200, unit: "g" },
      { id: "f39", name: "Nata para cocinar", quantity: 120, unit: "ml" },
      { id: "f32", name: "Ajo", quantity: 10, unit: "g" },
      { id: "f101", name: "Pasta curry", quantity: 15, unit: "g" },
      { id: "f13", name: "Aceite de coco", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Cortar pollo en trozos y marinar con pasta curry.",
      "Sofreír ajo en aceite de coco por 1 minuto.",
      "Agregar pollo y cocinar hasta dorar.",
      "Añadir coliflor en floretes pequeños.",
      "Verter nata y mezclar bien.",
      "Cocinar a fuego bajo 15 minutos.",
      "Sazonar y servir caliente.",
      "Acompañar con arroz de coliflor si se desea."
    ],
    tips: "La salsa curry es naturalmente keto si no se usa harina. Verificar que la pasta curry no tenga azúcar añadida.",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-bacalao-alhorno": {
    title: "Bacalao al Horno con Tomates",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 42,
    fat: 20,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f49", name: "Bacalao", quantity: 200, unit: "g" },
      { id: "f30", name: "Tomate", quantity: 150, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 25, unit: "ml" },
      { id: "f32", name: "Ajo", quantity: 8, unit: "g" },
      { id: "f25", name: "Espinacas", quantity: 60, unit: "g" }
    ],
    instructions: [
      "Precalentar horno a 200°C.",
      "Colocar filetes de bacalao en bandeja con papel aluminio.",
      "Cortar tomates cherry por la mitad y distribuir alrededor.",
      "Rociar todo con aceite de oliva y ajo picado.",
      "Sazonar con sal, pimienta y hierbas.",
      "Hornear 15-18 minutos hasta que el bacalao se desprenda.",
      "Saltear espinacas y servir como guarnición."
    ],
    tips: "El bacalao es muy bajo en grasa, añadir aceite de oliva es esencial para los macros.",
    image: "https://images.pexels.com/photos/262947/pexels-photo-262947.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-stirfry-camarones": {
    title: "Stir Fry de Camarones",
    category: "cena",
    mealType: "cena",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 360,
    protein: 34,
    fat: 22,
    carbs: 8,
    netCarbs: 5,
    fiber: 3,
    ingredients: [
      { id: "f47", name: "Camarones", quantity: 200, unit: "g" },
      { id: "f33", name: "Calabacín", quantity: 150, unit: "g" },
      { id: "f27", name: "Pimiento rojo", quantity: 80, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 20, unit: "ml" },
      { id: "f32", name: "Ajo", quantity: 8, unit: "g" }
    ],
    instructions: [
      "Pelar y limpiar los camarones si es necesario.",
      "Cortar calabacín y pimientos en tiras.",
      "Calentar aceite en wok o sartén grande a fuego alto.",
      "Agregar ajo y cocinar 30 segundos.",
      "Añadir camarones y cocinar 2-3 minutos.",
      "Agregar vegetales y saltear 3-4 minutos.",
      "Sazonar con salsa de soja (tamari) y pimienta.",
      "Servir inmediatamente."
    ],
    tips: "Para versión más keto, usar salsa de ostras sin azúcar o salsa de pescado.",
    image: "https://images.pexels.com/photos/6999532/pexels-photo-6999532.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pechuga-rellena": {
    title: "Pechuga de Pollo Rellena",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "media",
    servings: 1,
    calories: 500,
    protein: 52,
    fat: 28,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f2", name: "Pechuga de pollo", quantity: 200, unit: "g" },
      { id: "f36", name: "Queso cheddar", quantity: 50, unit: "g" },
      { id: "f30", name: "Tomate", quantity: 60, unit: "g" },
      { id: "f26", name: "Champiñones", quantity: 50, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Hacer un corte profundo en la pechuga formando un bolsillo.",
      "Sazonar por dentro y por fuera.",
      "Rellenar con queso cheddar, tomates y champiñones.",
      "Cerrar con palillos si es necesario.",
      "Sellar en sartén con mantequilla 2 minutos por lado.",
      "Hornear a 180°C por 20-25 minutos.",
      "Dejar descansar 5 minutos antes de cortar.",
      "Servir con la salsa que se forme."
    ],
    tips: "Usartermómetro: 74°C interno. El queso mantiene todo junto mientras se cocina.",
    image: "https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== SNACKS ADICIONALES ====================
  "snack-fat-bomb": {
    title: "Fat Bombs de Chocolate",
    category: "snacks",
    mealType: "snacks",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 8,
    calories: 150,
    protein: 3,
    fat: 14,
    carbs: 4,
    netCarbs: 2,
    fiber: 2,
    ingredients: [
      { id: "f43", name: "Chocolate negro 90%", quantity: 80, unit: "g" },
      { id: "f102", name: "Crema coco", quantity: 60, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 30, unit: "g" },
      { id: "f85", name: "Eritritol", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Derretir chocolate con mantequilla a baño maría.",
      "Agregar crema de coco y eritritol.",
      "Mezclar hasta obtener consistencia suave.",
      "Verter en moldes de silicone o papeles para bombones.",
      "Refrigerar por 2 horas hasta que endurezcan.",
      "Guardar en fridge hasta 2 semanas."
    ],
    tips: "Estas son excelentes para mantener cetosis. Comer 1-2 como snack cuando se necesite energía.",
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-queso-horneado": {
    title: "Queso Horneado con Hierbas",
    category: "snacks",
    mealType: "snacks",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 4,
    calories: 180,
    protein: 10,
    fat: 15,
    carbs: 2,
    netCarbs: 1,
    fiber: 1,
    ingredients: [
      { id: "f36", name: "Queso cheddar", quantity: 200, unit: "g" },
      { id: "f37", name: "Queso parmesano", quantity: 30, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 10, unit: "ml" },
      { id: "f103", name: "Hierbas provenzales", quantity: 5, unit: "g" }
    ],
    instructions: [
      "Precalentar el horno a 200°C.",
      "Colocar queso cheddar en una bandeja para horno.",
      "Hacer cortes en forma de cuadrícula sin penetrar.",
      "Rociar con aceite de oliva y espolvorear hierbas.",
      "Hornear 10-12 minutos hasta que esté dorado.",
      "Servir caliente con palillos."
    ],
    tips: "Pueden prepararse varios tipos de queso. El gouda y el emmental también funcionan muy bien.",
    image: "https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-gelatina-keto": {
    title: "Gelatina de Colágeno",
    category: "snacks",
    mealType: "snacks",
    prepTime: 5,
    difficulty: "muy fácil",
    servings: 1,
    calories: 80,
    protein: 18,
    fat: 0,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    ingredients: [
      { id: "f104", name: "Colágeno hidrolizado", quantity: 20, unit: "g" },
      { id: "f88", name: "Vinagre manzana", quantity: 5, unit: "ml" },
      { id: "f84", name: "Stevia", quantity: 2, unit: "g", optional: true }
    ],
    instructions: [
      "Disolver colágeno en agua tibia o fría.",
      "Agregar vinagre de manzana.",
      "Endulzar con stevia si se desea.",
      "Beber inmediatamente o refrigerar.",
      "También puede prepararse como gelatina con agar-agar."
    ],
    tips: "El colágeno apoya la salud de articulaciones y piel. Ideal antes de dormir.",
    image: "https://images.pexels.com/photos/3785451/pexels-photo-3785451.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-aceitunas-queso": {
    title: "Aceitunas con Queso Feta",
    category: "snacks",
    mealType: "snacks",
    prepTime: 2,
    difficulty: "muy fácil",
    servings: 1,
    calories: 180,
    protein: 8,
    fat: 16,
    carbs: 4,
    netCarbs: 2,
    fiber: 2,
    ingredients: [
      { id: "f105", name: "Aceitunas kalamata", quantity: 50, unit: "g" },
      { id: "f40", name: "Queso feta", quantity: 50, unit: "g" },
      { id: "f13", name: "Aceite de oliva", quantity: 10, unit: "ml" }
    ],
    instructions: [
      "Colocar las aceitunas en un bowl.",
      "Agregar el queso feta en cubos.",
      "Rociar con aceite de oliva.",
      "Sazonar con orégano si se desea.",
      "Servir a temperatura ambiente."
    ],
    tips: "Las aceitunas son ricas en grasas monoinsaturadas. Combinar con queso aumenta la saciedad.",
    image: "https://images.pexels.com/photos/5946/pexels-photo-5946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  }
};

// Función para obtener todas las recetas
function getAllKetoRecipes() {
  return Object.keys(KETO_RECIPES).map(function(key) {
    return { id: key, ...KETO_RECIPES[key] };
  });
}

// Función para obtener recetas por tipo de comida
function getRecipesByMealType(mealType) {
  return Object.keys(KETO_RECIPES)
    .filter(function(key) { return KETO_RECIPES[key].mealType === mealType; })
    .map(function(key) { return { id: key, ...KETO_RECIPES[key] }; });
}

// Función para obtener receta por ID
function getRecipeById(recipeId) {
  return KETO_RECIPES[recipeId] || null;
}

// Función para calcular macros totales de una receta
function calculateRecipeMacros(recipe) {
  return {
    calories: recipe.calories,
    protein: recipe.protein,
    fat: recipe.fat,
    carbs: recipe.carbs,
    netCarbs: recipe.netCarbs,
    fiber: recipe.fiber
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KETO_RECIPES, getAllKetoRecipes, getRecipesByMealType, getRecipeById, calculateRecipeMacros };
}

console.log('[RecipeDetails] Recetas cargadas:', Object.keys(KETO_RECIPES).length);
console.log('[RecipeDetails] Funciones disponibles: getRecipesByMealType =', typeof getRecipesByMealType);
