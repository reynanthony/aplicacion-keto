-- Corrige 6 fotos rotas en alimentos (Pexels dadas de baja), encontradas
-- al verificar en vivo tras conectar el catalogo a Supabase.
-- URLs de reemplazo verificadas con curl (200) y aprobadas por el usuario 2026-08-12.
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/11341893/pexels-photo-11341893.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = '2e7fd786-1012-4d2f-bbd1-e6f44bbb4cc4'; -- Aceite de aguacate
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = 'eb323a53-4dc6-47a5-ac22-a220a5231962'; -- Aceite de coco
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/7771966/pexels-photo-7771966.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = '74c76bf3-e0c7-4bab-a965-4969d0e717ad'; -- Almendras
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/14426299/pexels-photo-14426299.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = '768e7889-1a31-4667-b8fb-edb743e3c3b8'; -- Atún
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/939955/pexels-photo-939955.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = 'a279de45-cf84-42fa-a149-a5361cdf67d2'; -- Avellanas
UPDATE alimentos SET imagen_url = 'https://images.pexels.com/photos/3737656/pexels-photo-3737656.jpeg?auto=compress&cs=tinysrgb&w=400&h=300' WHERE id = 'dcd8b3e8-2295-43b9-9375-a977a09008f0'; -- Aceite de oliva
