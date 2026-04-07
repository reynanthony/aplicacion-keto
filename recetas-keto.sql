-- =============================================
-- RECETAS CETOGÉNICAS COMPLETAS
-- Insertar en: Supabase Dashboard > SQL Editor
-- =============================================

-- DESAYUNOS KETO (10 recetas)
INSERT INTO public.recetas (titulo, descripcion, instrucciones, dificultad) VALUES
('Huevos revueltos con espinacas', 'Desayuno proteico bajo en carb con espinacas frescas', 
'1. Calienta ghee en sartén a fuego medio. 2. Añade las espinacas y saltea 2 minutos. 3. Agrega los huevos revueltos y cocina 3-4 minutos. 4. Sazona con sal, pimienta y ajo en polvo. 5. Sirve caliente con aguacate.', 
'facil'),

('Omelette de queso y jamón', 'Omelette esponjoso relleno de queso y jamón serrano',
'1. Bate 3 huevos con sal y pimienta. 2. Vierte en sartén caliente con mantequilla. 3. Cuando esté casi cocido, añade queso mozzarella y jamón serrano. 4. Dobla por la mitad y cocina 1 minuto más. 5. Sirve inmediatamente.',
'facil'),

('Pancakes de coco', 'Pancakes cetogénicos sin harina con sabor tropical',
'1. Mezcla 2 huevos, 2 cucharadas de coco rallado, 1 cucharada de harina de almendra. 2. Añade 1/2 cucharadita de polvo para hornear. 3. Vierte en sartén caliente con mantequilla. 4. Cocina 2 minutos por lado. 5. Sirve con mantequilla y eritritol.',
'media'),

('Yogur griego con nueces', 'Yogur alto en proteína con frutos secos',
'1. Coloca 200g de yogur griego entero en un bowl. 2. Añade 30g de nueces picadas. 3. Agrega 1 cucharadita de canela. 4. Endulza con eritritol al gusto. 5. Mezcla y sirve frío.',
'facil'),

('Bacon con huevos fritos', 'Clásico desayuno americano cetogénico',
'1. Cocina el bacon en sartén hasta que esté crujiente. 2. Retira y escurre el exceso de grasa. 3. En la misma grasa, fríe los huevos. 4. Sirve bacon junto con huevos. 5. Decora con perejil fresco.',
'facil'),

('Chaffles', 'Waffles de queso y huevos versión keto',
'1. Mezcla 1 huevo, 1 taza de queso mozzarella rallado, 1 cucharada de harina de almendra. 2. Añade sal y condimentos. 3. Cocina en wafflera 3-4 minutos. 4. Sirve con mantequilla y bayas.',
'facil'),

('Porridge de semillas de chía', 'Crema de chía con crema de coco',
'1. Mezcla 3 cucharadas de semillas de chía con 1 taza de leche de coco. 2. Añade 1 cucharadita de vainilla. 3. Deja reposar en refrigerador toda la noche. 4. Sirve con coco rallado y eritritol.',
'facil'),

('Huevo pochado con aguacate', 'Huevo perfecto sobre aguacate cremoso',
'1. Pon agua a hervir con un chorrito de vinagre. 2. Haz un remolino y añade el huevo. 3. Cocina 3 minutos para yolk blando. 4. Coloca sobre mitad de aguacate. 5. Sazona con sal, pimienta y chili flakes.',
'media'),

('Tortilla española keto', 'Tortilla sin patatas con espinacas',
'1. Bate 4 huevos con sal y pimienta. 2. Añade espinacas picadas y cebolla. 3. Cocina en sartén con aceite de oliva. 4. Voltea cuando esté firme. 5. Cocina el otro lado 3 minutos.',
'facil'),

('Smoothie de aguacate y espinacas', 'Bebida verde cetogénica nutritiva',
'1. Coloca 1/2 aguacate, 1 taza de espinacas, 1 taza de leche de coco. 2. Añade 1 cucharada de mantequilla de almendra. 3. Licúa hasta quedar suave. 4. Añade hielo si deseas. 5. Endulza con eritritol.',
'facil');

-- ALMUERZOS KETO (10 recetas)
INSERT INTO public.recetas (titulo, descripcion, instrucciones, dificultad) VALUES
('Ensalada César con pollo', 'Ensalada clásica sin carbohidratos con proteína alta',
'1. Cocina pechuga de pollo a la plancha. 2. Corta lechuga romana en trozos. 3. Prepara aderezo César con mayonesa, ajo, mostaza y queso parmesano. 4. Corta el pollo en tiras. 5. Sirve todo junto con bacon crujiente.',
'facil'),

('Bowl de atún con aguacate', 'Bowl proteico con grasas saludables',
'1. Mezcla atún enlatado con mayonesa. 2. Añade aguacate en cubos. 3. Agrega pepino picado y cebolla morada. 4. Sazona con sal, pimienta y limón. 5. Sirve en bowl con semillas de sésamo.',
'facil'),

