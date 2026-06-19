-- =============================================
-- INSPECTOR KETO - Tabla de Ingredientes
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Tabla de ingredientes con niveles de riesgo
CREATE TABLE IF NOT EXISTS public.ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    nombre_normalizado VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    carbohidratos_100g DECIMAL(8,2) DEFAULT 0,
    fibra_100g DECIMAL(8,2) DEFAULT 0,
    carbohidratos_netos_100g DECIMAL(8,2) DEFAULT 0,
    nivel_riesgo VARCHAR(20) DEFAULT 'seguro',
    limite_gramos_porcion DECIMAL(8,2) DEFAULT 0,
    unidad_default VARCHAR(20) DEFAULT 'g',
    razon TEXT,
    tags TEXT[],
    alternativas JSONB DEFAULT '[]',
    activo BOOLEAN DEFAULT TRUE,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.ingredientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ingredientes_all" ON public.ingredientes FOR ALL USING (true);

-- =============================================
-- INSERTAR 150+ INGREDIENTES
-- Categorizados: CRÍTICO, MODERADO, SEGURO
-- =============================================

-- HARINAS (CRÍTICAS - principales "trampas")
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Harina de trigo', 'harina_trigo', 'harinas', 76, 2.7, 73.3, 'critico', 0, 'Alto contenido de carbs, gluten', ARRAY['gluten', 'granos', 'ultraprocesado'], '[{"nombre": "harina de almendra", "carb_netos_100g": 10, "factor": 0.8}, {"nombre": "harina de coco", "carb_netos_100g": 8, "factor": 0.6}, {"nombre": "harina de linaza", "carb_netos_100g": 2, "factor": 0.5}]'),
('Harina de trigo integral', 'harina_trigo_integral', 'harinas', 72, 10, 62, 'critico', 0, 'Aún con alto contenido de carbs', ARRAY['gluten', 'granos'], '[{"nombre": "harina de almendra", "carb_netos_100g": 10, "factor": 0.8}, {"nombre": "harina de coco", "carb_netos_100g": 8, "factor": 0.6}]'),
('Harina de arroz', 'harina_arroz', 'harinas', 80, 2, 78, 'critico', 0, 'Alto índice glucémico', ARRAY['granos', 'sin_gluten'], '[{"nombre": "harina de coco", "carb_netos_100g": 8, "factor": 0.7}, {"nombre": "almidon de yuca", "carb_netos_100g": 85, "factor": 0.9}]'),
('Almidón de maíz', 'almidon_maiz', 'harinas', 86, 1, 85, 'critico', 0, 'Purama almidón, evita cetosis', ARRAY['maiz', 'almidon'], '[{"nombre": "almidon de tapioca", "carb_netos_100g": 85, "factor": 1}]'),
('Maicena', 'maicena', 'harinas', 86, 0, 86, 'critico', 0, 'Almidón puro de maíz', ARRAY['maiz', 'almidon'], '[{"nombre": "crema de coco", "carb_netos_100g": 5, "factor": 0.1}]'),
('Polenta', 'polenta', 'harinas', 70, 3, 67, 'critico', 0, 'Harina de maíz', ARRAY['maiz', 'granos'], '[{"nombre": "pure de coliflor", "carb_netos_100g": 5, "factor": 0.3}]'),
('Semolina', 'semolina', 'harinas', 73, 3, 70, 'critico', 0, 'Harina de trigo duro', ARRAY['gluten', 'granos'], '[{"nombre": "harina de almendra", "carb_netos_100g": 10, "factor": 0.8}]')
ON CONFLICT (nombre) DO NOTHING;

