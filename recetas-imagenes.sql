-- =============================================
-- AGREGAR IMAGENES A RECETAS DESDE UNSPLASH
-- =============================================

UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400' WHERE titulo ILIKE '%huevo%reventado%' OR titulo ILIKE '%huevo%cocido%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400' WHERE titulo ILIKE '%huevo%bacon%' OR titulo ILIKE '%huevo%tocin%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400' WHERE titulo ILIKE '%tortilla%espinac%' OR titulo ILIKE '%omelette%espinac%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' WHERE titulo ILIKE '%pancake%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' WHERE titulo ILIKE '%cafe%' OR titulo ILIKE '%coffee%' OR titulo ILIKE '%bulletproof%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' WHERE titulo ILIKE '%pollo%plancha%' OR titulo ILIKE '%pollo%grilled%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400' WHERE titulo ILIKE '%pollo%horno%' OR titulo ILIKE '%pollo%asado%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400' WHERE titulo ILIKE '%carne%molida%' OR titulo ILIKE '%ground%beef%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' WHERE titulo ILIKE '%ensalada%cesar%' OR titulo ILIKE '%caesar%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' WHERE titulo ILIKE '%salmón%' OR titulo ILIKE '%salmon%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1460285063918-4ad2802d5e5a?w=400' WHERE titulo ILIKE '%bistec%' OR titulo ILIKE '%steak%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400' WHERE titulo ILIKE '%batido%' OR titulo ILIKE '%smoothie%' OR titulo ILIKE '%shake%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' WHERE titulo ILIKE '%aderezo%' OR titulo ILIKE '%dressing%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1568158879083-c428609d818b?w=400' WHERE titulo ILIKE '%arroz%coliflor%' OR titulo ILIKE '%cauliflower%rice%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' WHERE titulo ILIKE '%verdura%saltead%' OR titulo ILIKE '%vegetables%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1482049016gy8d-a67def6a670?w=400' WHERE titulo ILIKE '%pollo%brócoli%' OR titulo ILIKE '%pollo%brocoli%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' WHERE titulo ILIKE '%omelette%queso%' OR titulo ILIKE '%omelette%jamon%';
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' WHERE titulo ILIKE '%yogur%' OR titulo ILIKE '%greek%yogurt%';

-- Imagen genérica para recetas sin imagen
UPDATE public.recetas SET imagen_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' WHERE imagen_url IS NULL OR imagen_url = '';

-- Verificar resultado
SELECT titulo, imagen_url FROM public.recetas LIMIT 20;