('Calabacines rellenos de carne', 'Calabacines horneados con mezcla de carne',
'1. Vacía los calabacines y reserva la pulpa. 2. Sofríe cebolla, ajo y carne molida. 3. Añade la pulpa de calabacín picada. 4. Rellena los calabacines con la mezcla. 5. Cubre con queso y hornea 20 min a 180°C.',
'media'),

('Pollo al curry con leche de coco', 'Estofado cremoso de pollo estilo indio keto',
'1. Sofríe cebolla, ajo y jengibre. 2. Añade especias curry y cúrcuma. 3. Agrega pollo en cubos y dora. 4. Vierte leche de coco y deja cocinar 15 min. 5. Sirve con cilantro fresco.',
'media'),

('Salmón a la plancha con espárragos', 'Salmón proteico con vegetales verdes',
'1. Sazona el salmón con sal, pimienta y limón. 2. Cocina a la plancha 4 min por lado. 3. Cocina espárragos al vapor 5 min. 4. Sirve el salmón sobre los espárragos. 5. Decora con semillas de sésamo.',
'facil'),

('Tarta de atún sin corteza', 'Tarta keto con base de huevo y atún',
'1. Bate 4 huevos con sal y pimienta. 2. Añade atún escurrido y queso rallado. 3. Agrega espinacaspicadas y tomates cherry. 4. Vierte en molde y hornea 25 min a 180°C. 5. Sirve templado.',
'facil'),

('Wrap de lechuga con bacon', 'Wraps bajos en carb con relleno de bacon',
'1. Cocina bacon hasta que esté crujiente. 2. Unta queso crema en hojas de lechuga grandi. 3. Añade pollo desmenuzado. 4. Agrega aguacate y pepino. 5. Enrolla y Enjoy.',
'facil'),

('Brócoli con queso cheddar', 'Vegetal horneado con cobertura de queso',
'1. Cocina brócoli al vapor hasta que esté tierno. 2. Coloca en refractario. 3. Cubre con mezcla de queso cheddar y mantequilla. 4. Hornea 15 min a 200°C hasta que burbujee. 5. Sirve caliente.',
'facil'),

('Albóndigas en salsa de tomate', 'Albóndigas jugosas en salsa casera',
'1. Mezcla carne molida con huevo, queso parmesano y especias. 2. Forma bolitas y dora en sartén. 3. Prepara salsa con tomate triturado, ajo y albahaca. 4. Añade las albóndigas a la salsa. 5. Cocina 20 min a fuego lento.',
'media'),

('Coliflor gratinada', 'Coliflor cremosa con cobertura de queso',
'1. Cocina coliflor en trozos hasta que esté suave. 2. Prepara salsa bechamel keto con mantequilla, crema y queso. 3. Coloca coliflor en refractario. 4. Cubre con salsa y queso mozzarella. 5. Gratina 10 min a 220°C.',
'facil');

-- CENAS KETO (10 recetas)
INSERT INTO public.recetas (titulo, descripcion, instrucciones, dificultad) VALUES
('Ribeye con mantequilla y ajo', 'Steak jugoso con salsa de mantequilla aromatizada',
'1. Saca el steak del refrigerador 30 min antes. 2. Sazona con sal gruesa y pimienta. 3. Cocina en sartén muy caliente 3-4 min por lado. 4. Añade mantequilla, ajo y romero los últimos 2 min. 5. Reposa 5 min antes de cortar.',
'media'),

('Pechuga de pollo rellena de espinacas', 'Pollo deshuesado con relleno cremoso',
'1. Aplana las pechugas. 2. Rellena con mezcla de espinacas, queso crema y ajo. 3. Enrolla y asegur con palillos. 4. Sella en sartén y hornea 25 min a 190°C. 5. Corta en rodajas y sirve.',
'media'),

('Cordero al horno con hierbas', 'Cordero tierno horneado con romero',
'1. Marina el cordero con aceite de oliva, romero, tomillo y ajo. 2. Deja reposar 1 hora. 3. Hornea a 160°C por 2 horas. 4. Sella a alta temperatura 10 min al final. 5. Deja reposar 15 min antes de cortar.',
'dificil'),

('Gambas al ajillo', 'Gambas salteadas en aceite de oliva con ajo',
'1. Calienta aceite de oliva con ajo laminado. 2. Añade las gambas y cocina 2 min por lado. 3. Agrega guindilla y perejil. 4. Escurre el exceso de grasa. 5. Sirve con pan bajo en carb.',
'facil'),

('Merluza con tapenade', 'Pescado blanco con pasta de olivas',
'1. Prepara tapenade mezclando olivas, alcaparras y aceite. 2. Coloca filetes de merluza en papillote. 3. Cubre con tapenade. 4. Hornea 15 min a 180°C. 5. Sirve con ensalada verde.',
'facil'),