-- AZÚCARES Y EDULCORANTES (CRÍTICOS)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Azúcar blanco', 'azucar_blanco', 'azucares', 100, 0, 100, 'critico', 0, 'Pure sucrose, eleva glucosa', ARRAY['azucar', 'ultraprocesado'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}, {"nombre": "stevia", "carb_netos_100g": 0, "factor": 0.1}]'),
('Azúcar morena', 'azucar_morena', 'azucares', 98, 0, 98, 'critico', 0, 'Igual de nocivo que el blanco', ARRAY['azucar'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}, {"nombre": "azucar de coco", "carb_netos_100g": 75, "factor": 0.8}]'),
('Azúcar glass', 'azucar_glass', 'azucares', 100, 0, 100, 'critico', 0, 'Azúcar pulverizada', ARRAY['azucar', 'reposteria'], '[{"nombre": "eritritol en polvo", "carb_netos_100g": 0, "factor": 1}]'),
('Miel', 'miel', 'azucares', 82, 0, 82, 'critico', 0, 'Alto contenido de fructosa', ARRAY['azucar', 'natural'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 0.8}, {"nombre": "stevia", "carb_netos_100g": 0, "factor": 0.1}]'),
('Jarabe de maíz', 'jarabe_maiz', 'azucares', 76, 0, 76, 'critico', 0, 'Alto Fruectosa, muy procesado', ARRAY['azucar', 'ultraprocesado'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 0.7}]'),
('Jarabe de arce', 'jarabe_arce', 'azucares', 66, 0, 66, 'critico', 0, 'Alto contenido de azúcares', ARRAY['azucar', 'natural'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 0.6}, {"nombre": "stevia", "carb_netos_100g": 0, "factor": 0.05}]'),
('Dextrosa', 'dextrosa', 'azucares', 100, 0, 100, 'critico', 0, 'Glucosa pura', ARRAY['azucar', 'carbohidratos'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]'),
('Maltosa', 'maltosa', 'azucares', 100, 0, 100, 'critico', 0, 'Azúcar de malta', ARRAY['azucar', 'malta'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]'),
('Tagatosa', 'tagatosa', 'azucares', 99, 0, 99, 'critico', 0, 'Aún afecta glucosa', ARRAY['azucar'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]'),
('Sorbitol', 'sorbitol', 'azucares', 100, 0, 100, 'critico', 0, 'Alcohol de azúcar, puede afectar cetosis', ARRAY['azucar', 'alcohol'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]')
ON CONFLICT (nombre) DO NOTHING;

-- EDULCORANTES SEGUROS (alternativas)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Eritritol', 'eritritol', 'edulcorantes', 100, 0, 0, 'seguro', 50, 'Alcohol de azúcar sin impacto metabólico', ARRAY['keto', 'bajo_carb'], '[{"nombre": "stevia", "carb_netos_100g": 0, "factor": 0.01}]'),
('Stevia', 'stevia', 'edulcorantes', 100, 0, 0, 'seguro', 10, 'Endulzante natural sin calorías', ARRAY['keto', 'natural'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]'),
('Monk fruit', 'monk_fruit', 'edulcorantes', 100, 0, 0, 'seguro', 20, 'Endulzante natural cero carbs', ARRAY['keto', 'natural'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 1}]')
ON CONFLICT (nombre) DO NOTHING;

-- LÁCTEOS (MODERADOS - algunos son seguros)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Leche entera', 'leche_entera', 'lacteos', 5, 0, 5, 'moderado', 150, 'Contiene lactosa', ARRAY['lacteo', 'proteina'], '[{"nombre": "leche de coco", "carb_netos_100g": 3, "factor": 1}, {"nombre": "leche de almendra", "carb_netos_100g": 1, "factor": 1}]'),
('Leche descremada', 'leche_descremada', 'lacteos', 5, 0, 5, 'moderado', 100, 'Más lactosa por porción', ARRAY['lacteo'], '[{"nombre": "leche de coco", "carb_netos_100g": 3, "factor": 1}]'),
('Yogur azucarado', 'yogur_azucarado', 'lacteos', 15, 0, 15, 'critico', 0, 'Alto contenido de azúcar añadida', ARRAY['lacteo', 'azucar'], '[{"nombre": "yogur griego natural", "carb_netos_100g": 4, "factor": 1}]'),
('Yogur griego azucarado', 'yogur_griego_azucarado', 'lacteos', 12, 0, 12, 'critico', 0, 'Azúcar añadida', ARRAY['lacteo', 'azucar'], '[{"nombre": "yogur griego entero sin azucar", "carb_netos_100g": 4, "factor": 1}]'),
('Requesón comerciales', 'requeson_comercial', 'lacteos', 4, 0, 4, 'moderado', 100, 'Algunos tienen carbohidratos añadidos', ARRAY['lacteo'], '[{"nombre": "requeson natural", "carb_netos_100g": 3, "factor": 1}]'),
('Leche condensada', 'leche_condensada', 'lacteos', 67, 0, 67, 'critico', 0, 'Mucho azúcar', ARRAY['lacteo', 'azucar'], '[{"nombre": "crema de coco", "carb_netos_100g": 5, "factor": 0.3}]')
ON CONFLICT (nombre) DO NOTHING;

-- FRUTAS (CRÍTICAS - alta en fructosa)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Plátano', 'platano', 'frutas', 23, 3, 20, 'critico', 0, 'Muy alto en carbohidratos', ARRAY['fruta', 'alto_carb'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.3}]'),
('Uvas', 'uvas', 'frutas', 17, 1, 16, 'critico', 0, 'Alto contenido de azúcar', ARRAY['fruta', 'alto_carb'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.4}]'),
('Mango', 'mango', 'frutas', 15, 2, 13, 'critico', 0, 'Alto en fructosa', ARRAY['fruta', 'tropical'], '[{"nombre": "coco fresco", "carb_netos_100g": 7, "factor": 0.5}]'),
('Piña', 'pina', 'frutas', 13, 2, 11, 'critico', 0, 'Alto índice glucémico', ARRAY['fruta', 'tropical'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.5}]'),
('Sandía', 'sandia', 'frutas', 8, 0, 8, 'moderado', 100, 'Alto índice glucémico', ARRAY['fruta'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.8}]'),
('Naranja', 'naranja', 'frutas', 12, 2, 10, 'moderado', 50, 'Contiene fructosa', ARRAY['fruta', 'citrico'], '[{"nombre": "limón", "carb_netos_100g": 3, "factor": 0.3}]'),
('Manzana', 'manzana', 'frutas', 14, 2, 12, 'critico', 0, 'Alto contenido de azúcar', ARRAY['fruta'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.5}]'),
('Peras', 'peras', 'frutas', 15, 3, 12, 'critico', 0, 'Alto en carbohidratos', ARRAY['fruta'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.5}]'),
('Higos', 'higos', 'frutas', 14, 3, 11, 'critico', 0, 'Alto contenido de azúcar', ARRAY['fruta'], '[{"nombre": "frambuevas", "carb_netos_100g": 5, "factor": 0.5}]'),
('Pasas', 'pasas', 'frutas', 79, 4, 75, 'critico', 0, 'Fruta seca, muy concentrada', ARRAY['fruta', 'seca'], '[{"nombre": "nueces", "carb_netos_100g": 4, "factor": 0.2}]'),
('Dátiles', 'dátiles', 'frutas', 75, 7, 68, 'critico', 0, 'Extremadamente altos en azúcar', ARRAY['fruta', 'seca'], '[{"nombre": "eritritol", "carb_netos_100g": 0, "factor": 0.1}]')
ON CONFLICT (nombre) DO NOTHING;

-- FRUTAS BAJAS EN CARB (SEGURAS)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Fresas', 'fresas', 'frutas', 8, 2, 6, 'seguro', 200, 'Bajas en carbohidratos', ARRAY['fruta', 'bajo_carb'], '[]'),
('Frambuevas', 'frambuevas', 'frutas', 12, 7, 5, 'seguro', 150, 'Muy altas en fibra', ARRAY['fruta', 'bajo_carb'], '[]'),
('Arándanos', 'arandanos', 'frutas', 14, 2, 12, 'moderado', 50, 'Moderados, controlar porción', ARRAY['fruta', 'bajo_carb'], '[{"nombre": "fresas", "carb_netos_100g": 6, "factor": 0.8}]'),
('Limón', 'limon', 'frutas', 9, 3, 6, 'seguro', 100, 'Bajo carb, usa ralladura', ARRAY['fruta', 'citrico'], '[]'),
('Aguacate', 'aguacate', 'frutas', 9, 7, 2, 'seguro', 200, 'Muy bajo carb neto', ARRAY['fruta', 'grasa', 'keto'], '[]'),
('Coco fresco', 'coco_fresco', 'frutas', 15, 9, 6, 'seguro', 100, 'Alto en fibra', ARRAY['fruta', 'tropical'], '[]'),
('Grosellas', 'grosellas', 'frutas', 7, 4, 3, 'seguro', 100, 'Muy bajas en carbs', ARRAY['fruta'], '[]')
ON CONFLICT (nombre) DO NOTHING;

-- VERDURAS (algunas son trampas)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Patata', 'patata', 'verduras', 17, 2, 15, 'critico', 0, 'Alto contenido de almidón', ARRAY['tubérculo', 'almidon'], '[{"nombre": "coliflor", "carb_netos_100g": 3, "factor": 0.5}]'),
('Batata', 'batata', 'verduras', 20, 3, 17, 'critico', 0, 'Alto índice glucémico', ARRAY['tubérculo'], '[{"nombre": "nabo", "carb_netos_100g": 4, "factor": 0.3}]'),
('Camote', 'camote', 'verduras', 20, 3, 17, 'critico', 0, 'Alto en carbohidratos', ARRAY['tubérculo'], '[{"nombre": "calabacín", "carb_netos_100g": 3, "factor": 0.3}]'),
('Zanahoria', 'zanahoria', 'verduras', 10, 3, 7, 'moderado', 50, 'Moderada, controlar porción', ARRAY['verdura', 'raiz'], '[{"nombre": "calabacín", "carb_netos_100g": 3, "factor": 0.5}]'),
('Remolacha', 'remolacha', 'verduras', 10, 3, 7, 'moderado', 50, 'Contiene azúcar natural', ARRAY['verdura', 'raiz'], '[{"nombre": "nabo", "carb_netos_100g": 4, "factor": 0.5}]'),
('Chícharos/guisantes', 'chicharos', 'verduras', 14, 6, 8, 'moderado', 50, 'Moderados en carbs', ARRAY['legumbre'], '[{"nombre": "ejotes", "carb_netos_100g": 7, "factor": 0.7}]'),
('Maíz', 'maiz', 'verduras', 19, 3, 16, 'critico', 0, 'Alto en carbohidratos', ARRAY['verdura', 'granos'], '[{"nombre": "pimiento", "carb_netos_100g": 4, "factor": 0.3}]'),
('Calabaza', 'calabaza', 'verduras', 7, 1, 6, 'moderado', 100, 'Moderada', ARRAY['verdura'], '[{"nombre": "calabacín", "carb_netos_100g": 3, "factor": 0.8}]')
ON CONFLICT (nombre) DO NOTHING;

-- VERDURAS KETO (SEGURAS)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Espinacas', 'espinacas', 'verduras', 4, 2, 2, 'seguro', 300, 'Muy baja en carbs', ARRAY['verdura', 'hoja', 'keto'], '[]'),
('Col rizada/kale', 'col_rizada', 'verduras', 5, 4, 1, 'seguro', 200, 'Muy baja en carbs', ARRAY['verdura', 'hoja'], '[]'),
('Lechuga', 'lechuga', 'verduras', 2, 1, 1, 'seguro', 500, 'Casi cero carbs', ARRAY['verdura', 'hoja'], '[]'),
('Acelgas', 'acelgas', 'verduras', 4, 2, 2, 'seguro', 300, 'Baja en carbs', ARRAY['verdura', 'hoja'], '[]'),
('Coliflor', 'coliflor', 'verduras', 5, 2, 3, 'seguro', 300, 'Excelente sustituto de arroz', ARRAY['verdura', 'keto'], '[]'),
('Brócoli', 'brocoli', 'verduras', 7, 3, 4, 'seguro', 300, 'Baja en carbs', ARRAY['verdura', 'keto'], '[]'),
('Coles de Bruselas', 'coles_bruselas', 'verduras', 9, 4, 5, 'seguro', 200, 'Moderada pero rica en fibra', ARRAY['verdura'], '[]'),
('Apio', 'apio', 'verduras', 3, 2, 1, 'seguro', 500, 'Casi cero carbs', ARRAY['verdura'], '[]'),
('Calabacín', 'calabacin', 'verduras', 3, 1, 2, 'seguro', 400, 'Excelente sustituto de pasta', ARRAY['verdura', 'keto'], '[]'),
('Pimiento', 'pimiento', 'verduras', 6, 2, 4, 'seguro', 200, 'Bajo carb', ARRAY['verdura'], '[]'),
('Cohombro', 'cohombro', 'verduras', 4, 1, 3, 'seguro', 400, 'Muy bajo carb', ARRAY['verdura'], '[]'),
('Espárragos', 'esparragos', 'verduras', 4, 2, 2, 'seguro', 300, 'Bajo carb', ARRAY['verdura'], '[]'),
('Champiñones', 'champinones', 'verduras', 3, 1, 2, 'seguro', 300, 'Bajos en carbs', ARRAY['verdura', 'hongos'], '[]'),
('Cebollas', 'cebollas', 'verduras', 9, 2, 7, 'moderado', 50, 'Moderada, controlar porción', ARRAY['verdura'], '[{"nombre": "cebollino", "carb_netos_100g": 3, "factor": 0.3}]'),
('Tomate', 'tomate', 'verduras', 4, 1, 3, 'seguro', 300, 'Bajo carb', ARRAY['verdura'], '[]'),
('Tomate cherry', 'tomate_cherry', 'verduras', 4, 1, 3, 'seguro', 300, 'Bajo carb', ARRAY['verdura'], '[]')
ON CONFLICT (nombre) DO NOTHING;

-- LEGUMBRES (CRÍTICAS)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Frijoles negros', 'frijoles_negros', 'legumbres', 24, 9, 15, 'critico', 0, 'Altos en carbs', ARRAY['legumbre', 'granos'], '[{"nombre": "tofu", "carb_netos_100g": 2, "factor": 0.2}]'),
('Frijoles rojos', 'frijoles_rojos', 'legumbres', 24, 8, 16, 'critico', 0, 'Altos en carbohidratos', ARRAY['legumbre'], '[{"nombre": "edamame", "carb_netos_100g": 9, "factor": 0.4}]'),
('Lentejas', 'lentejas', 'legumbres', 20, 8, 12, 'critico', 0, 'Altas en carbs', ARRAY['legumbre'], '[{"nombre": "soja texturizada", "carb_netos_100g": 10, "factor": 0.5}]'),
('Garbanzos', 'garbanzos', 'legumbres', 27, 8, 19, 'critico', 0, 'Muy altos en carbs', ARRAY['legumbre'], '[{"nombre": "harina de garbanzo", "carb_netos_100g": 20, "factor": 0.5}]'),
('Alubias', 'alubias', 'legumbres', 22, 7, 15, 'critico', 0, 'Altas en carbohidratos', ARRAY['legumbre'], '[{"nombre": "frijoles de soja", "carb_netos_100g": 9, "factor": 0.4}]'),
('Edamame', 'edamame', 'legumbres', 14, 5, 9, 'moderado', 100, 'Moderado en carbs, alto en proteína', ARRAY['legumbre', 'soja'], '[]')
ON CONFLICT (nombre) DO NOTHING;

-- GRASAS Y ACEITES
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Aceite de oliva', 'aceite_oliva', 'grasas', 0, 0, 0, 'seguro', 100, 'Grasa saludable', ARRAY['grasa', 'keto', 'saludable'], '[]'),
('Aceite de coco', 'aceite_coco', 'grasas', 0, 0, 0, 'seguro', 100, 'Rico en MCTs', ARRAY['grasa', 'keto'], '[]'),
('Mantequilla', 'mantequilla', 'grasas', 0, 0, 0, 'seguro', 100, 'Grasa animal segura', ARRAY['grasa', 'lacteo'], '[]'),
('Ghee', 'ghee', 'grasas', 0, 0, 0, 'seguro', 100, 'Mantequilla clarificada, sin lactosa', ARRAY['grasa', 'lacteo'], '[]'),
('Crema de coco', 'crema_coco', 'grasas', 7, 2, 5, 'seguro', 100, 'Baja en carbs', ARRAY['grasa', 'keto'], '[]'),
('Aceite de aguacate', 'aceite_aguacate', 'grasas', 0, 0, 0, 'seguro', 100, 'Grasa saludable', ARRAY['grasa'], '[]'),
('Mayonesa comercial', 'mayonesa_comercial', 'grasas', 2, 0, 2, 'moderado', 50, 'Puede contener azúcar', ARRAY['grasa', 'ultraprocesado'], '[{"nombre": "mayonesa casera", "carb_netos_100g": 0, "factor": 1}]')
ON CONFLICT (nombre) DO NOTHING;

-- FRUTOS SECOS (algunos son seguros, otros no)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Almendras', 'almendras', 'frutos_secos', 22, 12, 10, 'seguro', 50, 'Bajas en carb neto', ARRAY['fruto_seco', 'keto'], '[]'),
('Nueces', 'nueces', 'frutos_secos', 14, 7, 7, 'seguro', 50, 'Bajas en carbs', ARRAY['fruto_seco', 'keto'], '[]'),
('Pecanas', 'pecanas', 'frutos_secos', 14, 10, 4, 'seguro', 50, 'Muy bajas en carbs', ARRAY['fruto_seco', 'keto'], '[]'),
('Macadamia', 'macadamia', 'frutos_secos', 14, 9, 5, 'seguro', 50, 'Bajas en carbs', ARRAY['fruto_seco', 'keto'], '[]'),
('Castañas', 'castanas', 'frutos_secos', 45, 7, 38, 'critico', 0, 'Muy altas en carbs', ARRAY['fruto_seco'], '[{"nombre": "almendras", "carb_netos_100g": 10, "factor": 0.3}]'),
('Pistachos', 'pistachos', 'frutos_secos', 28, 10, 18, 'moderado', 30, 'Moderados en carbs', ARRAY['fruto_seco'], '[{"nombre": "almendras", "carb_netos_100g": 10, "factor": 0.5}]'),
('Pasas de uva', 'pasas_uva', 'frutos_secos', 79, 4, 75, 'critico', 0, 'Fruta seca concentrada', ARRAY['fruto_seco', 'seca'], '[{"nombre": "nueces", "carb_netos_100g": 7, "factor": 0.1}]')
ON CONFLICT (nombre) DO NOTHING;

-- SALSAS Y CONDIMENTOS (algunos son trampas)
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Salsa de tomate comercial', 'salsa_tomate_comercial', 'salsas', 15, 2, 13, 'moderado', 50, 'Puede contener azúcar', ARRAY['salsa', 'ultraprocesado'], '[{"nombre": "tomate natural", "carb_netos_100g": 3, "factor": 0.3}]'),
('Salsa barbecue', 'salsa_barbecue', 'salsas', 30, 1, 29, 'critico', 0, 'Mucho azúcar añadida', ARRAY['salsa', 'azucar'], '[{"nombre": "salsa de tomate sin azucar", "carb_netos_100g": 5, "factor": 0.2}]'),
('Salsa de soja regular', 'salsa_soja_regular', 'salsas', 8, 1, 7, 'moderado', 30, 'Contiene trigo y algo de carbs', ARRAY['salsa', 'trigo'], '[{"nombre": "aminoacidos de coco", "carb_netos_100g": 0, "factor": 0.5}, {"nombre": "salsa soja baja en sodio", "carb_netos_100g": 4, "factor": 0.5}]'),
('Ketchup', 'ketchup', 'salsas', 24, 0, 24, 'critico', 0, 'Alto contenido de azúcar', ARRAY['salsa', 'azucar'], '[{"nombre": "tomate natural con hierbas", "carb_netos_100g": 3, "factor": 0.1}]'),
('Salsa Worcester', 'salsa_worcester', 'salsas', 10, 0, 10, 'moderado', 10, 'Contiene vinagre de malta', ARRAY['salsa'], '[{"nombre": "salsa de soja baja en sodio", "carb_netos_100g": 4, "factor": 0.5}]'),
('Mayonesa comercial para untar', 'mayonesa_comercial_unter', 'salsas', 2, 0, 2, 'moderado', 50, 'Puede contener azúcar añadida', ARRAY['salsa', 'ultraprocesado'], '[{"nombre": "mayonesa casera", "carb_netos_100g": 0, "factor": 1}]'),
('Mostaza dijon', 'mostaza_dijon', 'salsas', 5, 3, 2, 'seguro', 50, 'Baja en carbs', ARRAY['salsa'], '[]'),
('Salsa de mostaza', 'salsa_mostaza', 'salsas', 15, 1, 14, 'moderado', 20, 'Algunas tienen azúcar', ARRAY['salsa'], '[{"nombre": "mostaza natural", "carb_netos_100g": 2, "factor": 0.2}]')
ON CONFLICT (nombre) DO NOTHING;

-- OTROS INGREDIENTES COMUNES
INSERT INTO public.ingredientes (nombre, nombre_normalizado, categoria, carbohidratos_100g, fibra_100g, carbohidratos_netos_100g, nivel_riesgo, limite_gramos_porcion, razon, tags, alternativas) VALUES
('Pan', 'pan', 'panes', 49, 3, 46, 'critico', 0, 'Alto contenido de carbs', ARRAY['pan', 'gluten', 'granos'], '[{"nombre": "pan keto de almendra", "carb_netos_100g": 4, "factor": 0.1}]'),
('Pan integral', 'pan_integral', 'panes', 43, 7, 36, 'critico', 0, 'Aún alto en carbs', ARRAY['pan', 'granos'], '[{"nombre": "pan de mozzarella", "carb_netos_100g": 3, "factor": 0.1}]'),
('Pan de molde', 'pan_molde', 'panes', 49, 3, 46, 'critico', 0, 'Muy alto en carbs', ARRAY['pan'], '[{"nombre": "tortilla de harina keto", "carb_netos_100g": 3, "factor": 0.1}]'),
('Baguette', 'baguette', 'panes', 47, 3, 44, 'critico', 0, 'Pan francés, alto carb', ARRAY['pan'], '[{"nombre": "pan de nube", "carb_netos_100g": 2, "factor": 0.05}]'),
('Papad', 'papad', 'panes', 60, 0, 60, 'critico', 0, 'Pan plano indio, muy alto', ARRAY['pan', 'granos'], '[{"nombre": "tortilla de queso", "carb_netos_100g": 1, "factor": 0.05}]'),
('Pizza base', 'pizza_base', 'panes', 35, 2, 33, 'critico', 0, 'Base de pizza comercial', ARRAY['pan', 'ultraprocesado'], '[{"nombre": "masa de pizza keto", "carb_netos_100g": 5, "factor": 0.2}]'),
('Pasta', 'pasta', 'pasta', 31, 2, 29, 'critico', 0, 'Alto contenido de carbs', ARRAY['pasta', 'granos'], '[{"nombre": "pasta de calabacín", "carb_netos_100g": 3, "factor": 0.1}]'),
('Espagueti', 'espagueti', 'pasta', 31, 2, 29, 'critico', 0, 'Alto en carbohidratos', ARRAY['pasta'], '[{"nombre": "fideos de calabacín", "carb_netos_100g": 3, "factor": 0.1}]'),
('Fideos de arroz', 'fideos_arroz', 'pasta', 83, 1, 82, 'critico', 0, 'Muy altos en carbs', ARRAY['pasta', 'arroz'], '[{"nombre": "fideos de konjac", "carb_netos_100g": 0, "factor": 0.1}]'),
('Arroz blanco', 'arroz_blanco', 'granos', 28, 1, 27, 'critico', 0, 'Alto índice glucémico', ARRAY['granos', 'arroz'], '[{"nombre": "arroz de coliflor", "carb_netos_100g": 3, "factor": 0.15}]'),
('Arroz integral', 'arroz_integral', 'granos', 23, 2, 21, 'critico', 0, 'Aún alto en carbs', ARRAY['granos', 'arroz'], '[{"nombre": "arroz de coliflor", "carb_netos_100g": 3, "factor": 0.15}]'),
('Quinoa', 'quinoa', 'granos', 21, 5, 16, 'critico', 0, 'Alta en carbs para keto', ARRAY['granos', 'pseudocereal'], '[{"nombre": "coliflor arroz", "carb_netos_100g": 3, "factor": 0.2}]'),
('Avena', 'avena', 'granos', 66, 10, 56, 'critico', 0, 'Muy alta en carbs', ARRAY['granos'], '[{"nombre": "harina de coco", "carb_netos_100g": 8, "factor": 0.2}]'),
('Cuscús', 'cuscus', 'granos', 23, 2, 21, 'critico', 0, 'Alto en carbohidratos', ARRAY['granos'], '[{"nombre": "coliflor molida", "carb_netos_100g": 3, "factor": 0.15}]')
ON CONFLICT (nombre) DO NOTHING;
