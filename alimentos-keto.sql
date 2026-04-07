-- =============================================
-- ALIMENTOS KETO COMPLETOS
-- Insertar en: Supabase Dashboard > SQL Editor
-- =============================================

-- PROTEÍNAS (23 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Huevo entero', 'proteina', 155, 13, 1.1, 11, 0, 'g', 'USDA'),
('Clara de huevo', 'proteina', 52, 11, 0.7, 0.2, 0, 'g', 'USDA'),
('Pechuga de pollo', 'proteina', 165, 31, 0, 3.6, 0, 'g', 'USDA'),
('Muslo de pollo', 'proteina', 209, 26, 0, 11, 0, 'g', 'USDA'),
('Carne molida 80/20', 'proteina', 254, 17, 0, 21, 0, 'g', 'USDA'),
('Carne molida 90/10', 'proteina', 176, 20, 0, 10, 0, 'g', 'USDA'),
('Ribeye steak', 'proteina', 291, 24, 0, 21, 0, 'g', 'USDA'),
('Solomillo de res', 'proteina', 218, 26, 0, 12, 0, 'g', 'USDA'),
('Filete de res', 'proteina', 271, 26, 0, 18, 0, 'g', 'USDA'),
('Hígado de res', 'proteina', 135, 20, 4, 4, 0, 'g', 'USDA'),
('Cerdo entero', 'proteina', 242, 27, 0, 15, 0, 'g', 'USDA'),
('Chuleta de cerdo', 'proteina', 231, 25, 0, 14, 0, 'g', 'USDA'),
('Bacon', 'proteina', 541, 37, 1.4, 42, 0, 'g', 'USDA'),
('Tocino', 'proteina', 458, 35, 1.4, 35, 0, 'g', 'USDA'),
('Jamón serrano', 'proteina', 207, 25, 2, 11, 0, 'g', 'USDA'),
('Salchicha italiana', 'proteina', 346, 14, 2, 32, 0, 'g', 'USDA'),
('Cordero', 'proteina', 294, 25, 0, 21, 0, 'g', 'USDA'),
('Pavo molido', 'proteina', 149, 20, 0, 8, 0, 'g', 'USDA'),
('Pato', 'proteina', 337, 19, 0, 28, 0, 'g', 'USDA'),
('Conejo', 'proteina', 173, 33, 0, 4, 0, 'g', 'USDA'),
('Venado', 'proteina', 158, 30, 0, 3, 0, 'g', 'USDA'),
('Codorniz', 'proteina', 192, 25, 0, 10, 0, 'g', 'USDA'),
('Ostras', 'proteina', 68, 7, 4, 3, 0, 'g', 'USDA');

-- GRASAS SALUDABLES (17 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Aguacate', 'grasa', 160, 2, 9, 15, 7, 'g', 'USDA'),
('Aceite de oliva EV', 'grasa', 884, 0, 0, 100, 0, 'ml', 'USDA'),
('Aceite de coco', 'grasa', 862, 0, 0, 100, 0, 'ml', 'USDA'),
('Mantequilla', 'grasa', 717, 1, 0, 81, 0, 'g', 'USDA'),
('Ghee', 'grasa', 900, 0, 0, 100, 0, 'g', 'USDA'),
('Crema de coco', 'grasa', 660, 5, 7, 71, 2, 'ml', 'USDA'),
('Leche de coco entera', 'grasa', 197, 2, 3, 21, 0, '100ml', 'USDA'),
('Mayonesa casera', 'grasa', 680, 1, 0, 75, 0, 'g', 'USDA'),
('Queso crema', 'grasa', 342, 6, 4, 34, 0, 'g', 'USDA'),
('Yogur griego entero', 'grasa', 97, 9, 4, 5, 0, 'g', 'USDA'),
('Grasa de cerdo', 'grasa', 902, 0, 0, 100, 0, 'g', 'USDA'),
('Grasa de pato', 'grasa', 900, 0, 0, 100, 0, 'g', 'USDA'),
('Olivas', 'grasa', 115, 1, 6, 11, 3, 'g', 'USDA'),
('Olivas negras', 'grasa', 115, 1, 6, 11, 3, 'g', 'USDA'),
('Tahini', 'grasa', 595, 17, 21, 54, 9, 'g', 'USDA'),
('MCT Oil', 'grasa', 862, 0, 0, 100, 0, 'ml', 'USDA'),
('Aceite de aguacate', 'grasa', 884, 0, 0, 100, 0, 'ml', 'USDA');

-- LÁCTEOS (16 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Queso cheddar', 'lacteo', 403, 25, 1.3, 33, 0, 'g', 'USDA'),
('Queso mozzarella', 'lacteo', 280, 28, 3, 17, 0, 'g', 'USDA'),
('Queso parmesano', 'lacteo', 431, 38, 4, 29, 0, 'g', 'USDA'),
('Queso gouda', 'lacteo', 356, 25, 2, 27, 0, 'g', 'USDA'),
('Queso brie', 'lacteo', 334, 21, 0, 28, 0, 'g', 'USDA'),
('Queso azul', 'lacteo', 353, 21, 2, 29, 0, 'g', 'USDA'),
('Queso feta', 'lacteo', 264, 14, 4, 21, 0, 'g', 'USDA'),
('Queso cottage', 'lacteo', 98, 11, 3, 4, 0, 'g', 'USDA'),
('Queso ricota', 'lacteo', 174, 11, 3, 13, 0, 'g', 'USDA'),
('Queso manchego', 'lacteo', 376, 26, 2, 30, 0, 'g', 'USDA'),
('Queso swiss', 'lacteo', 380, 27, 5, 28, 0, 'g', 'USDA'),
('Queso provolone', 'lacteo', 351, 26, 2, 27, 0, 'g', 'USDA'),
('Requesón', 'lacteo', 98, 11, 3, 4, 0, 'g', 'USDA'),
('Leche entera', 'lacteo', 61, 3, 5, 3, 0, '100ml', 'USDA'),
('Leche crema', 'lacteo', 340, 2, 3, 36, 0, '100ml', 'USDA'),
('Queso de cabra', 'lacteo', 364, 22, 0, 30, 0, 'g', 'USDA');

-- MARISCOS (16 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Salmón', 'marisco', 208, 20, 0, 13, 0, 'g', 'USDA'),
('Atún', 'marisco', 132, 28, 0, 1, 0, 'g', 'USDA'),
('Caballa', 'marisco', 205, 19, 0, 14, 0, 'g', 'USDA'),
('Sardina', 'marisco', 208, 25, 0, 11, 0, 'g', 'USDA'),
('Anchoa', 'marisco', 210, 29, 0, 10, 0, 'g', 'USDA'),
('Bacalao', 'marisco', 82, 18, 0, 1, 0, 'g', 'USDA'),
('Merluza', 'marisco', 86, 18, 0, 1, 0, 'g', 'USDA'),
('Gambas', 'marisco', 99, 24, 0, 1, 0, 'g', 'USDA'),
('Langosta', 'marisco', 89, 19, 0, 1, 0, 'g', 'USDA'),
('Camarón', 'marisco', 85, 20, 0, 1, 0, 'g', 'USDA'),
('Pulpo', 'marisco', 82, 15, 0, 1, 0, 'g', 'USDA'),
('Calamar', 'marisco', 92, 16, 3, 1, 0, 'g', 'USDA'),
('Mejillón', 'marisco', 86, 12, 4, 2, 0, 'g', 'USDA'),
('Trucha', 'marisco', 148, 21, 0, 7, 0, 'g', 'USDA'),
('Bonito', 'marisco', 144, 24, 0, 5, 0, 'g', 'USDA'),
('Cangrejo', 'marisco', 87, 18, 0, 1, 0, 'g', 'USDA');

-- VEGETALES BAJOS EN CARB (30 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Espinacas', 'vegetal', 23, 3, 4, 0.4, 2, 'g', 'USDA'),
('Acelga', 'vegetal', 19, 2, 3, 0.2, 2, 'g', 'USDA'),
('Col rizada Kale', 'vegetal', 49, 4, 9, 1, 4, 'g', 'USDA'),
('Brócoli', 'vegetal', 34, 3, 7, 0.4, 3, 'g', 'USDA'),
('Coliflor', 'vegetal', 25, 2, 5, 0.1, 2, 'g', 'USDA'),
('Espárragos', 'vegetal', 20, 2, 4, 0.1, 2, 'g', 'USDA'),
('Calabacín', 'vegetal', 17, 1, 3, 0.3, 1, 'g', 'USDA'),
('Apio', 'vegetal', 16, 1, 3, 0.2, 2, 'g', 'USDA'),
('Pepino', 'vegetal', 16, 1, 4, 0.1, 1, 'g', 'USDA'),
('Lechuga', 'vegetal', 15, 1, 3, 0.2, 1, 'g', 'USDA'),
('Tomate', 'vegetal', 18, 1, 4, 0.2, 1, 'g', 'USDA'),
('Pimiento rojo', 'vegetal', 31, 1, 6, 0.3, 2, 'g', 'USDA'),
('Cebolla', 'vegetal', 40, 1, 9, 0.1, 2, 'g', 'USDA'),
('Ajo', 'vegetal', 149, 6, 33, 0.5, 2, 'g', 'USDA'),
('Jalapeño', 'vegetal', 29, 1, 6, 0.4, 3, 'g', 'USDA'),
('Rábanos', 'vegetal', 16, 1, 3, 0.1, 2, 'g', 'USDA'),
('Setas', 'vegetal', 22, 3, 3, 0.3, 1, 'g', 'USDA'),
('Champiñón', 'vegetal', 22, 3, 3, 0.3, 1, 'g', 'USDA'),
('Berenjena', 'vegetal', 25, 1, 6, 0.2, 3, 'g', 'USDA'),
('Col', 'vegetal', 25, 1, 6, 0.1, 3, 'g', 'USDA'),
('Alcachofa', 'vegetal', 47, 3, 11, 0.2, 5, 'g', 'USDA'),
('Puerro', 'vegetal', 61, 1, 14, 0.3, 2, 'g', 'USDA'),
('Bok choy', 'vegetal', 13, 2, 2, 0.2, 1, 'g', 'USDA'),
('Chucrut', 'vegetal', 23, 1, 5, 0.1, 3, 'g', 'USDA'),
('Nabo', 'vegetal', 28, 1, 6, 0.1, 2, 'g', 'USDA'),
('Colinabo', 'vegetal', 27, 1, 6, 0.1, 2, 'g', 'USDA'),
('Remolacha', 'vegetal', 43, 2, 10, 0.2, 3, 'g', 'USDA'),
('Zanahoria', 'vegetal', 41, 1, 10, 0.2, 3, 'g', 'USDA'),
('Boniato', 'vegetal', 86, 2, 20, 0.1, 3, 'g', 'USDA'),
('Calabaza', 'vegetal', 26, 1, 6, 0.1, 1, 'g', 'USDA');

-- FRUTOS SECOS Y SEMILLAS (17 alimentos)
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Almendras', 'fruto_seco', 579, 21, 22, 50, 12, 'g', 'USDA'),
('Nuez de macadamia', 'fruto_seco', 718, 8, 14, 76, 9, 'g', 'USDA'),
('Pecanas', 'fruto_seco', 691, 9, 14, 72, 10, 'g', 'USDA'),
('Nuez', 'fruto_seco', 654, 15, 14, 65, 7, 'g', 'USDA'),
('Pistachos', 'fruto_seco', 560, 20, 28, 45, 10, 'g', 'USDA'),
('Avellanas', 'fruto_seco', 628, 15, 17, 61, 10, 'g', 'USDA'),
('Piñón', 'fruto_seco', 673, 14, 13, 68, 4, 'g', 'USDA'),
('Semillas de chía', 'fruto_seco', 486, 17, 42, 31, 34, 'g', 'USDA'),
('Semillas de linaza', 'fruto_seco', 534, 18, 29, 42, 27, 'g', 'USDA'),
('Semillas de calabaza', 'fruto_seco', 559, 30, 11, 49, 6, 'g', 'USDA'),
('Semillas de girasol', 'fruto_seco', 584, 21, 20, 51, 9, 'g', 'USDA'),
('Semillas de hemp', 'fruto_seco', 553, 32, 9, 49, 4, 'g', 'USDA'),
('Coco rallado', 'fruto_seco', 660, 7, 24, 65, 16, 'g', 'USDA'),
('Mantequilla de almendras', 'fruto_seco', 614, 21, 19, 56, 10, 'g', 'USDA'),
('Mantequilla de cacahuete', 'fruto_seco', 588, 25, 20, 50, 6, 'g', 'USDA'),
('Cacao nibs', 'fruto_seco', 228, 20, 58, 14, 33, 'g', 'USDA'),
('Nuez de Brasil', 'fruto_seco', 656, 14, 12, 66, 8, 'g', 'USDA');

SELECT '119 alimentos keto insertados!' as status;
