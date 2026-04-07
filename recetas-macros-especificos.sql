-- =============================================
-- MACROS ESPECIFICOS POR TIPO DE RECETA
-- =============================================

-- Limpiar macros existentes
DELETE FROM public.receta_macros;

-- DESAYUNOS (alto en proteína, moderado en grasa)
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 25, 28, 4, 180 FROM public.recetas WHERE titulo ILIKE '%huevo%' AND (titulo ILIKE '%aguacate%' OR titulo ILIKE '%avocado%')
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 320, 22, 24, 3, 150 FROM public.recetas WHERE titulo ILIKE '%huevo%bacon%' OR titulo ILIKE '%bacon%huevo%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 280, 18, 20, 4, 140 FROM public.recetas WHERE titulo ILIKE '%tortilla%espinac%' OR titulo ILIKE '%omelette%espinac%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 230, 2, 24, 1, 250 FROM public.recetas WHERE titulo ILIKE '%cafe%mantequilla%' OR titulo ILIKE '%bulletproof%' OR titulo ILIKE '%keto%coffee%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 260, 14, 20, 4, 120 FROM public.recetas WHERE titulo ILIKE '%pancake%keto%' OR titulo ILIKE '%pancake%queso%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 200, 12, 15, 3, 150 FROM public.recetas WHERE titulo ILIKE '%huevo%reventado%' OR titulo ILIKE '%huevo%cocido%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 180, 20, 10, 2, 150 FROM public.recetas WHERE titulo ILIKE '%omelette%champiñon%' OR titulo ILIKE '%tortilla%champiñon%'
ON CONFLICT (receta_id) DO NOTHING;

-- ALMUERZOS (proteína + verdura)
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 45, 18, 6, 220 FROM public.recetas WHERE titulo ILIKE '%pollo%plancha%' OR titulo ILIKE '%pollo%grilled%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 350, 40, 18, 5, 200 FROM public.recetas WHERE titulo ILIKE '%pollo%horno%' OR titulo ILIKE '%pollo%asado%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 320, 38, 16, 4, 200 FROM public.recetas WHERE titulo ILIKE '%pollo%saltead%' OR titulo ILIKE '%pollo%stir%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 400, 35, 28, 4, 250 FROM public.recetas WHERE titulo ILIKE '%carne%molida%' OR titulo ILIKE '%ground%beef%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 350, 25, 26, 8, 250 FROM public.recetas WHERE titulo ILIKE '%ensalada%cesar%' OR titulo ILIKE '%caesar%salad%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 320, 30, 20, 6, 220 FROM public.recetas WHERE titulo ILIKE '%atun%' AND (titulo ILIKE '%ensalada%' OR titulo ILIKE '%salad%')
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 280, 25, 18, 5, 200 FROM public.recetas WHERE titulo ILIKE '%salmón%plancha%' OR titulo ILIKE '%salmon%grilled%'
ON CONFLICT (receta_id) DO NOTHING;

-- CENAS (pescado y carnes)
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 40, 22, 3, 200 FROM public.recetas WHERE titulo ILIKE '%salmón%horno%' OR titulo ILIKE '%salmon%baked%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 420, 38, 28, 4, 220 FROM public.recetas WHERE titulo ILIKE '%merluza%' OR titulo ILIKE '%bacalao%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 450, 42, 30, 3, 220 FROM public.recetas WHERE titulo ILIKE '%bistec%' OR titulo ILIKE '%steak%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 380, 35, 24, 5, 220 FROM public.recetas WHERE titulo ILIKE '%cerdo%' AND (titulo ILIKE '%plancha%' OR titulo ILIKE '%grilled%')
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 360, 40, 20, 4, 200 FROM public.recetas WHERE titulo ILIKE '%hamburguesa%keto%' OR titulo ILIKE '%burger%keto%'
ON CONFLICT (receta_id) DO NOTHING;

-- SNACKS
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 180, 18, 10, 4, 150 FROM public.recetas WHERE titulo ILIKE '%batido%proteina%' OR titulo ILIKE '%shake%protein%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 200, 12, 15, 5, 150 FROM public.recetas WHERE titulo ILIKE '%queso%frito%' OR titulo ILIKE '%cheese%crisps%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 160, 8, 14, 3, 100 FROM public.recetas WHERE titulo ILIKE '%palitos%apio%' OR titulo ILIKE '%celery%sticks%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 150, 5, 12, 4, 100 FROM public.recetas WHERE titulo ILIKE '%aderezo%' OR titulo ILIKE '%dressing%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 200, 15, 14, 4, 180 FROM public.recetas WHERE titulo ILIKE '%smoothie%keto%' OR titulo ILIKE '%batido%keto%'
ON CONFLICT (receta_id) DO NOTHING;

-- COMPLEMENTOS Y ACOMPAÑAMIENTOS
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 80, 3, 7, 4, 150 FROM public.recetas WHERE titulo ILIKE '%arroz%coliflor%' OR titulo ILIKE '%cauliflower%rice%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 70, 2, 6, 3, 150 FROM public.recetas WHERE titulo ILIKE '%pure%coliflor%' OR titulo ILIKE '%mashed%cauliflower%'
ON CONFLICT (receta_id) DO NOTHING;

INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 120, 5, 10, 4, 100 FROM public.recetas WHERE titulo ILIKE '%verdura%salteada%' OR titulo ILIKE '%vegetables%saute%'
ON CONFLICT (receta_id) DO NOTHING;

-- ASIGNAR MACROS VARIADOS A RECETAS SIN MATCH ESPECÍFICO
INSERT INTO public.receta_macros (receta_id, calorias_totales, proteinas_totales, grasas_totales, carbohidratos_totales, porcion_gramos)
SELECT id, 
    -- Valores aleatorios variados entre 200-450
    (floor(random() * 250) + 200)::integer as cal,
    (floor(random() * 30) + 15)::numeric(10,2) as prot,
    (floor(random() * 25) + 12)::numeric(10,2) as fat,
    (floor(random() * 8) + 2)::numeric(10,2) as carbs,
    200 as porcion
FROM public.recetas r
WHERE NOT EXISTS (SELECT 1 FROM public.receta_macros rm WHERE rm.receta_id = r.id)
ON CONFLICT (receta_id) DO NOTHING;

-- Verificar cuántas recetas tienen macros
SELECT 'Total recetas con macros: ' || (SELECT COUNT(*) FROM public.receta_macros) as info;
