-- =============================================
-- MACROS PREDEFINIDOS PARA RECETAS
-- =============================================

-- Primero crear la tabla si no existe
CREATE TABLE IF NOT EXISTS public.receta_macros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID UNIQUE REFERENCES public.recetas(id) ON DELETE CASCADE,
    calorias_totales INTEGER DEFAULT 0,
    proteinas_totales DECIMAL(10,2) DEFAULT 0,
    grasas_totales DECIMAL(10,2) DEFAULT 0,
    carbohidratos_totales DECIMAL(10,2) DEFAULT 0,
    porcion_gramos INTEGER DEFAULT 100,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.receta_macros ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para lectura pública
DROP POLICY IF EXISTS "receta_macros_read" ON public.receta_macros;
CREATE POLICY "receta_macros_read" ON public.receta_macros FOR SELECT USING (true);

-- Poblar con macros básicos (aproximados)
-- Los valores se basan en ingredientes típicos de cada receta

-- Huevos con Aguacate
UPDATE public.recetas SET tiempo_preparacion = 10, dificultad = 'facil' WHERE titulo ILIKE '%Huevos con Aguacate%';
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 450, 15, 40, 5, 200 FROM public.recetas WHERE titulo ILIKE '%Huevos con Aguacate%'
ON CONFLICT (receta_id) DO UPDATE SET calorias_totales = 450, proteinas_totales = 15, grasas_totales = 40, carbohidratos_totales = 5;

-- Omelette con Queso
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 22, 30, 3, 180 FROM public.recetas WHERE titulo ILIKE '%omelette%' OR titulo ILIKE '%tortilla%'
ON CONFLICT (receta_id) DO NOTHING;

-- Pollo a la Plancha
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 320, 45, 14, 2, 200 FROM public.recetas WHERE titulo ILIKE '%pollo%plancha%' OR titulo ILIKE '%pollo%grilled%'
ON CONFLICT (receta_id) DO NOTHING;

-- Salmón al Horno
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 40, 22, 1, 200 FROM public.recetas WHERE titulo ILIKE '%salmon%horno%' OR titulo ILIKE '%salmon%baked%'
ON CONFLICT (receta_id) DO NOTHING;

-- Ensalada César
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 350, 25, 26, 8, 250 FROM public.recetas WHERE titulo ILIKE '%ensalada%cesar%'
ON CONFLICT (receta_id) DO NOTHING;

-- Carne Molida con Verduras
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 400, 30, 28, 6, 250 FROM public.recetas WHERE titulo ILIKE '%carne%molida%' OR titulo ILIKE '%ground%beef%'
ON CONFLICT (receta_id) DO NOTHING;

-- Café Bulletproof
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 230, 1, 25, 0, 250 FROM public.recetas WHERE titulo ILIKE '%bulletproof%' OR titulo ILIKE '%cafe%mantequilla%'
ON CONFLICT (receta_id) DO NOTHING;

-- Pancakes Keto
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 280, 16, 22, 3, 150 FROM public.recetas WHERE titulo ILIKE '%pancake%keto%' OR titulo ILIKE '%pancake%queso%'
ON CONFLICT (receta_id) DO NOTHING;

-- Por defecto, asignar macros genéricos a recetas sin macros
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 300, 20, 20, 5, 200 FROM public.recetas r
WHERE NOT EXISTS (SELECT 1 FROM public.receta_macros rm WHERE rm.receta_id = r.id)
ON CONFLICT (receta_id) DO NOTHING;
