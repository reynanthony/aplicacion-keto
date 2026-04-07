-- =============================================
-- AGREGAR IMAGENES A RECETAS DESDE PEXELS
-- =============================================

-- Proteínas y huevos
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%huevo%bacon%' OR titulo ILIKE '%huevo%tocin%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/158388/pexels-photo-158388.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%huevo%reventado%' OR titulo ILIKE '%huevo%cocido%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%omelette%' OR titulo ILIKE '%tortilla%';

-- Pollo
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/6169/pexels-photo-6169.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%pollo%plancha%' OR titulo ILIKE '%pollo%grilled%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%pollo%horno%' OR titulo ILIKE '%pollo%asado%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/2232/pexels-photo-2232.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%pollo%brócoli%' OR titulo ILIKE '%pollo%brocoli%';

-- Carnes
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1904035/pexels-photo-1904035.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%carne%molida%' OR titulo ILIKE '%ground%beef%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1873293/pexels-photo-1873293.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%bistec%' OR titulo ILIKE '%steak%';

-- Pescados y mariscos
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%salmón%' OR titulo ILIKE '%salmon%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/776054/pexels-photo-776054.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%merluza%' OR titulo ILIKE '%bacalao%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%atún%' OR titulo ILIKE '%atun%';

-- Ensaladas
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%ensalada%cesar%' OR titulo ILIKE '%caesar%salad%';

-- Desayunos
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%pancake%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%cafe%' OR titulo ILIKE '%coffee%' OR titulo ILIKE '%bulletproof%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/375656/pexels-photo-375656.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%yogur%' OR titulo ILIKE '%greek%';

-- Snacks y batidos
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/3780113/pexels-photo-3780113.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%batido%' OR titulo ILIKE '%smoothie%' OR titulo ILIKE '%shake%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%aderezo%' OR titulo ILIKE '%dressing%';

-- Acompañamientos
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1020470/pexels-photo-1020470.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%arroz%coliflor%' OR titulo ILIKE '%cauliflower%rice%';
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/2968889/pexels-photo-2968889.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE titulo ILIKE '%verdura%saltead%' OR titulo ILIKE '%vegetables%saute%';

-- Imagen genérica para recetas sin match
UPDATE public.recetas SET imagen_url = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400' WHERE imagen_url IS NULL OR imagen_url = '';

-- Verificar resultado
SELECT titulo, imagen_url FROM public.recetas LIMIT 20;
