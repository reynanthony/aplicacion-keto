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
    image: "https://images.pexels.com/photos/34581425/pexels-photo-34581425.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/37547474/pexels-photo-37547474.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/23784968/pexels-photo-23784968.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/10934498/pexels-photo-10934498.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/31882545/pexels-photo-31882545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/36936952/pexels-photo-36936952.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/17580946/pexels-photo-17580946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/20778523/pexels-photo-20778523.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/17615602/pexels-photo-17615602.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/37099928/pexels-photo-37099928.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/37336824/pexels-photo-37336824.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/7731673/pexels-photo-7731673.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/31233881/pexels-photo-31233881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/5850335/pexels-photo-5850335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/5112510/pexels-photo-5112510.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/5638535/pexels-photo-5638535.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/33795555/pexels-photo-33795555.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/6004206/pexels-photo-6004206.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/20859994/pexels-photo-20859994.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/28584246/pexels-photo-28584246.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/34227783/pexels-photo-34227783.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/27850084/pexels-photo-27850084.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/35339143/pexels-photo-35339143.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/30624291/pexels-photo-30624291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/31823015/pexels-photo-31823015.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/6529607/pexels-photo-6529607.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/15913456/pexels-photo-15913456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/29538424/pexels-photo-29538424.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/792027/pexels-photo-792027.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/7111475/pexels-photo-7111475.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/25390051/pexels-photo-25390051.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/11158836/pexels-photo-11158836.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/15279743/pexels-photo-15279743.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/6550713/pexels-photo-6550713.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
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
    image: "https://images.pexels.com/photos/34293330/pexels-photo-34293330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== RECETAS NO-KETO AMPLIADAS (para plan basado en macros) ====================
  
  // DESAYUNOS
  "desayuno-avena-frutos": {
    title: "Avena con Frutos Rojos y Nueces",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 435,
    protein: 12,
    fat: 14,
    carbs: 65,
    netCarbs: 45,
    fiber: 20,
    ingredients: [
      { id: "f201", name: "Avena integral", quantity: 80, unit: "g" },
      { id: "f202", name: "Leche almendra", quantity: 200, unit: "ml" },
      { id: "f203", name: "Frutos rojos", quantity: 100, unit: "g" },
      { id: "f204", name: "Nueces", quantity: 20, unit: "g" },
      { id: "f205", name: "Miel", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Cocinar la avena con leche de almendra por 5 minutos.",
      "Agregar los frutos rojos.",
      "Decorar con nueces picadas y miel."
    ],
    tips: "La avena es rica en fibra, ideal para energía sostenida.",
    image: "https://images.pexels.com/photos/9018852/pexels-photo-9018852.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-tostada-aguacate": {
    title: "Tostada Integral con Aguacate y Huevo",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 18,
    fat: 22,
    carbs: 35,
    netCarbs: 25,
    fiber: 10,
    ingredients: [
      { id: "f206", name: "Pan integral", quantity: 60, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 80, unit: "g" },
      { id: "f1", name: "Huevo", quantity: 100, unit: "g" },
      { id: "f207", name: "Sal", quantity: 2, unit: "g" }
    ],
    instructions: [
      "Tostar el pan integral.",
      "Machacar el aguacate y untar sobre la tostada.",
      "Cocinar el huevo a tu gusto y colocar encima.",
      "Sazonar con sal."
    ],
    tips: "Combina carbohidratos complejos con proteína y grasa saludable.",
    image: "https://images.pexels.com/photos/7936659/pexels-photo-7936659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-yogur-gr": {
    title: "Yogur Griego con Fruta y Granola",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "5 min",
    difficulty: "fácil",
    servings: 1,
    calories: 320,
    protein: 20,
    fat: 10,
    carbs: 42,
    netCarbs: 38,
    fiber: 4,
    ingredients: [
      { id: "f208", name: "Yogur griego", quantity: 150, unit: "g" },
      { id: "f209", name: "Plátano", quantity: 80, unit: "g" },
      { id: "f210", name: "Granola", quantity: 40, unit: "g" },
      { id: "f211", name: "Moras", quantity: 50, unit: "g" }
    ],
    instructions: [
      "Verter el yogur en un bowl.",
      "Agregar la fruta en rodajas.",
      "Espolvorear granola y moras.",
      "Servir frío."
    ],
    tips: "Alto en proteína, ideal post-entrenamiento.",
    image: "https://images.pexels.com/photos/28097277/pexels-photo-28097277.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-smoothie-proteina": {
    title: "Batido de Proteína con Frutos Rojos",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "5 min",
    difficulty: "fácil",
    servings: 1,
    calories: 340,
    protein: 30,
    fat: 8,
    carbs: 38,
    netCarbs: 32,
    fiber: 6,
    ingredients: [
      { id: "f212", name: "Proteína en polvo", quantity: 30, unit: "g" },
      { id: "f213", name: "Leche", quantity: 250, unit: "ml" },
      { id: "f203", name: "Frutos rojos", quantity: 80, unit: "g" },
      { id: "f214", name: "Plátano congelado", quantity: 80, unit: "g" }
    ],
    instructions: [
      "Licuar todos los ingredientes hasta obtener consistencia cremosa.",
      "Servir inmediatamente."
    ],
    tips: "Ideal para días de entrenamiento intenso.",
    image: "https://images.pexels.com/photos/1438080/pexels-photo-1438080.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-huevos-revueltos-avena": {
    title: "Huevos Revueltos con Avena y Verduras",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 420,
    protein: 25,
    fat: 18,
    carbs: 40,
    netCarbs: 30,
    fiber: 10,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f201", name: "Avena cocida", quantity: 80, unit: "g" },
      { id: "f215", name: "Champiñones", quantity: 50, unit: "g" },
      { id: "f216", name: "Espinacas", quantity: 30, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Saltear verduras en mantequilla.",
      "Agregar huevos batidos y revolver.",
      "Incorporar avena cocida.",
      "Sazonar y servir."
    ],
    tips: "Desayuno completo con carbs, proteína y veggies.",
    image: "https://images.pexels.com/photos/35989075/pexels-photo-35989075.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-panqueques-avena": {
    title: "Panqueques de Avena con Fruta",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "20 min",
    difficulty: "medio",
    servings: 2,
    calories: 380,
    protein: 14,
    fat: 10,
    carbs: 60,
    netCarbs: 45,
    fiber: 15,
    ingredients: [
      { id: "f201", name: "Avena", quantity: 100, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 100, unit: "g" },
      { id: "f217", name: "Leche leche", quantity: 100, unit: "ml" },
      { id: "f218", name: "Arándanos", quantity: 50, unit: "g" },
      { id: "f205", name: "Miel", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Licuar avena, huevos y leche.",
      "Cocinar en sartén hasta dorar.",
      "Servir con arándanos y miel."
    ],
    tips: "Panqueques saludables sin harina refinada.",
    image: "https://images.pexels.com/photos/37354115/pexels-photo-37354115.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ALMUERZOS
  "almuerzo-ensalada-quinoa-pollo": {
    title: "Ensalada de Quinoa con Pollo a la Plancha",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 42,
    fat: 18,
    carbs: 50,
    netCarbs: 35,
    fiber: 15,
    ingredients: [
      { id: "f219", name: "Quinoa cocida", quantity: 120, unit: "g" },
      { id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" },
      { id: "f221", name: "Lechuga", quantity: 80, unit: "g" },
      { id: "f222", name: "Tomate cherry", quantity: 60, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" },
      { id: "f223", name: "Limón", quantity: 30, unit: "ml" }
    ],
    instructions: [
      "Cocinar quinoa y dejar enfriar.",
      "Sazonar y grillear pechuga de pollo.",
      "Mezclar quinoa con verduras.",
      "Agregar pollo en tiras.",
      "Aliñar con aceite y limón."
    ],
    tips: "Almuerzo alto en proteína con carbs complejos.",
    image: "https://images.pexels.com/photos/38734261/pexels-photo-38734261.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-bowl-arroz-pollo": {
    title: "Bowl de Arroz Integral con Pollo y Verduras",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 580,
    protein: 45,
    fat: 16,
    carbs: 65,
    netCarbs: 50,
    fiber: 15,
    ingredients: [
      { id: "f224", name: "Arroz integral", quantity: 120, unit: "g" },
      { id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" },
      { id: "f225", name: "Brócoli", quantity: 80, unit: "g" },
      { id: "f226", name: "Zanahoria", quantity: 50, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" }
    ],
    instructions: [
      "Cocinar arroz integral.",
      "Saltear verduras.",
      "Grillear pollo y cortar en tiras.",
      "Servir todo en bowl.",
      "Rociar con aceite de oliva."
    ],
    tips: "Bowl completo para energía sostenida.",
    image: "https://images.pexels.com/photos/32810337/pexels-photo-32810337.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-wrap-pavo": {
    title: "Wrap de Pavo con Verduras y Hummus",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "10 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 35,
    fat: 15,
    carbs: 48,
    netCarbs: 35,
    fiber: 13,
    ingredients: [
      { id: "f227", name: "Tortilla integral", quantity: 80, unit: "g" },
      { id: "f228", name: "Pavo en fetas", quantity: 100, unit: "g" },
      { id: "f229", name: "Hummus", quantity: 40, unit: "g" },
      { id: "f230", name: "Lechuga romana", quantity: 40, unit: "g" },
      { id: "f222", name: "Tomate", quantity: 40, unit: "g" }
    ],
    instructions: [
      "Extender hummus en la tortilla.",
      "Agregar hojas de lechuga y tomate.",
      "Colocar fetas de pavo.",
      "Enrollar y servir."
    ],
    tips: "Wrap rápido y nutritivo para llevar.",
    image: "https://images.pexels.com/photos/3872385/pexels-photo-3872385.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-ensalada-garbanzos-atun": {
    title: "Ensalada de Garbanzos con Atún",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 480,
    protein: 38,
    fat: 18,
    carbs: 45,
    netCarbs: 30,
    fiber: 15,
    ingredients: [
      { id: "f231", name: "Garbanzos", quantity: 120, unit: "g" },
      { id: "f232", name: "Atún en agua", quantity: 100, unit: "g" },
      { id: "f221", name: "Lechuga", quantity: 60, unit: "g" },
      { id: "f222", name: "Tomate", quantity: 50, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Escurrir atún y mezclar con garbanzos.",
      "Agregar verduras cortadas.",
      "Aliñar con aceite de oliva.",
      "Sazonar al gusto."
    ],
    tips: "Almuerzo rico en omega-3 y fibra.",
    image: "https://images.pexels.com/photos/6544221/pexels-photo-6544221.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-pasta-integral": {
    title: "Pasta Integral con Salsa de Tomate y Pollo",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 550,
    protein: 38,
    fat: 14,
    carbs: 68,
    netCarbs: 55,
    fiber: 13,
    ingredients: [
      { id: "f233", name: "Pasta integral", quantity: 100, unit: "g" },
      { id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" },
      { id: "f234", name: "Salsa tomate", quantity: 80, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" },
      { id: "f235", name: "Albahaca", quantity: 5, unit: "g" }
    ],
    instructions: [
      "Cocinar pasta integral al dente.",
      "Grillear pollo y cortar en trozos.",
      "Calentar salsa de tomate.",
      "Mezclar pasta con salsa y pollo.",
      "Decorar con albahaca."
    ],
    tips: "Carbohidratos complejos con proteína magra.",
    image: "https://images.pexels.com/photos/18114358/pexels-photo-18114358.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-sandwich-pollo-aguacate": {
    title: "Sándwich de Pollo y Aguacate",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 40,
    fat: 22,
    carbs: 48,
    netCarbs: 32,
    fiber: 16,
    ingredients: [
      { id: "f236", name: "Pan integral", quantity: 80, unit: "g" },
      { id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 60, unit: "g" },
      { id: "f221", name: "Lechuga", quantity: 30, unit: "g" },
      { id: "f237", name: "Mayonesa light", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Tostar pan integral.",
      "Untár avocado en el pan.",
      "Agregar pollo en tiras.",
      "Colocar lechuga y mayonesa.",
      "Cerrar sándwich."
    ],
    tips: "Sándwich nutritivo con grasa saludable.",
    image: "https://images.pexels.com/photos/20404894/pexels-photo-20404894.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-lentejas-estofadas": {
    title: "Lentejas Estofadas con Verduras",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "35 min",
    difficulty: "medio",
    servings: 2,
    calories: 450,
    protein: 25,
    fat: 10,
    carbs: 65,
    netCarbs: 45,
    fiber: 20,
    ingredients: [
      { id: "f238", name: "Lentejas", quantity: 150, unit: "g" },
      { id: "f239", name: "Cebolla", quantity: 60, unit: "g" },
      { id: "f240", name: "Zanahoria", quantity: 80, unit: "g" },
      { id: "f241", name: "Ajo", quantity: 5, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }
    ],
    instructions: [
      "Sofríe cebolla, zanahoria y ajo.",
      "Agregar lentejas y agua.",
      "Cocinar a fuego lento 30 min.",
      "Sazonar y servir."
    ],
    tips: "Alto contenido de hierro y fibra.",
    image: "https://images.pexels.com/photos/35646479/pexels-photo-35646479.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // CENAS
  "cena-salmon-verduras": {
    title: "Salmón al Horno con Verduras Asadas",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "medio",
    servings: 1,
    calories: 480,
    protein: 42,
    fat: 26,
    carbs: 25,
    netCarbs: 15,
    fiber: 10,
    ingredients: [
      { id: "f242", name: "Salmón", quantity: 150, unit: "g" },
      { id: "f225", name: "Brócoli", quantity: 80, unit: "g" },
      { id: "f226", name: "Zanahoria", quantity: 60, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" },
      { id: "f243", name: "Limón", quantity: 20, unit: "g" }
    ],
    instructions: [
      "Precalentar horno a 200°C.",
      "Colocar salmón y verduras en bandeja.",
      "Rociar con aceite y limón.",
      "Hornear 20 minutos.",
      "Servir caliente."
    ],
    tips: "Rico en omega-3, cena ligera y nutritiva.",
    image: "https://images.pexels.com/photos/34624944/pexels-photo-34624944.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pollo-arroz-integral": {
    title: "Pollo al Curry con Arroz Integral",
    category: "cena",
    mealType: "cena",
    prepTime: "30 min",
    difficulty: "medio",
    servings: 1,
    calories: 550,
    protein: 40,
    fat: 18,
    carbs: 55,
    netCarbs: 42,
    fiber: 13,
    ingredients: [
      { id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" },
      { id: "f224", name: "Arroz integral", quantity: 100, unit: "g" },
      { id: "f244", name: "Leche coco", quantity: 80, unit: "ml" },
      { id: "f245", name: "Curry en polvo", quantity: 5, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" }
    ],
    instructions: [
      "Cocinar arroz integral.",
      "Sofreír pollo con curry.",
      "Agregar leche de coco.",
      "Cocinar hasta que pollo esté listo.",
      "Servir sobre arroz."
    ],
    tips: "Cena cremosa y satisfactoria.",
    image: "https://images.pexels.com/photos/4611425/pexels-photo-4611425.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-ensalada-atun": {
    title: "Ensalada con Pescado a la Plancha",
    category: "cena",
    mealType: "cena",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 1,
    calories: 380,
    protein: 38,
    fat: 16,
    carbs: 25,
    netCarbs: 15,
    fiber: 10,
    ingredients: [
      { id: "f246", name: "Filete de pescado", quantity: 150, unit: "g" },
      { id: "f221", name: "Lechuga", quantity: 80, unit: "g" },
      { id: "f222", name: "Tomate", quantity: 60, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" },
      { id: "f247", name: "Vinagre balsámico", quantity: 10, unit: "ml" }
    ],
    instructions: [
      "Sazonar y dorar pescado en sartén.",
      "Preparar ensalada base.",
      "Agregar tomate en rodajas.",
      "Colocar pescado caliente.",
      "Aliñar con aceite y vinagre."
    ],
    tips: "Cena ligera alta en proteína.",
    image: "https://images.pexels.com/photos/17679709/pexels-photo-17679709.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-tacos-pollo": {
    title: "Tacos de Pollo con Ensalada",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 520,
    protein: 42,
    fat: 18,
    carbs: 48,
    netCarbs: 32,
    fiber: 16,
    ingredients: [
      { id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" },
      { id: "f248", name: "Tortillas maíz", quantity: 60, unit: "g" },
      { id: "f249", name: "Col rallada", quantity: 60, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 40, unit: "g" },
      { id: "f250", name: "Salsa tomate", quantity: 30, unit: "g" }
    ],
    instructions: [
      "Cocinar y deshebrar pollo.",
      "Calentar tortillas.",
      "Rellenar con pollo y col.",
      "Agregar aguacate y salsa."
    ],
    tips: "Tacos ricos en proteína y veggies.",
    image: "https://images.pexels.com/photos/14930613/pexels-photo-14930613.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-sopa-lentejas": {
    title: "Sopa de Lentejas con Verduras",
    category: "cena",
    mealType: "cena",
    prepTime: "40 min",
    difficulty: "medio",
    servings: 2,
    calories: 380,
    protein: 22,
    fat: 8,
    carbs: 55,
    netCarbs: 38,
    fiber: 17,
    ingredients: [
      { id: "f238", name: "Lentejas", quantity: 120, unit: "g" },
      { id: "f239", name: "Cebolla", quantity: 40, unit: "g" },
      { id: "f226", name: "Zanahoria", quantity: 60, unit: "g" },
      { id: "f241", name: "Ajo", quantity: 3, unit: "g" },
      { id: "f251", name: "Caldo verduras", quantity: 400, unit: "ml" }
    ],
    instructions: [
      "Sofreír cebolla, zanahoria y ajo.",
      "Agregar lentejas y caldo.",
      "Cocinar 30 minutos.",
      "Sazonar y servir caliente."
    ],
    tips: "Sopa nutritiva y saciante.",
    image: "https://images.pexels.com/photos/29850843/pexels-photo-29850843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pizza-base-coliflor": {
    title: "Pizza Casera con Base de Coliflor",
    category: "cena",
    mealType: "cena",
    prepTime: "35 min",
    difficulty: "medio",
    servings: 2,
    calories: 420,
    protein: 25,
    fat: 18,
    carbs: 40,
    netCarbs: 25,
    fiber: 15,
    ingredients: [
      { id: "f252", name: "Coliflor", quantity: 200, unit: "g" },
      { id: "f1", name: "Huevos", quantity: 80, unit: "g" },
      { id: "f253", name: "Queso mozzarella", quantity: 80, unit: "g" },
      { id: "f234", name: "Salsa tomate", quantity: 60, unit: "g" },
      { id: "f254", name: "Orégano", quantity: 2, unit: "g" }
    ],
    instructions: [
      "Triturar coliflor mezclado con huevo.",
      "Formar base y hornear 15 min.",
      "Agregar salsa y queso.",
      "Hornear 10 min más."
    ],
    tips: "Pizza más saludable con base de veggies.",
    image: "https://images.pexels.com/photos/30818165/pexels-photo-30818165.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // SNACKS
  "snack-yogur-fruta": {
    title: "Yogur Natural con Fruta",
    category: "snack",
    mealType: "snack",
    prepTime: "3 min",
    difficulty: "fácil",
    servings: 1,
    calories: 180,
    protein: 15,
    fat: 5,
    carbs: 22,
    netCarbs: 20,
    fiber: 2,
    ingredients: [
      { id: "f208", name: "Yogur griego", quantity: 150, unit: "g" },
      { id: "f209", name: "Plátano", quantity: 60, unit: "g" },
      { id: "f255", name: "Canela", quantity: 2, unit: "g" }
    ],
    instructions: [
      "Verter yogur en bowl.",
      "Agregar plátano en rodajas.",
      "Espolvorear canela."
    ],
    tips: "Snack rápido rico en proteína.",
    image: "https://images.pexels.com/photos/2531176/pexels-photo-2531176.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-mix-frutos-secos": {
    title: "Mix de Frutos Secos",
    category: "snack",
    mealType: "snack",
    prepTime: "1 min",
    difficulty: "fácil",
    servings: 1,
    calories: 200,
    protein: 6,
    fat: 18,
    carbs: 10,
    netCarbs: 8,
    fiber: 2,
    ingredients: [
      { id: "f204", name: "Nueces", quantity: 15, unit: "g" },
      { id: "f256", name: "Almendras", quantity: 15, unit: "g" },
      { id: "f257", name: "Pasas", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Mezclar todos los frutos secos.",
      "Servir en porciones.",
      "Ideal para llevar."
    ],
    tips: "Snack energético rico en grasas saludables.",
    image: "https://images.pexels.com/photos/35846638/pexels-photo-35846638.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-manzana-mantequilla-cacahuate": {
    title: "Manzana con Mantequilla de Cacahuate",
    category: "snack",
    mealType: "snack",
    prepTime: "3 min",
    difficulty: "fácil",
    servings: 1,
    calories: 220,
    protein: 8,
    fat: 14,
    carbs: 22,
    netCarbs: 18,
    fiber: 4,
    ingredients: [
      { id: "f258", name: "Manzana", quantity: 120, unit: "g" },
      { id: "f259", name: "Mantequilla cacahuate", quantity: 20, unit: "g" }
    ],
    instructions: [
      "Cortar manzana en rodajas.",
      "Untar mantequilla de cacahuate.",
      "Servir inmediatamente."
    ],
    tips: "Combina fibra con proteína y grasa.",
    image: "https://images.pexels.com/photos/33489594/pexels-photo-33489594.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-batido-verde": {
    title: "Batido Verde con Espinacas",
    category: "snack",
    mealType: "snack",
    prepTime: "5 min",
    difficulty: "fácil",
    servings: 1,
    calories: 160,
    protein: 8,
    fat: 6,
    carbs: 22,
    netCarbs: 15,
    fiber: 7,
    ingredients: [
      { id: "f216", name: "Espinacas", quantity: 60, unit: "g" },
      { id: "f214", name: "Plátano", quantity: 80, unit: "g" },
      { id: "f213", name: "Leche almendra", quantity: 150, unit: "ml" }
    ],
    instructions: [
      "Licuar espinacas con plátano.",
      "Agregar leche de almendra.",
      "Servir frío."
    ],
    tips: "Snack nutritivo con vitaminas.",
    image: "https://images.pexels.com/photos/28909422/pexels-photo-28909422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "snack-tortilla-integral-queso": {
    title: "Tortilla Integral con Queso",
    category: "snack",
    mealType: "snack",
    prepTime: "5 min",
    difficulty: "fácil",
    servings: 1,
    calories: 250,
    protein: 14,
    fat: 12,
    carbs: 28,
    netCarbs: 22,
    fiber: 6,
    ingredients: [
      { id: "f227", name: "Tortilla integral", quantity: 50, unit: "g" },
      { id: "f253", name: "Queso mozzarella", quantity: 40, unit: "g" }
    ],
    instructions: [
      "Calentar tortilla en sartén.",
      "Agregar queso rallado.",
      "Doblar y esperar a que se derrita."
    ],
    tips: "Snack rápido y satisfyorio.",
    image: "https://images.pexels.com/photos/34644336/pexels-photo-34644336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // MÁS ALMUERZOS
  "almuerzo-bowl-taco": {
    title: "Taco Bowl con Arroz y Frijoles",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 541,
    protein: 30,
    fat: 18,
    carbs: 71,
    netCarbs: 53,
    fiber: 18,
    ingredients: [
      { id: "f224", name: "Arroz integral", quantity: 80, unit: "g" },
      { id: "f260", name: "Frijoles negros", quantity: 80, unit: "g" },
      { id: "f261", name: "Carne molida pavo", quantity: 100, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 50, unit: "g" },
      { id: "f222", name: "Tomate", quantity: 40, unit: "g" },
      { id: "f253", name: "Queso parmesano", quantity: 20, unit: "g" }
    ],
    instructions: [
      "Cocinar arroz integral.",
      "Sofreír carne molida con especias.",
      "Calentar frijoles.",
      "Armar bowl con todos los ingredientes.",
      "Agregar inmue y queso."
    ],
    tips: "Bowl completo con proteína y fibra.",
    image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "almuerzo-risotto-champiñones": {
    title: "Risotto de Champiñones",
    category: "almuerzo",
    mealType: "almuerzo",
    prepTime: "30 min",
    difficulty: "medio",
    servings: 2,
    calories: 480,
    protein: 14,
    fat: 18,
    carbs: 58,
    netCarbs: 48,
    fiber: 10,
    ingredients: [
      { id: "f262", name: "Arroz arborio", quantity: 120, unit: "g" },
      { id: "f215", name: "Champiñones", quantity: 100, unit: "g" },
      { id: "f263", name: "Caldo pollo", quantity: 400, unit: "ml" },
      { id: "f264", name: "Vino blanco", quantity: 50, unit: "ml" },
      { id: "f253", name: "Queso parmesano", quantity: 30, unit: "g" }
    ],
    instructions: [
      "Sofreír champiñones y reservar.",
      "Tostar arroz en olla.",
      "Agregar vino y reducir.",
      "Añadir caldo poco a poco.",
      "Mezclar champiñones y queso."
    ],
    tips: "Plato italiano cremoso y satisfactorio.",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
  },

  // MÁS CENAS
  "cena-bistec-pure-papa": {
    title: "Bistec con Puré de Papa y Verduras",
    category: "cena",
    mealType: "cena",
    prepTime: "35 min",
    difficulty: "medio",
    servings: 1,
    calories: 577,
    protein: 45,
    fat: 24,
    carbs: 54,
    netCarbs: 40,
    fiber: 14,
    ingredients: [
      { id: "f265", name: "Bistec res", quantity: 150, unit: "g" },
      { id: "f266", name: "Papa", quantity: 120, unit: "g" },
      { id: "f225", name: "Brócoli", quantity: 60, unit: "g" },
      { id: "f226", name: "Zanahoria", quantity: 40, unit: "g" },
      { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }
    ],
    instructions: [
      "Cocinar bistec a tu gusto.",
      "Hervir papas y hacer puré con mantequilla.",
      "Cocinar verduras al vapor.",
      "Servir todo caliente."
    ],
    tips: "Cena clásica alta en proteína.",
    image: "https://images.pexels.com/photos/33675722/pexels-photo-33675722.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-pasta-lentejas": {
    title: "Pasta de Lentejas Rojas con Verduras",
    category: "cena",
    mealType: "cena",
    prepTime: "25 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 22,
    fat: 12,
    carbs: 65,
    netCarbs: 45,
    fiber: 20,
    ingredients: [
      { id: "f267", name: "Pasta lentejas", quantity: 100, unit: "g" },
      { id: "f234", name: "Salsa tomate", quantity: 80, unit: "g" },
      { id: "f225", name: "Brócoli", quantity: 60, unit: "g" },
      { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" }
    ],
    instructions: [
      "Cocinar pasta de lentejas.",
      "Saltear brócoli.",
      "Mezclar con salsa de tomate.",
      "Servir caliente."
    ],
    tips: "Pasta alternativa alta en proteína.",
    image: "https://images.pexels.com/photos/8108213/pexels-photo-8108213.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "cena-huevos-rellenos": {
    title: "Huevos Rellenos con Atún",
    category: "cena",
    mealType: "cena",
    prepTime: "20 min",
    difficulty: "fácil",
    servings: 2,
    calories: 320,
    protein: 28,
    fat: 20,
    carbs: 6,
    netCarbs: 4,
    fiber: 2,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 200, unit: "g" },
      { id: "f232", name: "Atún", quantity: 80, unit: "g" },
      { id: "f237", name: "Mayonesa", quantity: 20, unit: "g" }
    ],
    instructions: [
      "Hervir huevos y pelar.",
      "Mezclar atún con mayonesa.",
      "Rellenar huevos.",
      "Servir fríos."
    ],
    tips: "Cena ligera rica en proteína.",
    image: "https://images.pexels.com/photos/31713761/pexels-photo-31713761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // MÁS DESAYUNOS
  "desayuno-camote-tostada": {
    title: "Camote Toast con Aguacate y Huevo",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 420,
    protein: 16,
    fat: 22,
    carbs: 45,
    netCarbs: 30,
    fiber: 15,
    ingredients: [
      { id: "f268", name: "Camote", quantity: 120, unit: "g" },
      { id: "f12", name: "Aguacate", quantity: 60, unit: "g" },
      { id: "f1", name: "Huevo", quantity: 80, unit: "g" }
    ],
    instructions: [
      "Tostar rodajas de camote.",
      "Machacar aguacate y untar.",
      "Cocinar huevo y colocar encima."
    ],
    tips: "Alternativa saludable al pan.",
    image: "https://images.pexels.com/photos/32705666/pexels-photo-32705666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-quinoa-bowl": {
    title: "Quinoa Bowl con Nueces y Fruta",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 450,
    protein: 16,
    fat: 18,
    carbs: 55,
    netCarbs: 40,
    fiber: 15,
    ingredients: [
      { id: "f219", name: "Quinoa cocida", quantity: 100, unit: "g" },
      { id: "f204", name: "Nueces", quantity: 20, unit: "g" },
      { id: "f269", name: "Fresas", quantity: 60, unit: "g" },
      { id: "f213", name: "Leche coco", quantity: 100, unit: "ml" },
      { id: "f205", name: "Miel", quantity: 10, unit: "g" }
    ],
    instructions: [
      "Cocinar quinoa y enfriar.",
      "Agregar nueces y fruta.",
      "Verter leche de coco y miel."
    ],
    tips: "Desayuno energético con proteína completa.",
    image: "https://images.pexels.com/photos/18890146/pexels-photo-18890146.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  "desayuno-omelette-verduras": {
    title: "Omelette de Verduras con Frijoles",
    category: "desayuno",
    mealType: "desayuno",
    prepTime: "15 min",
    difficulty: "fácil",
    servings: 1,
    calories: 529,
    protein: 26,
    fat: 18,
    carbs: 75,
    netCarbs: 53,
    fiber: 22,
    ingredients: [
      { id: "f1", name: "Huevos", quantity: 150, unit: "g" },
      { id: "f260", name: "Frijoles", quantity: 80, unit: "g" },
      { id: "f215", name: "Champiñones", quantity: 60, unit: "g" },
      { id: "f216", name: "Espinacas", quantity: 40, unit: "g" },
      { id: "f214", name: "Plátano", quantity: 60, unit: "g" }
    ],
    instructions: [
      "Sofreír verduras.",
      "Agregar frijoles.",
      "Verter huevos batidos.",
      "Cocinar hasta que cuaje.",
      "Acompañar con plátano."
    ],
    tips: "Omelette completo con carbs.",
    image: "https://images.pexels.com/photos/25402352/pexels-photo-25402352.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
  },

  // ==================== RECETAS ADICIONALES NO-KETO (para meta de 200+) ====================

  // DESAYUNOS ADICIONALES
  "desayuno-huevos-mexicano": { title: "Huevos Rancheros", category: "desayuno", mealType: "desayuno", prepTime: "20 min", difficulty: "medio", servings: 1, calories: 520, protein: 28, fat: 22, carbs: 55, netCarbs: 40, fiber: 15, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f301", name: "Tortilla maíz", quantity: 80, unit: "g" }, { id: "f302", name: "Frijoles negros", quantity: 80, unit: "g" }, { id: "f303", name: "Salsa mexicana", quantity: 50, unit: "g" }], instructions: ["Calentar frijoles.", "Tostar tortilla.", "Fritar huevos.", "Montar y agregar salsa."], tips: "Clásico mexicano para comenzar el día.", image: "https://images.pexels.com/photos/31823015/pexels-photo-31823015.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-tostada-francesa": { title: "Tostada Francesa con Maple", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 480, protein: 16, fat: 18, carbs: 65, netCarbs: 55, fiber: 10, ingredients: [{ id: "f304", name: "Pan brioche", quantity: 100, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f305", name: "Leche entera", quantity: 80, unit: "ml" }, { id: "f205", name: "Jarabe maple", quantity: 30, unit: "g" }], instructions: ["Remojar pan en mezcla de huevo y leche.", "Dorar en sartén.", "Servir con jarabe de maple."], tips: "Desayuno dulce y energético.", image: "https://images.pexels.com/photos/28649679/pexels-photo-28649679.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-budding-avena": { title: "Budín de Avena con Canela", category: "desayuno", mealType: "desayuno", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 380, protein: 10, fat: 8, carbs: 65, netCarbs: 50, fiber: 15, ingredients: [{ id: "f201", name: "Avena", quantity: 80, unit: "g" }, { id: "f306", name: "Leche avena", quantity: 200, unit: "ml" }, { id: "f307", name: "Canela", quantity: 3, unit: "g" }, { id: "f205", name: "Miel", quantity: 15, unit: "g" }], instructions: ["Mezclar avena con leche.", "Cocinar hasta espesar.", "Agregar canela y miel."], tips: "Avena cremosa y reconfortante.", image: "https://images.pexels.com/photos/13950819/pexels-photo-13950819.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-arepa-huevo": { title: "Arepa con Huevo y Queso", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 450, protein: 20, fat: 20, carbs: 50, netCarbs: 40, fiber: 10, ingredients: [{ id: "f308", name: "Harina arepa", quantity: 80, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 30, unit: "g" }], instructions: ["Formar arepa y cocinar.", "Hacer hueco y agregar huevo.", "Cubrir con queso."], tips: "Desayuno típico latinoamericano.", image: "https://images.pexels.com/photos/37025260/pexels-photo-37025260.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-batido-mango": { title: "Batido de Mango y Coco", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 320, protein: 8, fat: 12, carbs: 50, netCarbs: 42, fiber: 8, ingredients: [{ id: "f309", name: "Mango", quantity: 120, unit: "g" }, { id: "f310", name: "Leche coco", quantity: 150, unit: "ml" }, { id: "f214", name: "Plátano", quantity: 60, unit: "g" }], instructions: ["Licuar todos los ingredientes.", "Servir frío."], tips: "Tropical y refrescante.", image: "https://images.pexels.com/photos/20590289/pexels-photo-20590289.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-noodle-huevo": { title: "Fideos con Huevo Estirado", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 420, protein: 18, fat: 14, carbs: 58, netCarbs: 48, fiber: 10, ingredients: [{ id: "f311", name: "Fideos arroz", quantity: 80, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 30, unit: "g" }, { id: "f312", name: "Salsa soja", quantity: 15, unit: "ml" }], instructions: ["Cocinar fideos.", "Sofreír huevo con cebolla.", "Mezclar con salsa de soja."], tips: "Estilo asiático para el desayuno.", image: "https://images.pexels.com/photos/4224214/pexels-photo-4224214.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-parfait-granola": { title: "Parfait de Yogur y Granola", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 380, protein: 18, fat: 12, carbs: 52, netCarbs: 42, fiber: 10, ingredients: [{ id: "f208", name: "Yogur griego", quantity: 150, unit: "g" }, { id: "f210", name: "Granola", quantity: 50, unit: "g" }, { id: "f203", name: "Frutos rojos", quantity: 60, unit: "g" }], instructions: ["Capas de yogur y granola.", "Agregar frutos rojos.", "Servir frío."], tips: "Crujiente y cremoso.", image: "https://images.pexels.com/photos/11182249/pexels-photo-11182249.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-scone-integral": { title: "Scone Integral con Mantequilla", category: "desayuno", mealType: "desayuno", prepTime: "25 min", difficulty: "medio", servings: 2, calories: 320, protein: 8, fat: 14, carbs: 42, netCarbs: 35, fiber: 7, ingredients: [{ id: "f313", name: "Harina integral", quantity: 100, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 30, unit: "g" }, { id: "f314", name: "Leche polvo", quantity: 30, unit: "g" }], instructions: ["Mezharina con mantequilla.", "Agregar leche y formar.", "Hornear hasta dorar."], tips: "Panini inglés suave.", image: "https://images.pexels.com/photos/30512698/pexels-photo-30512698.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // ALMUERZOS ADICIONALES
  "almuerzo-burrito-arroz": { title: "Burrito de Arroz y Frijoles", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 580, protein: 22, fat: 16, carbs: 85, netCarbs: 65, fiber: 20, ingredients: [{ id: "f224", name: "Arroz integral", quantity: 100, unit: "g" }, { id: "f302", name: "Frijoles negros", quantity: 80, unit: "g" }, { id: "f227", name: "Tortilla grande", quantity: 80, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 80, unit: "g" }, { id: "f315", name: "Queso cheddar", quantity: 30, unit: "g" }], instructions: ["Cocinar arroz.", "Sofreír carne con especias.", "Armar burrito con arroz, frijoles, carne y queso."], tips: "Completo y satisfactorio.", image: "https://images.pexels.com/photos/27603260/pexels-photo-27603260.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-poke-bowl": { title: "Poke Bowl de Atún", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 450, protein: 35, fat: 14, carbs: 45, netCarbs: 32, fiber: 13, ingredients: [{ id: "f232", name: "Atún fresco", quantity: 120, unit: "g" }, { id: "f316", name: "Arroz jazmín", quantity: 100, unit: "g" }, { id: "f317", name: "Edamame", quantity: 50, unit: "g" }, { id: "f318", name: "Alga wakame", quantity: 20, unit: "g" }, { id: "f13", name: "Aceite sésamo", quantity: 10, unit: "ml" }], instructions: ["Cocinar arroz.", "Cortar atún en cubos.", "Armar bowl con arroz, atún, edamame y algas.", "Rociar aceite de sésamo."], tips: "Fresco y nutritivo estilo hawaiiano.", image: "https://images.pexels.com/photos/15611222/pexels-photo-15611222.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-sopa-fideos": { title: "Sopa de Fideos con Pollo", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "fácil", servings: 2, calories: 380, protein: 28, fat: 10, carbs: 45, netCarbs: 38, fiber: 7, ingredients: [{ id: "f319", name: "Fideos claros", quantity: 60, unit: "g" }, { id: "f220", name: "Pechuga pollo", quantity: 100, unit: "g" }, { id: "f320", name: "Caldo pollo", quantity: 400, unit: "ml" }, { id: "f239", name: "Cebolleta", quantity: 20, unit: "g" }], instructions: ["Hervir caldo.", "Agregar pollo cocido y fideos.", "Servir con cebolleta."], tips: "Reconfortante y ligera.", image: "https://images.pexels.com/photos/35375008/pexels-photo-35375008.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-cazuela-pollo": { title: "Cazuela de Pollo y Verduras", category: "almuerzo", mealType: "almuerzo", prepTime: "35 min", difficulty: "medio", servings: 2, calories: 520, protein: 38, fat: 18, carbs: 50, netCarbs: 35, fiber: 15, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" }, { id: "f225", name: "Brócoli", quantity: 80, unit: "g" }, { id: "f226", name: "Zanahoria", quantity: 60, unit: "g" }, { id: "f321", name: "Pimiento rojo", quantity: 50, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sofreír pollo con verduras.", "Agregar agua y cocinar 20 min.", "Servir caliente."], tips: "Guiso nutritivo.", image: "https://images.pexels.com/photos/32023537/pexels-photo-32023537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-empanada-carne": { title: "Empanada de Carne", category: "almuerzo", mealType: "almuerzo", prepTime: "40 min", difficulty: "medio", servings: 2, calories: 480, protein: 20, fat: 22, carbs: 55, netCarbs: 42, fiber: 13, ingredients: [{ id: "f322", name: "Masa empanada", quantity: 150, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 100, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 40, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 30, unit: "g" }], instructions: ["Mezclar carne con cebolla y salsa.", "Rellenar masas.", "Hornear hasta dorar."], tips: "Clásico latino muy nutritivo.", image: "https://images.pexels.com/photos/8279711/pexels-photo-8279711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-ensalada-griega": { title: "Ensalada Griega con Pollo", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 420, protein: 35, fat: 22, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" }, { id: "f323", name: "Pepino", quantity: 80, unit: "g" }, { id: "f324", name: "Aceitunas negras", quantity: 40, unit: "g" }, { id: "f40", name: "Queso feta", quantity: 40, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Grillear pollo y cortar.", "Mezclar verduras.", "Agregar pollo, feta y aceitunas.", "Aliñar con aceite."], tips: "Fresca y con proteínas.", image: "https://images.pexels.com/photos/27497770/pexels-photo-27497770.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-bowl-caz": { title: "Bowl Caucásico con Hummus", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 520, protein: 18, fat: 24, carbs: 60, netCarbs: 42, fiber: 18, ingredients: [{ id: "f325", name: "Grano cocción", quantity: 80, unit: "g" }, { id: "f229", name: "Hummus", quantity: 60, unit: "g" }, { id: "f326", name: "Garbanzos", quantity: 60, unit: "g" }, { id: "f327", name: "Zucchini", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cocinar grano.", "Preparar hummus casero.", "Armar bowl con grano, garbanzos, zucchini y hummus."], tips: "Alto en proteína vegetal.", image: "https://images.pexels.com/photos/9213971/pexels-photo-9213971.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-tarta-espinacas": { title: "Tarta de Espinacas y Queso", category: "almuerzo", mealType: "almuerzo", prepTime: "35 min", difficulty: "medio", servings: 2, calories: 450, protein: 18, fat: 26, carbs: 38, netCarbs: 28, fiber: 10, ingredients: [{ id: "f328", name: "Masa quebrada", quantity: 100, unit: "g" }, { id: "f216", name: "Espinacas", quantity: 150, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 80, unit: "g" }, { id: "f1", name: "Huevos", quantity: 80, unit: "g" }], instructions: ["Forrar molde con masa.", "Mezclar espinacas con huevos y queso.", "Hornear 25 min."], tips: "Tarta salada muy nutritiva.", image: "https://images.pexels.com/photos/29538421/pexels-photo-29538421.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-sandwich-club": { title: "Sándwich Club Triple", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 550, protein: 32, fat: 24, carbs: 50, netCarbs: 38, fiber: 12, ingredients: [{ id: "f236", name: "Pan integral", quantity: 90, unit: "g" }, { id: "f220", name: "Pechuga pollo", quantity: 80, unit: "g" }, { id: "f261", name: "Tocino", quantity: 40, unit: "g" }, { id: "f329", name: "Lechuga iceberg", quantity: 30, unit: "g" }, { id: "f222", name: "Tomate", quantity: 40, unit: "g" }], instructions: ["Tostar pan.", "Agregar pollo, tocino, lechuga y tomate en capas.", "Cortar en triángulos."], tips: "Clásico estadounidense.", image: "https://images.pexels.com/photos/11256670/pexels-photo-11256670.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-paella-marisco": { title: "Paella de Mariscos", category: "almuerzo", mealType: "almuerzo", prepTime: "45 min", difficulty: "medio", servings: 2, calories: 520, protein: 35, fat: 16, carbs: 60, netCarbs: 45, fiber: 15, ingredients: [{ id: "f330", name: "Arroz bomba", quantity: 120, unit: "g" }, { id: "f331", name: "Camarones", quantity: 100, unit: "g" }, { id: "f332", name: "Mejillones", quantity: 80, unit: "g" }, { id: "f333", name: "Caldo pescado", quantity: 400, unit: "ml" }, { id: "f239", name: "Cebolla", quantity: 40, unit: "g" }], instructions: ["Sofreír mariscos.", "Agregar arroz y caldo.", "Cocinar hasta que arroz esté listo."], tips: "Clásico español muy nutritivo.", image: "https://images.pexels.com/photos/16743486/pexels-photo-16743486.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-chilli-con-carne": { title: "Chili con Carne", category: "almuerzo", mealType: "almuerzo", prepTime: "40 min", difficulty: "medio", servings: 3, calories: 450, protein: 32, fat: 18, carbs: 40, netCarbs: 28, fiber: 12, ingredients: [{ id: "f261", name: "Carne molida", quantity: 150, unit: "g" }, { id: "f302", name: "Frijoles rojos", quantity: 100, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 80, unit: "g" }, { id: "f334", name: "Chile polvo", quantity: 5, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 40, unit: "g" }], instructions: ["Sofreír carne con cebolla.", "Agregar frijoles y salsas.", "Cocinar 30 min."], tips: "Picante y alto en proteína.", image: "https://images.pexels.com/photos/15881322/pexels-photo-15881322.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-gyozas": { title: "Gyozas Rellenas", category: "almuerzo", mealType: "almuerzo", prepTime: "50 min", difficulty: "medio", servings: 2, calories: 420, protein: 18, fat: 16, carbs: 52, netCarbs: 40, fiber: 12, ingredients: [{ id: "f335", name: "Masa gyozas", quantity: 100, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 80, unit: "g" }, { id: "f239", name: "Cebolleta", quantity: 30, unit: "g" }, { id: "f312", name: "Salsa soja", quantity: 20, unit: "ml" }], instructions: ["Rellenar masas con mezcla de carne.", "Cocinar al vapor o freír.", "Servir con salsa de soja."], tips: "Delicia asiática.", image: "https://images.pexels.com/photos/2098120/pexels-photo-2098120.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-frittata-pasta": { title: "Frittata de Pasta", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "fácil", servings: 2, calories: 480, protein: 24, fat: 22, carbs: 45, netCarbs: 35, fiber: 10, ingredients: [{ id: "f336", name: "Pasta cocida", quantity: 120, unit: "g" }, { id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 50, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 40, unit: "g" }], instructions: ["Mezclar pasta con huevos.", "Agregar salsa y queso.", "Hornear hasta que cuaje."], tips: "Ideal para sobras de pasta.", image: "https://images.pexels.com/photos/33922142/pexels-photo-33922142.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-sopa-minestrone": { title: "Sopa Minestrone", category: "almuerzo", mealType: "almuerzo", prepTime: "40 min", difficulty: "medio", servings: 3, calories: 320, protein: 15, fat: 8, carbs: 50, netCarbs: 35, fiber: 15, ingredients: [{ id: "f337", name: "Fideos pequeños", quantity: 60, unit: "g" }, { id: "f326", name: "Garbanzos", quantity: 60, unit: "g" }, { id: "f238", name: "Lentejas", quantity: 50, unit: "g" }, { id: "f338", name: "Verduras mixtas", quantity: 150, unit: "g" }, { id: "f320", name: "Caldo verduras", quantity: 500, unit: "ml" }], instructions: ["Hervir caldo.", "Agregar legumbres y verduras.", "Cocinar 30 min y agregar fideos."], tips: "Sopa italiana muy completa.", image: "https://images.pexels.com/photos/6896516/pexels-photo-6896516.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // CENAS ADICIONALES
  "cena-bacalao-gratinado": { title: "Bacalao al Horno con Panela", category: "cena", mealType: "cena", prepTime: "30 min", difficulty: "medio", servings: 1, calories: 420, protein: 38, fat: 20, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f339", name: "Bacalao", quantity: 150, unit: "g" }, { id: "f340", name: "Panela", quantity: 60, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 50, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Colocar bacalao en bandeja.", "Cubrir con salsa y queso.", "Hornear 20 min."], tips: "Rico en omega-3.", image: "https://images.pexels.com/photos/8351639/pexels-photo-8351639.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-costillas-barbacoa": { title: "Costillas a la Barbacoa", category: "cena", mealType: "cena", prepTime: "45 min", difficulty: "medio", servings: 2, calories: 550, protein: 40, fat: 28, carbs: 35, netCarbs: 28, fiber: 7, ingredients: [{ id: "f341", name: "Costillas cerdo", quantity: 200, unit: "g" }, { id: "f342", name: "Salsa barbacoa", quantity: 60, unit: "g" }, { id: "f343", name: "Patatas", quantity: 150, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" }], instructions: ["Sazonar costillas.", "Cocinar en horno con salsa barbacoa.", "Acompañar con patatas."], tips: "Cena abundante y sabrosa.", image: "https://images.pexels.com/photos/8250702/pexels-photo-8250702.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-guiso-lentejas": { title: "Guiso de Lentejas con Arroz", category: "cena", mealType: "cena", prepTime: "40 min", difficulty: "fácil", servings: 2, calories: 480, protein: 22, fat: 12, carbs: 70, netCarbs: 50, fiber: 20, ingredients: [{ id: "f238", name: "Lentejas", quantity: 120, unit: "g" }, { id: "f224", name: "Arroz integral", quantity: 100, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 50, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cocinar lentejas.", "Sofreír cebolla y añadir tomate.", "Servir sobre arroz."], tips: "Alto en hierro y fibra.", image: "https://images.pexels.com/photos/8996219/pexels-photo-8996219.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pollo-ajillo": { title: "Pollo al Ajillo", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 420, protein: 40, fat: 18, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" }, { id: "f241", name: "Ajo", quantity: 15, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 20, unit: "ml" }, { id: "f344", name: "Perejil", quantity: 10, unit: "g" }], instructions: ["Freír ajo en aceite.", "Agregar pollo en trozos.", "Cocinar hasta dorar y agregar perejil."], tips: "Clásico español.", image: "https://images.pexels.com/photos/31233881/pexels-photo-31233881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-merluza-salsa": { title: "Merluza en Salsa Verde", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 380, protein: 35, fat: 18, carbs: 20, netCarbs: 14, fiber: 6, ingredients: [{ id: "f345", name: "Merluza", quantity: 150, unit: "g" }, { id: "f346", name: "Salsa verde", quantity: 80, unit: "g" }, { id: "f239", name: "Cebolleta", quantity: 20, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cocinar merluza.", "Agregar salsa verde.", "Servir con cebolleta."], tips: "Pescado ligero en salsa.", image: "https://images.pexels.com/photos/5192412/pexels-photo-5192412.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-calamares-rellenos": { title: "Calamares Rellenos", category: "cena", mealType: "cena", prepTime: "40 min", difficulty: "medio", servings: 2, calories: 450, protein: 32, fat: 20, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f347", name: "Calamares", quantity: 200, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 80, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Rellenar calamares con carne.", "Hornear con salsa.", "Servir caliente."], tips: "Plato gourmet casero.", image: "https://images.pexels.com/photos/20766563/pexels-photo-20766563.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-ternera-estroganoff": { title: "Estrofagán de Ternera", category: "cena", mealType: "cena", prepTime: "35 min", difficulty: "medio", servings: 2, calories: 520, protein: 38, fat: 26, carbs: 35, netCarbs: 28, fiber: 7, ingredients: [{ id: "f348", name: "Carne ternera", quantity: 150, unit: "g" }, { id: "f349", name: "Crema leche", quantity: 80, unit: "ml" }, { id: "f350", name: "Champiñones", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sofreír carne y champiñones.", "Agregar crema y cocinar.", "Servir con arroz."], tips: "Plato ruso clásico.", image: "https://images.pexels.com/photos/29935503/pexels-photo-29935503.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pavo-relleno": { title: "Pavo Relleno con Arroz", category: "cena", mealType: "cena", prepTime: "60 min", difficulty: "medio", servings: 3, calories: 480, protein: 42, fat: 16, carbs: 40, netCarbs: 30, fiber: 10, ingredients: [{ id: "f228", name: "Pavo", quantity: 180, unit: "g" }, { id: "f224", name: "Arroz integral", quantity: 100, unit: "g" }, { id: "f351", name: "Pasas", quantity: 30, unit: "g" }, { id: "f352", name: "Almendras", quantity: 20, unit: "g" }], instructions: ["Mezclar arroz con pasas y almendras.", "Rellenar pavo.", "Hornear hasta cocido."], tips: "Especial de ocasiones.", image: "https://images.pexels.com/photos/33713159/pexels-photo-33713159.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-cerdo-asado": { title: "Cerdo Asado con Manzana", category: "cena", mealType: "cena", prepTime: "50 min", difficulty: "medio", servings: 2, calories: 500, protein: 35, fat: 24, carbs: 38, netCarbs: 28, fiber: 10, ingredients: [{ id: "f353", name: "Cerdo paleta", quantity: 180, unit: "g" }, { id: "f258", name: "Manzana", quantity: 100, unit: "g" }, { id: "f354", name: "Patatas nuevas", quantity: 150, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sazonar y hornear cerdo.", "Agregar manzanas y patatas.", "Cocinar hasta dorado."], tips: "Combinación agridulce.", image: "https://images.pexels.com/photos/26733061/pexels-photo-26733061.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-cordero-rostizado": { title: "Cordero Rostizado", category: "cena", mealType: "cena", prepTime: "55 min", difficulty: "medio", servings: 2, calories: 550, protein: 38, fat: 32, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f355", name: "Cordero pierna", quantity: 180, unit: "g" }, { id: "f356", name: "Romero", quantity: 5, unit: "g" }, { id: "f357", name: "Ajo asado", quantity: 15, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 20, unit: "ml" }], instructions: ["Sazonar cordero con romero y ajo.", "Hornear a temperatura media.", "Reposar antes de cortar."], tips: "Cena elegante.", image: "https://images.pexels.com/photos/19863261/pexels-photo-19863261.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-bowl-quinoa-vegetal": { title: "Bowl de Quinoa con Tofu", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 420, protein: 20, fat: 18, carbs: 48, netCarbs: 32, fiber: 16, ingredients: [{ id: "f219", name: "Quinoa cocida", quantity: 100, unit: "g" }, { id: "f358", name: "Tofu", quantity: 100, unit: "g" }, { id: "f359", name: "Col rizada", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }, { id: "f360", name: "Salsa tahini", quantity: 20, unit: "g" }], instructions: ["Cocinar quinoa.", "Sofreír tofu.", "Armar bowl con verduras y tahini."], tips: "Vegano y nutritivo.", image: "https://images.pexels.com/photos/34227771/pexels-photo-34227771.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-gnocchi-salsa": { title: "Gnocchi con Pesto", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 520, protein: 14, fat: 22, carbs: 68, netCarbs: 55, fiber: 13, ingredients: [{ id: "f361", name: "Gnocchi", quantity: 150, unit: "g" }, { id: "f362", name: "Salsa pesto", quantity: 60, unit: "g" }, { id: "f253", name: "Queso parmesano", quantity: 30, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 10, unit: "ml" }], instructions: ["Cocinar gnocchi.", "Mezclar con pesto.", "Espolvorear parmesano."], tips: "Pasta italiana suave.", image: "https://images.pexels.com/photos/6659543/pexels-photo-6659543.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-lasaña-vegetal": { title: "Lasaña Vegetariana", category: "cena", mealType: "cena", prepTime: "45 min", difficulty: "medio", servings: 2, calories: 480, protein: 22, fat: 20, carbs: 55, netCarbs: 40, fiber: 15, ingredients: [{ id: "f363", name: "Láminas lasaña", quantity: 80, unit: "g" }, { id: "f364", name: "Espinacas", quantity: 100, unit: "g" }, { id: "f365", name: "Ricota", quantity: 80, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 100, unit: "g" }], instructions: ["Mezclar espinacas con ricotta.", "Armar capas con salsa y pasta.", "Hornear 30 min."], tips: "Lasaña sin carne.", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" },

  // SNACKS ADICIONALES
  "snack-hummus-vegetales": { title: "Hummus con Palitos de Verdura", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 220, protein: 10, fat: 14, carbs: 22, netCarbs: 15, fiber: 7, ingredients: [{ id: "f229", name: "Hummus", quantity: 80, unit: "g" }, { id: "f366", name: "Zanahorias", quantity: 80, unit: "g" }, { id: "f367", name: "Apio", quantity: 60, unit: "g" }], instructions: ["Preparar hummus.", "Cortar verduras en palitos.", "Servir juntos."], tips: "Snack saludable y crujiente.", image: "https://images.pexels.com/photos/34644302/pexels-photo-34644302.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-galletas-arroz": { title: "Galletas de Arroz con Queso", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 180, protein: 6, fat: 8, carbs: 24, netCarbs: 22, fiber: 2, ingredients: [{ id: "f368", name: "Galletas arroz", quantity: 30, unit: "g" }, { id: "f315", name: "Queso cheddar", quantity: 30, unit: "g" }], instructions: ["Colocar queso sobre galletas.", "Gratinar brevemente."], tips: "Snack crujiente y rápido.", image: "https://images.pexels.com/photos/9788607/pexels-photo-9788607.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-queso-uva": { title: "Uvas con Queso", category: "snack", mealType: "snack", prepTime: "3 min", difficulty: "fácil", servings: 1, calories: 200, protein: 8, fat: 12, carbs: 20, netCarbs: 18, fiber: 2, ingredients: [{ id: "f369", name: "Uvas", quantity: 100, unit: "g" }, { id: "f370", name: "Queso brie", quantity: 40, unit: "g" }], instructions: ["Ensartar uvas y queso en palillo.", "Servir frío."], tips: "Combinación clásica.", image: "https://images.pexels.com/photos/34214021/pexels-photo-34214021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-palitos-queso": { title: "Palitos de Queso y Galletas", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 250, protein: 12, fat: 16, carbs: 22, netCarbs: 20, fiber: 2, ingredients: [{ id: "f371", name: "Queso cheddar", quantity: 50, unit: "g" }, { id: "f372", name: "Galletas saladas", quantity: 30, unit: "g" }], instructions: ["Cortar queso en bastones.", "Servir con galletas."], tips: "Snack protéico.", image: "https://images.pexels.com/photos/34644316/pexels-photo-34644316.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-batido-platano": { title: "Batido de Plátano y Mantequilla", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 280, protein: 10, fat: 14, carbs: 34, netCarbs: 28, fiber: 6, ingredients: [{ id: "f214", name: "Plátano", quantity: 100, unit: "g" }, { id: "f259", name: "Mantequilla cacahuate", quantity: 20, unit: "g" }, { id: "f213", name: "Leche almendra", quantity: 150, unit: "ml" }], instructions: ["Licuar plátano con mantequilla y leche.", "Servir frío."], tips: "Energético y delicioso.", image: "https://images.pexels.com/photos/6990114/pexels-photo-6990114.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-fruta-nueces": { title: "Fruta con Nueces", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 220, protein: 6, fat: 14, carbs: 22, netCarbs: 18, fiber: 4, ingredients: [{ id: "f258", name: "Manzana", quantity: 100, unit: "g" }, { id: "f204", name: "Nueces", quantity: 20, unit: "g" }], instructions: ["Cortar manzana en cubos.", "Agregar nueces picadas."], tips: "Snack rápido y sano.", image: "https://images.pexels.com/photos/32282191/pexels-photo-32282191.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-ensalada-frutas": { title: "Ensalada de Frutas Tropical", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 180, protein: 4, fat: 2, carbs: 42, netCarbs: 35, fiber: 7, ingredients: [{ id: "f309", name: "Mango", quantity: 80, unit: "g" }, { id: "f373", name: "Piña", quantity: 80, unit: "g" }, { id: "f374", name: "Papaya", quantity: 60, unit: "g" }, { id: "f205", name: "Miel", quantity: 10, unit: "g" }], instructions: ["Cortar frutas en cubos.", "Mezclar y agregar miel.", "Servir frío."], tips: "Refrescante y vitaminado.", image: "https://images.pexels.com/photos/37286900/pexels-photo-37286900.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-pudding-chia": { title: "Pudín de Chía con Leche", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 200, protein: 6, fat: 12, carbs: 18, netCarbs: 10, fiber: 8, ingredients: [{ id: "f21", name: "Semillas chía", quantity: 25, unit: "g" }, { id: "f213", name: "Leche coco", quantity: 150, unit: "ml" }, { id: "f205", name: "Miel", quantity: 10, unit: "g" }], instructions: ["Mezclar chía con leche y miel.", "Dejar reposar 30 min.", "Servir."], tips: "Alto en omega-3.", image: "https://images.pexels.com/photos/5947032/pexels-photo-5947032.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-aceitunas-ensalada": { title: "Ensalada de Aceitunas", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 180, protein: 2, fat: 16, carbs: 8, netCarbs: 4, fiber: 4, ingredients: [{ id: "f375", name: "Aceitunas mixtas", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }, { id: "f376", name: "Orégano", quantity: 2, unit: "g" }], instructions: ["Mezclar aceitunas con aceite.", "Espolvorear orégano."], tips: "Snack salado rico en grasas.", image: "https://images.pexels.com/photos/8996225/pexels-photo-8996225.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-galletas-avena": { title: "Galletas de Avena Caseras", category: "snack", mealType: "snack", prepTime: "25 min", difficulty: "fácil", servings: 4, calories: 160, protein: 4, fat: 6, carbs: 26, netCarbs: 20, fiber: 6, ingredients: [{ id: "f201", name: "Avena", quantity: 60, unit: "g" }, { id: "f205", name: "Miel", quantity: 20, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }, { id: "f377", name: "Pasas", quantity: 20, unit: "g" }], instructions: ["Mezclar ingredientes.", "Formar galletas.", "Hornear 12 min."], tips: "Galletas saludables.", image: "https://images.pexels.com/photos/15265270/pexels-photo-15265270.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // ==================== RECETAS ADICIONALES FINALES (para meta de 200+) ====================

  // DESAYUNOS FINALES
  "desayuno-chilaquiles": { title: "Chilaquiles Verdes", category: "desayuno", mealType: "desayuno", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 480, protein: 22, fat: 24, carbs: 50, netCarbs: 38, fiber: 12, ingredients: [{ id: "f301", name: "Tortilla maíz", quantity: 100, unit: "g" }, { id: "f378", name: "Salsa verde", quantity: 80, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 40, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 30, unit: "g" }], instructions: ["Cortar tortillas y freír.", "Agregar salsa verde.", "Colocar huevo frito y queso encima."], tips: "Clásico mexicano.", image: "https://images.pexels.com/photos/36429908/pexels-photo-36429908.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-hash-browns": { title: "Hash Browns con Huevos", category: "desayuno", mealType: "desayuno", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 450, protein: 18, fat: 26, carbs: 45, netCarbs: 35, fiber: 10, ingredients: [{ id: "f379", name: "Patatas ralladas", quantity: 150, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 20, unit: "g" }, { id: "f380", name: "Pimiento verde", quantity: 30, unit: "g" }], instructions: ["Freír patatas hasta dorar.", "Agregar huevos.", "Cocinar juntos."], tips: "Estilo estadounidense.", image: "https://images.pexels.com/photos/6529924/pexels-photo-6529924.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-waffle-belga": { title: "Waffle Belga con Fruta", category: "desayuno", mealType: "desayuno", prepTime: "20 min", difficulty: "medio", servings: 2, calories: 380, protein: 10, fat: 14, carbs: 55, netCarbs: 45, fiber: 10, ingredients: [{ id: "f381", name: "Harina waffle", quantity: 100, unit: "g" }, { id: "f1", name: "Huevos", quantity: 80, unit: "g" }, { id: "f213", name: "Leche", quantity: 100, unit: "ml" }, { id: "f205", name: "Miel", quantity: 20, unit: "g" }, { id: "f203", name: "Frutos rojos", quantity: 60, unit: "g" }], instructions: ["Mezclar ingredientes.", "Cocinar en waflera.", "Servir con fruta y miel."], tips: "Crujiente y suave.", image: "https://images.pexels.com/photos/31377698/pexels-photo-31377698.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-batido-espinaca": { title: "Batido Verde Espinaca y Manzana", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 280, protein: 10, fat: 6, carbs: 50, netCarbs: 38, fiber: 12, ingredients: [{ id: "f216", name: "Espinacas", quantity: 60, unit: "g" }, { id: "f258", name: "Manzana", quantity: 100, unit: "g" }, { id: "f214", name: "Plátano", quantity: 60, unit: "g" }, { id: "f213", name: "Leche almendra", quantity: 150, unit: "ml" }], instructions: ["Licuar todo.", "Servir frío."], tips: "Detox natural.", image: "https://images.pexels.com/photos/8169572/pexels-photo-8169572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-tortilla-huevo-carne": { title: "Tortilla de Huevo y Carne", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 420, protein: 28, fat: 24, carbs: 28, netCarbs: 20, fiber: 8, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 80, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 30, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 30, unit: "g" }], instructions: ["Sofreír carne con cebolla.", "Agregar huevos batidos.", "Cocinar y agregar queso."], tips: "Alto en proteína.", image: "https://images.pexels.com/photos/28525191/pexels-photo-28525191.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-gallo-pinto": { title: "Gallo Pinteno", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 520, protein: 24, fat: 20, carbs: 60, netCarbs: 45, fiber: 15, ingredients: [{ id: "f302", name: "Frijoles rojos", quantity: 100, unit: "g" }, { id: "f224", name: "Arroz", quantity: 80, unit: "g" }, { id: "f301", name: "Tortilla", quantity: 60, unit: "g" }, { id: "f258", name: "Plátano", quantity: 60, unit: "g" }, { id: "f1", name: "Huevos", quantity: 80, unit: "g" }], instructions: ["Cocinar arroz y frijoles.", "Freír plátano.", "Agregar huevo."], tips: "Desayuno típico costarricense.", image: "https://images.pexels.com/photos/37347242/pexels-photo-37347242.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-muffin-huevo": { title: "Muffin de Huevo y Tocino", category: "desayuno", mealType: "desayuno", prepTime: "20 min", difficulty: "fácil", servings: 2, calories: 320, protein: 20, fat: 22, carbs: 8, netCarbs: 6, fiber: 2, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f261", name: "Tocino", quantity: 60, unit: "g" }, { id: "f253", name: "Queso cheddar", quantity: 30, unit: "g" }], instructions: ["Batir huevos.", "Agregar tocino y queso.", "Hornear en moldes."], tips: "Portátil y protéico.", image: "https://images.pexels.com/photos/12261092/pexels-photo-12261092.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-acai-bowl": { title: "Acai Bowl con Granola", category: "desayuno", mealType: "desayuno", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 380, protein: 8, fat: 12, carbs: 62, netCarbs: 45, fiber: 17, ingredients: [{ id: "f382", name: "Puré acai", quantity: 100, unit: "g" }, { id: "f210", name: "Granola", quantity: 50, unit: "g" }, { id: "f258", name: "Plátano", quantity: 80, unit: "g" }, { id: "f203", name: "Frutos rojos", quantity: 50, unit: "g" }, { id: "f205", name: "Miel", quantity: 15, unit: "g" }], instructions: ["Triturar acai con plátano.", "Agregar toppings.", "Servir frío."], tips: "Superfood bowl.", image: "https://images.pexels.com/photos/12273052/pexels-photo-12273052.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // ALMUERZOS FINALES
  "almuerzo-ceviche-pescado": { title: "Ceviche de Pescado", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "medio", servings: 2, calories: 280, protein: 28, fat: 8, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f339", name: "Pescado blanco", quantity: 200, unit: "g" }, { id: "f383", name: "Limón", quantity: 80, unit: "ml" }, { id: "f239", name: "Cebolla morada", quantity: 60, unit: "g" }, { id: "f222", name: "Tomate", quantity: 60, unit: "g" }, { id: "f384", name: "Cilantro", quantity: 15, unit: "g" }], instructions: ["Cortar pescado en cubos.", "Marinar en limón.", "Mezclar con cebolla y tomate."], tips: "Fresco y bajo en grasa.", image: "https://images.pexels.com/photos/29188618/pexels-photo-29188618.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-bandel-hummus": { title: "Bandeja de Hummus con Verduras", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 420, protein: 16, fat: 22, carbs: 45, netCarbs: 30, fiber: 15, ingredients: [{ id: "f229", name: "Hummus", quantity: 100, unit: "g" }, { id: "f385", name: "Pan pita", quantity: 80, unit: "g" }, { id: "f366", name: "Zanahorias", quantity: 80, unit: "g" }, { id: "f367", name: "Apio", quantity: 60, unit: "g" }, { id: "f12", name: "Aguacate", quantity: 50, unit: "g" }], instructions: ["Servir hummus.", "Agregar verduras y pan.", "Acompañar con aguacate."], tips: "Completo y nutritivo.", image: "https://images.pexels.com/photos/34227781/pexels-photo-34227781.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-sopa-carbonara": { title: "Pasta Carbonara", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "medio", servings: 2, calories: 580, protein: 24, fat: 28, carbs: 60, netCarbs: 50, fiber: 10, ingredients: [{ id: "f386", name: "Pasta spaghetti", quantity: 150, unit: "g" }, { id: "f261", name: "Tocino", quantity: 80, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f253", name: "Queso parmesano", quantity: 40, unit: "g" }], instructions: ["Cocinar pasta.", "Sofreír tocino.", "Mezclar huevo y queso, agregar a pasta."], tips: "Clásico italiano.", image: "https://images.pexels.com/photos/31779533/pexels-photo-31779533.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-salteado-verduras": { title: "Salteado de Verduras con Tofu", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 380, protein: 20, fat: 18, carbs: 40, netCarbs: 25, fiber: 15, ingredients: [{ id: "f358", name: "Tofu", quantity: 100, unit: "g" }, { id: "f387", name: "Brócoli", quantity: 80, unit: "g" }, { id: "f388", name: "Pimientos mixtos", quantity: 80, unit: "g" }, { id: "f312", name: "Salsa soja", quantity: 20, unit: "ml" }, { id: "f13", name: "Aceite sésamo", quantity: 15, unit: "ml" }], instructions: ["Sofreír tofu.", "Agregar verduras.", "Sazonar con salsa de soja."], tips: "Vegano y alto en proteína.", image: "https://images.pexels.com/photos/9218768/pexels-photo-9218768.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-hamburguesa-vegetal": { title: "Hamburguesa Vegetariana", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 480, protein: 22, fat: 20, carbs: 55, netCarbs: 40, fiber: 15, ingredients: [{ id: "f389", name: "Pan hamburguesa", quantity: 80, unit: "g" }, { id: "f326", name: "Garbanzos", quantity: 80, unit: "g" }, { id: "f390", name: "Vegetales rallados", quantity: 60, unit: "g" }, { id: "f229", name: "Hummus", quantity: 40, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 30, unit: "g" }], instructions: ["Formar hamburguesa de garbanzos.", "Cocinar a la plancha.", "Servir en pan con queso y hummus."], tips: "Sin carne.", image: "https://images.pexels.com/photos/36007382/pexels-photo-36007382.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-bowl-bibimpap": { title: "Bibimbap Coreano", category: "almuerzo", mealType: "almuerzo", prepTime: "30 min", difficulty: "medio", servings: 1, calories: 520, protein: 32, fat: 18, carbs: 60, netCarbs: 45, fiber: 15, ingredients: [{ id: "f224", name: "Arroz", quantity: 120, unit: "g" }, { id: "f220", name: "Carne ternera", quantity: 80, unit: "g" }, { id: "f391", name: "Verduras coreanas", quantity: 100, unit: "g" }, { id: "f392", name: "Huevo frito", quantity: 80, unit: "g" }, { id: "f312", name: "Salsa gochujang", quantity: 20, unit: "g" }], instructions: ["Cocinar arroz.", "Preparar verduras y carne.", "Armar bowl con huevo frito y salsa."], tips: "Plato completo coreano.", image: "https://images.pexels.com/photos/36872934/pexels-photo-36872934.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-matambre-lechuga": { title: "Matambre a la Lechuga", category: "almuerzo", mealType: "almuerzo", prepTime: "30 min", difficulty: "medio", servings: 2, calories: 450, protein: 40, fat: 24, carbs: 20, netCarbs: 15, fiber: 5, ingredients: [{ id: "f393", name: "Matambre", quantity: 200, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 100, unit: "g" }, { id: "f222", name: "Tomate", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 20, unit: "ml" }], instructions: ["Cocinar matambre.", "Envolver en lechuga.", "Agregar tomate y aliño."], tips: "Bajo en carbs.", image: "https://images.pexels.com/photos/36869219/pexels-photo-36869219.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-milanesa-pollo": { title: "Milanesa de Pollo con Papas", category: "almuerzo", mealType: "almuerzo", prepTime: "30 min", difficulty: "fácil", servings: 1, calories: 580, protein: 42, fat: 24, carbs: 50, netCarbs: 40, fiber: 10, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 150, unit: "g" }, { id: "f394", name: "Rebozado", quantity: 50, unit: "g" }, { id: "f343", name: "Patatas", quantity: 150, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }], instructions: ["Empanar pollo.", "Freír hasta dorado.", "Acompañar con patatas."], tips: "Clásico argentino.", image: "https://images.pexels.com/photos/33865568/pexels-photo-33865568.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-bowl-caesar": { title: "Ensalada César con Pollo", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 480, protein: 38, fat: 26, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" }, { id: "f221", name: "Lechuga romana", quantity: 100, unit: "g" }, { id: "f395", name: "Aderezo cesar", quantity: 40, unit: "g" }, { id: "f396", name: "Crutones", quantity: 30, unit: "g" }, { id: "f253", name: "Queso parmesano", quantity: 20, unit: "g" }], instructions: ["Grillear pollo.", "Mezclar lechuga con aderezo.", "Agregar pollo, crutones y queso."], tips: "Clásico estadounidense.", image: "https://images.pexels.com/photos/19938473/pexels-photo-19938473.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // CENAS FINALES
  "cena-pollo-cerdo": { title: "Estofado de Pollo y Cerdo", category: "cena", mealType: "cena", prepTime: "45 min", difficulty: "medio", servings: 2, calories: 520, protein: 45, fat: 22, carbs: 40, netCarbs: 30, fiber: 10, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" }, { id: "f353", name: "Cerdo paleta", quantity: 120, unit: "g" }, { id: "f226", name: "Zanahoria", quantity: 80, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 60, unit: "g" }, { id: "f320", name: "Caldo pollo", quantity: 300, unit: "ml" }], instructions: ["Sofreír carnes.", "Agregar verduras y caldo.", "Cocinar a fuego lento."], tips: "Guiso reconfortante.", image: "https://images.pexels.com/photos/14146060/pexels-photo-14146060.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pescado-mango": { title: "Pescado con Salsa de Mango", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 380, protein: 32, fat: 14, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f397", name: "Filete tilapia", quantity: 150, unit: "g" }, { id: "f309", name: "Mango", quantity: 80, unit: "g" }, { id: "f398", name: "Pimiento amarillo", quantity: 50, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cocinar pescado.", "Preparar salsa de mango.", "Servir pescado con salsa."], tips: "Combinación tropical.", image: "https://images.pexels.com/photos/19120330/pexels-photo-19120330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-lomo-manzana": { title: "Lomo de Cerdo con Manzana", category: "cena", mealType: "cena", prepTime: "35 min", difficulty: "medio", servings: 2, calories: 480, protein: 38, fat: 22, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f399", name: "Lomo cerdo", quantity: 180, unit: "g" }, { id: "f258", name: "Manzana", quantity: 100, unit: "g" }, { id: "f400", name: "Cerveza", quantity: 100, unit: "ml" }, { id: "f226", name: "Zanahoria", quantity: 80, unit: "g" }], instructions: ["Sazonar lomo.", "Cocinar con manzanas y cerveza.", "Servir con zanahorias."], tips: "Agridulce perfecto.", image: "https://images.pexels.com/photos/32080132/pexels-photo-32080132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pavo-mayor": { title: "Pavo al Horno con Hierbas", category: "cena", mealType: "cena", prepTime: "50 min", difficulty: "medio", servings: 2, calories: 420, protein: 45, fat: 16, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f228", name: "Pavo", quantity: 180, unit: "g" }, { id: "f401", name: "Romero fresco", quantity: 10, unit: "g" }, { id: "f402", name: "Tomillo", quantity: 5, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 20, unit: "ml" }], instructions: ["Sazonar pavo con hierbas.", "Hornear hasta dorado.", "Reposar antes de cortar."], tips: "Bajo en grasa.", image: "https://images.pexels.com/photos/5876544/pexels-photo-5876544.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-bowl-salmon": { title: "Bowl de Salmón y Arroz", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 520, protein: 38, fat: 22, carbs: 48, netCarbs: 35, fiber: 13, ingredients: [{ id: "f242", name: "Salmón", quantity: 140, unit: "g" }, { id: "f224", name: "Arroz jazmín", quantity: 100, unit: "g" }, { id: "f225", name: "Brócoli", quantity: 60, unit: "g" }, { id: "f403", name: "Salsa teriyaki", quantity: 30, unit: "ml" }], instructions: ["Cocinar arroz.", "Grillear salmón.", "Armar bowl y agregar salsa."], tips: "Estilo asiático.", image: "https://images.pexels.com/photos/37058820/pexels-photo-37058820.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-albondigas-salsa": { title: "Albóndigas en Salsa de Tomate", category: "cena", mealType: "cena", prepTime: "40 min", difficulty: "medio", servings: 2, calories: 480, protein: 35, fat: 24, carbs: 35, netCarbs: 28, fiber: 7, ingredients: [{ id: "f261", name: "Carne molida", quantity: 150, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 120, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 50, unit: "g" }, { id: "f404", name: "Pan rallado", quantity: 20, unit: "g" }], instructions: ["Formar albóndigas.", "Cocinar en salsa de tomate.", "Servir con arroz."], tips: "Clásico casero.", image: "https://images.pexels.com/photos/36958915/pexels-photo-36958915.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-ratatuille": { title: "Ratatouille Provenzal", category: "cena", mealType: "cena", prepTime: "40 min", difficulty: "medio", servings: 2, calories: 320, protein: 10, fat: 18, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f405", name: "Berenjena", quantity: 100, unit: "g" }, { id: "f406", name: "Calabacín", quantity: 100, unit: "g" }, { id: "f222", name: "Tomates", quantity: 120, unit: "g" }, { id: "f407", name: "Calabaza", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 20, unit: "ml" }], instructions: ["Cortar verduras en rodajas.", "Hornear con aceite y hierbas.", "Servir caliente."], tips: "Vegetal y ligero.", image: "https://images.pexels.com/photos/36863876/pexels-photo-36863876.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pollo-barbacoa": { title: "Pollo a la Barbacoa", category: "cena", mealType: "cena", prepTime: "35 min", difficulty: "fácil", servings: 2, calories: 480, protein: 42, fat: 18, carbs: 40, netCarbs: 32, fiber: 8, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 180, unit: "g" }, { id: "f342", name: "Salsa barbacoa", quantity: 60, unit: "g" }, { id: "f343", name: "Patatas", quantity: 150, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sazonar pollo.", "Cocinar y agregar salsa.", "Acompañar con patatas."], tips: "Favorito estadounidense.", image: "https://images.pexels.com/photos/28635476/pexels-photo-28635476.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // SNACKS FINALES
  "snack-verduras-hummus-2": { title: "Palitos de Verdura con Guacamole", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 250, protein: 6, fat: 18, carbs: 20, netCarbs: 14, fiber: 6, ingredients: [{ id: "f12", name: "Aguacate", quantity: 80, unit: "g" }, { id: "f366", name: "Zanahorias", quantity: 60, unit: "g" }, { id: "f367", name: "Apio", quantity: 60, unit: "g" }, { id: "f408", name: "Limón", quantity: 15, unit: "ml" }], instructions: ["Machacar aguacate con limón.", "Cortar verduras.", "Servir con guacamole."], tips: "Crujiente y cremoso.", image: "https://images.pexels.com/photos/8158477/pexels-photo-8158477.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-energia-bola": { title: "Bola de Energía con Dátiles", category: "snack", mealType: "snack", prepTime: "15 min", difficulty: "fácil", servings: 4, calories: 180, protein: 4, fat: 10, carbs: 24, netCarbs: 20, fiber: 4, ingredients: [{ id: "f409", name: "Dátiles", quantity: 80, unit: "g" }, { id: "f201", name: "Avena", quantity: 40, unit: "g" }, { id: "f259", name: "Mantequilla cacahuate", quantity: 20, unit: "g" }, { id: "f410", name: "Chocolate oscuro", quantity: 20, unit: "g" }], instructions: ["Triturar dátiles con avena.", "Agregar mantequilla y formar bolas.", "Cubrir con chocolate."], tips: "Snack energético natural.", image: "https://images.pexels.com/photos/28354485/pexels-photo-28354485.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-crostini-queso": { title: "Crostini con Queso y Mermelada", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 220, protein: 8, fat: 10, carbs: 28, netCarbs: 24, fiber: 4, ingredients: [{ id: "f411", name: "Pan baguette", quantity: 50, unit: "g" }, { id: "f370", name: "Queso brie", quantity: 40, unit: "g" }, { id: "f412", name: "Mermelada uva", quantity: 30, unit: "g" }], instructions: ["Tostar pan.", "Agregar queso y mermelada.", "Servir caliente."], tips: "Combinación dulce y salado.", image: "https://images.pexels.com/photos/4109954/pexels-photo-4109954.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-leche-digestiva": { title: "Leche Digestiva con Jengibre", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 150, protein: 8, fat: 6, carbs: 18, netCarbs: 16, fiber: 2, ingredients: [{ id: "f413", name: "Leche tibia", quantity: 200, unit: "ml" }, { id: "f414", name: "Jengibre rallado", quantity: 5, unit: "g" }, { id: "f205", name: "Miel", quantity: 10, unit: "g" }], instructions: ["Calentar leche.", "Agregar miel y jengibre.", "Servir tibia."], tips: "Para digestión.", image: "https://images.pexels.com/photos/37186989/pexels-photo-37186989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-tostada-mantequilla": { title: "Tostada con Mantequilla de Maní", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 280, protein: 10, fat: 16, carbs: 28, netCarbs: 22, fiber: 6, ingredients: [{ id: "f236", name: "Pan integral", quantity: 60, unit: "g" }, { id: "f259", name: "Mantequilla cacahuate", quantity: 30, unit: "g" }], instructions: ["Tostar pan.", "Untar mantequilla de maní.", "Servir."], tips: "Clásico americano.", image: "https://images.pexels.com/photos/6659901/pexels-photo-6659901.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-yogur-granada": { title: "Yogur con Granada", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 180, protein: 12, fat: 6, carbs: 22, netCarbs: 18, fiber: 4, ingredients: [{ id: "f208", name: "Yogur griego", quantity: 150, unit: "g" }, { id: "f415", name: "Granada", quantity: 60, unit: "g" }], instructions: ["Verter yogur.", "Agregar semillas de Granada.", "Servir frío."], tips: "Antioxidante.", image: "https://images.pexels.com/photos/8805122/pexels-photo-8805122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-palitroques-fruta": { title: "Palitroques de Fruta", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 160, protein: 4, fat: 2, carbs: 36, netCarbs: 28, fiber: 8, ingredients: [{ id: "f258", name: "Manzana", quantity: 80, unit: "g" }, { id: "f258", name: "Uva", quantity: 80, unit: "g" }, { id: "f258", name: "Fresa", quantity: 60, unit: "g" }], instructions: ["Cortar frutas en cubos.", "Ensartar en palitos."], tips: "Snack colorido.", image: "https://images.pexels.com/photos/5037609/pexels-photo-5037609.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-gelatina-fruta": { title: "Gelatina con Fruta", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 120, protein: 4, fat: 0, carbs: 26, netCarbs: 24, fiber: 2, ingredients: [{ id: "f416", name: "Gelatina sin azúcar", quantity: 100, unit: "g" }, { id: "f258", name: "Frutos rojos", quantity: 50, unit: "g" }], instructions: ["Preparar gelatina.", "Agregar fruta.", "Enfriar y servir."], tips: "Light y refrescante.", image: "https://images.pexels.com/photos/8191226/pexels-photo-8191226.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // ==================== RECETAS EXTRA PARA META 200+ ====================

  // DESAYUNOS EXTRA
  "desayuno-omelette-champi": { title: "Omelette de Champiñones y Queso", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 350, protein: 24, fat: 24, carbs: 8, netCarbs: 5, fiber: 3, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f215", name: "Champiñones", quantity: 60, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 40, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 10, unit: "g" }], instructions: ["Sofreír champiñones.", "Agregar huevos.", "Agregar queso y servir."], tips: "Bajo en carbs.", image: "https://images.pexels.com/photos/27359373/pexels-photo-27359373.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-batido-proteina-chocolate": { title: "Batido de Proteína Chocolate", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 300, protein: 30, fat: 8, carbs: 25, netCarbs: 20, fiber: 5, ingredients: [{ id: "f212", name: "Proteína chocolate", quantity: 30, unit: "g" }, { id: "f213", name: "Leche", quantity: 250, unit: "ml" }, { id: "f214", name: "Plátano", quantity: 60, unit: "g" }], instructions: ["Licuar todo.", "Servir frío."], tips: "Post-entrenamiento.", image: "https://images.pexels.com/photos/28010210/pexels-photo-28010210.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-huevos-cocidos": { title: "Huevos Cocidos con Ají", category: "desayuno", mealType: "desayuno", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 280, protein: 20, fat: 18, carbs: 8, netCarbs: 5, fiber: 3, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f417", name: "Ají fresco", quantity: 30, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 10, unit: "g" }], instructions: ["Hervir huevos.", "Freír ají con mantequilla.", "Servir juntos."], tips: "Simple y nutritivo.", image: "https://images.pexels.com/photos/6294392/pexels-photo-6294392.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-tostada-mantequilla-mani": { title: "Tostada con Mantequilla de Maní", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 340, protein: 12, fat: 20, carbs: 32, netCarbs: 25, fiber: 7, ingredients: [{ id: "f236", name: "Pan integral", quantity: 60, unit: "g" }, { id: "f259", name: "Mantequilla cacahuate", quantity: 30, unit: "g" }], instructions: ["Tostar pan.", "Untar mantequilla de maní.", "Servir."], tips: "Energético.", image: "https://images.pexels.com/photos/6659901/pexels-photo-6659901.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-batido-fresa-avena": { title: "Batido de Fresa y Avena", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 320, protein: 12, fat: 8, carbs: 52, netCarbs: 40, fiber: 12, ingredients: [{ id: "f418", name: "Fresas", quantity: 100, unit: "g" }, { id: "f201", name: "Avena", quantity: 40, unit: "g" }, { id: "f213", name: "Leche almendra", quantity: 200, unit: "ml" }, { id: "f205", name: "Miel", quantity: 10, unit: "g" }], instructions: ["Licuar todo.", "Servir frío."], tips: "Rico en fibra.", image: "https://images.pexels.com/photos/32946783/pexels-photo-32946783.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-panqueques-platano": { title: "Panqueques de Plátano", category: "desayuno", mealType: "desayuno", prepTime: "15 min", difficulty: "fácil", servings: 2, calories: 360, protein: 14, fat: 12, carbs: 52, netCarbs: 40, fiber: 12, ingredients: [{ id: "f214", name: "Plátano maduro", quantity: 150, unit: "g" }, { id: "f1", name: "Huevos", quantity: 100, unit: "g" }, { id: "f201", name: "Avena", quantity: 40, unit: "g" }, { id: "f205", name: "Miel", quantity: 15, unit: "g" }], instructions: ["Triturar todo.", "Cocinar en sartén.", "Servir con miel."], tips: "Sin harina.", image: "https://images.pexels.com/photos/14263510/pexels-photo-14263510.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-tostada-atun": { title: "Tostada con Atún y Palta", category: "desayuno", mealType: "desayuno", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 380, protein: 26, fat: 22, carbs: 28, netCarbs: 18, fiber: 10, ingredients: [{ id: "f232", name: "Atún", quantity: 100, unit: "g" }, { id: "f12", name: "Aguacate", quantity: 60, unit: "g" }, { id: "f236", name: "Pan integral", quantity: 50, unit: "g" }], instructions: ["Escurrir atún.", "Machacar con aguacate.", "Untar en tostada."], tips: "Rápido y protéico.", image: "https://images.pexels.com/photos/4491396/pexels-photo-4491396.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-yogur-miel-nueces": { title: "Yogur con Miel y Nueces", category: "desayuno", mealType: "desayuno", prepTime: "3 min", difficulty: "fácil", servings: 1, calories: 300, protein: 14, fat: 14, carbs: 32, netCarbs: 25, fiber: 7, ingredients: [{ id: "f208", name: "Yogur griego", quantity: 150, unit: "g" }, { id: "f205", name: "Miel", quantity: 15, unit: "g" }, { id: "f204", name: "Nueces", quantity: 20, unit: "g" }], instructions: ["Verter yogur.", "Agregar miel y nueces."], tips: "Simple y saludable.", image: "https://images.pexels.com/photos/36972553/pexels-photo-36972553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-espinacas-huevo": { title: "Huevos con Espinacas", category: "desayuno", mealType: "desayuno", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 320, protein: 22, fat: 22, carbs: 10, netCarbs: 6, fiber: 4, ingredients: [{ id: "f1", name: "Huevos", quantity: 150, unit: "g" }, { id: "f216", name: "Espinacas", quantity: 80, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }], instructions: ["Saltear espinacas.", "Agregar huevos.", "Cocinar juntos."], tips: "Ligero y nutritivo.", image: "https://images.pexels.com/photos/15868572/pexels-photo-15868572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "desayuno-batido-espinaca-proteina": { title: "Batido de Espinaca con Proteína", category: "desayuno", mealType: "desayuno", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 280, protein: 28, fat: 8, carbs: 25, netCarbs: 18, fiber: 7, ingredients: [{ id: "f216", name: "Espinacas", quantity: 60, unit: "g" }, { id: "f212", name: "Proteína vainilla", quantity: 30, unit: "g" }, { id: "f213", name: "Leche", quantity: 200, unit: "ml" }], instructions: ["Licuar todo.", "Servir frío."], tips: "Verde power.", image: "https://images.pexels.com/photos/7656401/pexels-photo-7656401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // ALMUERZOS EXTRA
  "almuerzo-sopa-carne": { title: "Sopa de Carne con Verduras", category: "almuerzo", mealType: "almuerzo", prepTime: "40 min", difficulty: "fácil", servings: 2, calories: 380, protein: 30, fat: 14, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f261", name: "Carne molida", quantity: 100, unit: "g" }, { id: "f320", name: "Caldo carne", quantity: 400, unit: "ml" }, { id: "f226", name: "Zanahoria", quantity: 60, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 40, unit: "g" }], instructions: ["Sofreír carne.", "Agregar caldo y verduras.", "Cocinar 30 min."], tips: "Reconfortante.", image: "https://images.pexels.com/photos/38441086/pexels-photo-38441086.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-sandwich-pavo": { title: "Sándwich de Pavo y Queso", category: "almuerzo", mealType: "almuerzo", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 420, protein: 30, fat: 18, carbs: 38, netCarbs: 30, fiber: 8, ingredients: [{ id: "f228", name: "Pavo en fetas", quantity: 100, unit: "g" }, { id: "f236", name: "Pan integral", quantity: 80, unit: "g" }, { id: "f315", name: "Queso cheddar", quantity: 30, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 30, unit: "g" }], instructions: ["Armar sándwich.", "Agregar pavo, queso y lechuga.", "Servir."], tips: "Clásico rápido.", image: "https://images.pexels.com/photos/34100509/pexels-photo-34100509.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-ensalada-atun-maiz": { title: "Ensalada de Atún con Maíz", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 380, protein: 32, fat: 14, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f232", name: "Atún", quantity: 120, unit: "g" }, { id: "f419", name: "Maíz", quantity: 60, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 80, unit: "g" }, { id: "f222", name: "Tomate", quantity: 50, unit: "g" }], instructions: ["Mezclar atún con maíz.", "Agregar verduras.", "Aliñar."], tips: "Fresca y ligera.", image: "https://images.pexels.com/photos/19051901/pexels-photo-19051901.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-tacos-res": { title: "Tacos de Res", category: "almuerzo", mealType: "almuerzo", prepTime: "25 min", difficulty: "fácil", servings: 2, calories: 480, protein: 32, fat: 20, carbs: 45, netCarbs: 35, fiber: 10, ingredients: [{ id: "f261", name: "Carne molida res", quantity: 150, unit: "g" }, { id: "f301", name: "Tortillas maíz", quantity: 80, unit: "g" }, { id: "f239", name: "Cebolla", quantity: 40, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 40, unit: "g" }], instructions: ["Sofreír carne.", "Calentar tortillas.", "Armar tacos."], tips: "Mexicano clásico.", image: "https://images.pexels.com/photos/17812436/pexels-photo-17812436.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-arroz-pollo-verduras": { title: "Arroz con Pollo y Verduras", category: "almuerzo", mealType: "almuerzo", prepTime: "30 min", difficulty: "fácil", servings: 2, calories: 520, protein: 35, fat: 16, carbs: 60, netCarbs: 45, fiber: 15, ingredients: [{ id: "f224", name: "Arroz", quantity: 150, unit: "g" }, { id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" }, { id: "f225", name: "Brócoli", quantity: 80, unit: "g" }, { id: "f226", name: "Zanahoria", quantity: 60, unit: "g" }], instructions: ["Cocinar arroz.", "Sofreír pollo con verduras.", "Mezclar y servir."], tips: "Completo.", image: "https://images.pexels.com/photos/36982101/pexels-photo-36982101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-quesadilla-pollo": { title: "Quesadilla de Pollo", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 460, protein: 34, fat: 22, carbs: 40, netCarbs: 30, fiber: 10, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 100, unit: "g" }, { id: "f301", name: "Tortilla", quantity: 80, unit: "g" }, { id: "f253", name: "Queso mozzarella", quantity: 50, unit: "g" }], instructions: ["Sofreír pollo.", "Rellenar tortilla con pollo y queso.", "Dorar."], tips: "Rápida y satisfyoria.", image: "https://images.pexels.com/photos/14930606/pexels-photo-14930606.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-ensalada-pollo-coco": { title: "Ensalada de Pollo y Coco", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 420, protein: 36, fat: 22, carbs: 22, netCarbs: 15, fiber: 7, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 120, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 80, unit: "g" }, { id: "f420", name: "Coco rallado", quantity: 30, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Grillear pollo.", "Mezclar con lechuga.", "Espolvorear coco y aceite."], tips: "Exótica y ligera.", image: "https://images.pexels.com/photos/14098784/pexels-photo-14098784.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-bowl-salmon-avocado": { title: "Bowl de Salmón y Aguacate", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 520, protein: 38, fat: 28, carbs: 35, netCarbs: 22, fiber: 13, ingredients: [{ id: "f242", name: "Salmón", quantity: 140, unit: "g" }, { id: "f12", name: "Aguacate", quantity: 80, unit: "g" }, { id: "f224", name: "Arroz jazmín", quantity: 80, unit: "g" }, { id: "f225", name: "Edamame", quantity: 40, unit: "g" }], instructions: ["Cocinar arroz.", "Grillear salmón.", "Armar bowl con aguacate y edamame."], tips: "Omega-3 completo.", image: "https://images.pexels.com/photos/15913466/pexels-photo-15913466.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-pasta-atun": { title: "Pasta con Atún y Tomate", category: "almuerzo", mealType: "almuerzo", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 480, protein: 28, fat: 16, carbs: 58, netCarbs: 45, fiber: 13, ingredients: [{ id: "f386", name: "Pasta", quantity: 100, unit: "g" }, { id: "f232", name: "Atún", quantity: 80, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 80, unit: "g" }], instructions: ["Cocinar pasta.", "Mezclar con atún y salsa.", "Calentar y servir."], tips: "Mar y tierra.", image: "https://images.pexels.com/photos/6896393/pexels-photo-6896393.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "almuerzo-wrap-vegetal": { title: "Wrap Vegetariano", category: "almuerzo", mealType: "almuerzo", prepTime: "15 min", difficulty: "fácil", servings: 1, calories: 380, protein: 14, fat: 18, carbs: 45, netCarbs: 32, fiber: 13, ingredients: [{ id: "f227", name: "Tortilla integral", quantity: 80, unit: "g" }, { id: "f229", name: "Hummus", quantity: 50, unit: "g" }, { id: "f326", name: "Garbanzos", quantity: 60, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 40, unit: "g" }], instructions: ["Extender hummus.", "Agregar garbanzos y lechuga.", "Enrollar."], tips: "Vegano y nutritivo.", image: "https://images.pexels.com/photos/31177729/pexels-photo-31177729.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // CENAS EXTRA
  "cena-pescado-en papillote": { title: "Pescado en Papillote", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 320, protein: 30, fat: 14, carbs: 20, netCarbs: 14, fiber: 6, ingredients: [{ id: "f397", name: "Filete pescado", quantity: 150, unit: "g" }, { id: "f225", name: "Verduras mixtas", quantity: 80, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }, { id: "f241", name: "Ajo", quantity: 5, unit: "g" }], instructions: ["Colocar pescado con verduras.", "Rociar aceite y ajo.", "Hornear en papel."], tips: "Ligero y sabroso.", image: "https://images.pexels.com/photos/15869769/pexels-photo-15869769.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pollo-manzana": { title: "Pollo con Manzana y Canela", category: "cena", mealType: "cena", prepTime: "30 min", difficulty: "fácil", servings: 2, calories: 420, protein: 36, fat: 16, carbs: 35, netCarbs: 28, fiber: 7, ingredients: [{ id: "f220", name: "Pechuga pollo", quantity: 160, unit: "g" }, { id: "f258", name: "Manzana", quantity: 100, unit: "g" }, { id: "f307", name: "Canela", quantity: 3, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sofreír pollo.", "Agregar manzana y canela.", "Cocinar y servir."], tips: "Dulce-salado.", image: "https://images.pexels.com/photos/24973405/pexels-photo-24973405.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-cerdo-verduras": { title: "Cerdo con Verduras Salteadas", category: "cena", mealType: "cena", prepTime: "25 min", difficulty: "fácil", servings: 1, calories: 450, protein: 35, fat: 22, carbs: 30, netCarbs: 22, fiber: 8, ingredients: [{ id: "f353", name: "Cerdo paleta", quantity: 140, unit: "g" }, { id: "f387", name: "Brócoli", quantity: 80, unit: "g" }, { id: "f388", name: "Pimientos", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Sofreír cerdo.", "Agregar verduras.", "Saltear juntos."], tips: "Proteico y colorido.", image: "https://images.pexels.com/photos/17216562/pexels-photo-17216562.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-ensalada-quinoa-vegetal": { title: "Ensalada Templada de Quinoa", category: "cena", mealType: "cena", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 380, protein: 16, fat: 16, carbs: 45, netCarbs: 32, fiber: 13, ingredients: [{ id: "f219", name: "Quinoa", quantity: 100, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 60, unit: "g" }, { id: "f225", name: "Brócoli", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cocinar quinoa.", "Mezclar con verduras.", "Aliñar con aceite."], tips: "Vegetariana.", image: "https://images.pexels.com/photos/4768994/pexels-photo-4768994.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-bistec-cerdo-parrillada": { title: "Parrillada de Cerdo", category: "cena", mealType: "cena", prepTime: "30 min", difficulty: "fácil", servings: 2, calories: 480, protein: 42, fat: 24, carbs: 28, netCarbs: 20, fiber: 8, ingredients: [{ id: "f353", name: "Cerdo costilla", quantity: 200, unit: "g" }, { id: "f388", name: "Pimientos", quantity: 80, unit: "g" }, { id: "f226", name: "Zanahorias", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["A la parrilla.", "Con verduras asadas."], tips: "Al fuego.", image: "https://images.pexels.com/photos/27294705/pexels-photo-27294705.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-huevos-rellenos-atun": { title: "Huevos Rellenos de Atún", category: "cena", mealType: "cena", prepTime: "20 min", difficulty: "fácil", servings: 2, calories: 340, protein: 28, fat: 22, carbs: 6, netCarbs: 4, fiber: 2, ingredients: [{ id: "f1", name: "Huevos", quantity: 200, unit: "g" }, { id: "f232", name: "Atún", quantity: 80, unit: "g" }, { id: "f237", name: "Mayonesa", quantity: 30, unit: "g" }], instructions: ["Hervir huevos.", "Mezclar atún con mayonesa.", "Rellenar."], tips: "Light.", image: "https://images.pexels.com/photos/31713761/pexels-photo-31713761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-sopa-mariscos": { title: "Sopa de Mariscos", category: "cena", mealType: "cena", prepTime: "35 min", difficulty: "medio", servings: 2, calories: 380, protein: 28, fat: 14, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f331", name: "Camarones", quantity: 100, unit: "g" }, { id: "f332", name: "Mejillones", quantity: 80, unit: "g" }, { id: "f333", name: "Caldo pescado", quantity: 400, unit: "ml" }, { id: "f224", name: "Arroz", quantity: 60, unit: "g" }], instructions: ["Hervir caldo.", "Agregar mariscos.", "Con arroz."], tips: "Mar completa.", image: "https://images.pexels.com/photos/36842305/pexels-photo-36842305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-tofu-salteado": { title: "Tofu Salteado con Vegetales", category: "cena", mealType: "cena", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 340, protein: 20, fat: 18, carbs: 28, netCarbs: 18, fiber: 10, ingredients: [{ id: "f358", name: "Tofu", quantity: 120, unit: "g" }, { id: "f387", name: "Brócoli", quantity: 60, unit: "g" }, { id: "f388", name: "Pimientos", quantity: 60, unit: "g" }, { id: "f312", name: "Salsa soja", quantity: 20, unit: "ml" }], instructions: ["Sofreír tofu.", "Agregar verduras.", "Sazonar."], tips: "Vegano.", image: "https://images.pexels.com/photos/9218768/pexels-photo-9218768.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-calabaza-rellena": { title: "Calabaza Rellena de Carne", category: "cena", mealType: "cena", prepTime: "45 min", difficulty: "medio", servings: 2, calories: 420, protein: 28, fat: 20, carbs: 35, netCarbs: 25, fiber: 10, ingredients: [{ id: "f407", name: "Calabaza", quantity: 200, unit: "g" }, { id: "f261", name: "Carne molida", quantity: 100, unit: "g" }, { id: "f234", name: "Salsa tomate", quantity: 60, unit: "g" }], instructions: ["Cortar calabaza y hornear.", "Rellenar con carne.", "Hornear hasta listo."], tips: "Otoñal.", image: "https://images.pexels.com/photos/33749338/pexels-photo-33749338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "cena-pavo-ensalada": { title: "Ensalada de Pavo y Legumbres", category: "cena", mealType: "cena", prepTime: "20 min", difficulty: "fácil", servings: 1, calories: 380, protein: 32, fat: 14, carbs: 32, netCarbs: 22, fiber: 10, ingredients: [{ id: "f228", name: "Pavo", quantity: 120, unit: "g" }, { id: "f238", name: "Lentejas", quantity: 60, unit: "g" }, { id: "f221", name: "Lechuga", quantity: 60, unit: "g" }, { id: "f13", name: "Aceite oliva", quantity: 15, unit: "ml" }], instructions: ["Cortar pavo.", "Mezclar con lentejas y lechuga.", "Aliñar."], tips: "Alto en proteína.", image: "https://images.pexels.com/photos/23384616/pexels-photo-23384616.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },

  // SNACKS EXTRA
  "snack-tartaletas-fruta": { title: "Tartaletas de Fruta", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 2, calories: 160, protein: 4, fat: 6, carbs: 26, netCarbs: 22, fiber: 4, ingredients: [{ id: "f421", name: "Masitas", quantity: 60, unit: "g" }, { id: "f258", name: "Fruta mixta", quantity: 80, unit: "g" }], instructions: ["Poner fruta en tartaletas.", "Servir frío."], tips: "Fresco.", image: "https://images.pexels.com/photos/38673820/pexels-photo-38673820.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-queso-uva-2": { title: "Queso con Uvas", category: "snack", mealType: "snack", prepTime: "3 min", difficulty: "fácil", servings: 1, calories: 220, protein: 10, fat: 14, carbs: 18, netCarbs: 16, fiber: 2, ingredients: [{ id: "f370", name: "Queso brie", quantity: 50, unit: "g" }, { id: "f369", name: "Uvas", quantity: 80, unit: "g" }], instructions: ["Cortar queso.", "伴吃葡萄"], tips: "Clásico.", image: "https://images.pexels.com/photos/34214021/pexels-photo-34214021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-palitos-zanahoria-hummus": { title: "Palitos de Zanahoria con Hummus", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 200, protein: 8, fat: 12, carbs: 22, netCarbs: 15, fiber: 7, ingredients: [{ id: "f366", name: "Zanahorias", quantity: 100, unit: "g" }, { id: "f229", name: "Hummus", quantity: 50, unit: "g" }], instructions: ["Cortar zanahorias.", "Con hummus."], tips: "Crujiente.", image: "https://images.pexels.com/photos/35440206/pexels-photo-35440206.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-batido-proteina-vainilla": { title: "Batido de Proteína Vainilla", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 250, protein: 25, fat: 6, carbs: 25, netCarbs: 20, fiber: 5, ingredients: [{ id: "f212", name: "Proteína vainilla", quantity: 30, unit: "g" }, { id: "f213", name: "Leche", quantity: 250, unit: "ml" }], instructions: ["Licuar.", "Listo."], tips: "Post-entreno.", image: "https://images.pexels.com/photos/18142623/pexels-photo-18142623.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-galletas-integrales": { title: "Galletas Integrales con Pasas", category: "snack", mealType: "snack", prepTime: "20 min", difficulty: "fácil", servings: 6, calories: 140, protein: 3, fat: 5, carbs: 24, netCarbs: 18, fiber: 6, ingredients: [{ id: "f313", name: "Harina integral", quantity: 80, unit: "g" }, { id: "f377", name: "Pasas", quantity: 30, unit: "g" }, { id: "f205", name: "Miel", quantity: 15, unit: "g" }, { id: "f14", name: "Mantequilla", quantity: 15, unit: "g" }], instructions: ["Mezclar.", "Hornear 12 min."], tips: "Con pasas.", image: "https://images.pexels.com/photos/89690/pexels-photo-89690.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-verde-mix": { title: "Verde Mix de Frutas", category: "snack", mealType: "snack", prepTime: "10 min", difficulty: "fácil", servings: 1, calories: 180, protein: 4, fat: 2, carbs: 42, netCarbs: 32, fiber: 10, ingredients: [{ id: "f258", name: "Manzana verde", quantity: 100, unit: "g" }, { id: "f258", name: "Kiwi", quantity: 80, unit: "g" }, { id: "f258", name: "Uva verde", quantity: 60, unit: "g" }], instructions: ["Cortar y mezclar.", "En bowl."], tips: "Vitamínico.", image: "https://images.pexels.com/photos/37124032/pexels-photo-37124032.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" },
  "snack-leche-miel": { title: "Leche tibia con Miel", category: "snack", mealType: "snack", prepTime: "5 min", difficulty: "fácil", servings: 1, calories: 180, protein: 8, fat: 6, carbs: 28, netCarbs: 26, fiber: 2, ingredients: [{ id: "f213", name: "Leche tibia", quantity: 250, unit: "ml" }, { id: "f205", name: "Miel", quantity: 20, unit: "g" }], instructions: ["Calentar leche.", "Agregar miel.", "Beber antes de dormir."], tips: "Relajante.", image: "https://images.pexels.com/photos/3772492/pexels-photo-3772492.jpeg?auto=compress&cs=tinysrgb&w=400&h=300" }
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