('Cerdo agridulce keto', 'Cerdo cocido en salsa sin azúcar',
'1. Dora chuletas de cerdo en sartén. 2. Prepara salsa con vinagre, salsa de soja y eritritol. 3. Añade vegetales bajos en carb. 4. Cocina todo junto 10 min. 5. Sirve espeso y enjoy.',
'media'),

('Pollo tikka masala keto', 'Pollo en salsa cremosa estilo indio',
'1. Marina pollo en yogur y especias. 2. Asa el pollo hasta dorar. 3. Prepara salsa con tomate, crema de coco y especias. 4. Combina pollo y salsa. 5. Cocina a fuego lento 15 min.',
'media'),

('Bacalao con chucrut', 'Pescado português con col fermentada',
'1. Cuece el bacalao al vapor o a la plancha. 2. Calienta chucrut con mantequilla. 3. Prepara huevos pochados. 4. Coloca todo en el plato. 5. Decora con aceite de oliva.',
'media'),

('Hamburguesa keto sin pan', 'Hamburguesa envuelta en tocino',
'1. Forma hamburguesas con carne molida. 2. Envuelve cada una en bacon. 3. Cocina a la parrilla hasta que el bacon esté crujiente. 4. Añade cheddar, aguacate y vegetales. 5. Sirve sobre lecho de lechuga.',
'facil'),

('Fajitas de res con pimientos', 'Fajitas sin tortilla con carne y vegetales',
'1. Corta res en tiras y marina con especias mexicanas. 2. Sofríe pimientos y cebollas. 3. Cocina la res a fuego alto. 4. Combina todo. 5. Sirve en hojas de lechuga con guacamole.',
'facil');

-- SNACKS KETO (10 recetas)
INSERT INTO public.recetas (titulo, descripcion, instrucciones, dificultad) VALUES
('Palitos de queso horneados', 'Queso horneado crujiente',
'1. Precalienta horno a 200°C. 2. Corta queso cheddar en tiras. 3. Coloca en bandeja con papel. 4. Hornea 8-10 min hasta que estén dorados. 5. Enfría y Enjoy.',
'facil'),

('Hummus de calabaza', 'Dip cremoso cetogénico',
'1. Asa calabaza hasta que esté suave. 2. Procesa con tahini, ajo y aceite de oliva. 3. Añade comino y sal. 4. Licúa hasta obtener crema suave. 5. Sirve con vegetales.',
'facil'),

('Chips de kale', 'Hojas de col rizada crujientes',
'1. Lava y seca bien las hojas de kale. 2. Retira los tallos. 3. Unta con aceite de oliva y sal. 4. Hornea a 150°C por 15-20 min. 5. Enfría hasta que estén crujientes.',
'facil'),

('Boiled eggs', 'Huevos duros perfectos',
'1. Coloca huevos en agua fría. 2. Lleva a ebullición. 3. Apaga y tapa 12 minutos. 4. Transfiere a agua con hielo. 5. Pela y sirve con sal.',
'facil'),

('Guacamole casero', 'Dip de aguacate fresco',
'1. Machaca aguacates maduros. 2. Añade cebolla picada, tomate, cilantro. 3. Exprime limón y sazona. 4. Mezcla todo bien. 5. Sirve inmediatamente.',
'facil'),

('Olivas con almendras', 'Mix de frutos secos y olivas',
'1. Selecciona olivas de tu variedad favorita. 2. Tuesta almendras ligeramente. 3. Combina en un bowl. 4. Añade orégano y aceite de oliva. 5. Sirve como snack.',
'facil'),

('Queso cottage con frutos rojos', 'Lácteo con bayas bajas en carb',
'1. Coloca queso cottage en bowl. 2. Añade frambuesas o moras. 3. Endulza con eritritol. 4. Decora con menta. 5. Enjoy frío.',
'facil'),

('Rollitos de pavo con queso', 'Bocaditos proteicos',
'1. Coloca lonchas de pavo en tabla. 2. Añade queso crema y pepino. 3. Enrolla firmemente. 4. Corta por la mitad. 5. Asegura con palillos.',
'facil'),

('Mantequilla de almendra con apio', 'Snack crujiente y cremoso',
'1. Corta apio en palitos. 2. Unta mantequilla de almendra. 3. Añade unas gotas de limón. 4. espolvorea con canela (opcional). 5. Sirve frío.',
'facil'),

('Edamame tostado', 'Soja japonesa tostada',
'1. Adquiere vainas de edamame frescas. 2. Unta con aceite de coco y sal. 3. Tuesta en horno 180°C por 15 min. 4. Remueve a mitad de cocción. 5. Sirve tibio.',
'facil');

SELECT '40 recetas cetogénicas insertadas!' as status;
