-- =============================================
-- SUPLEMENTOS DEPORTIVOS Y VITAMINAS KETO
-- Crear tabla suplementos si no existe, luego insertar datos
-- =============================================

-- Crear tabla suplementos (si no existe)
CREATE TABLE IF NOT EXISTS public.suplementos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    dosis_recomendada VARCHAR(100),
    beneficios TEXT,
    contraindicaciones TEXT,
    evidencia_nivel VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE
);

-- Asegurar RLS
ALTER TABLE public.suplementos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "suplementos_all" ON public.suplementos;
CREATE POLICY "suplementos_all" ON public.suplementos FOR ALL USING (true);

-- ELECTROLITOS Y MINERALES
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Magnesio citrato', 'mineral', '200-400mg/dia', 'Previene calambres musculares, mejora calidad del sueño, apoya función nerviosa', 'fuerte'),
('Magnesio treonato', 'mineral', '200mg/dia', 'Cruza barrera hematoencefálica, mejora cognición y memoria', 'moderada'),
('Potasio', 'mineral', '1000-3500mg/dia', 'Esencial para función muscular y cardíaca, previene fatiga', 'fuerte'),
('Sodium (sal)', 'mineral', '2-4g/dia', 'Previene cefaleas keto, mantiene hidratación, apoya función adrenal', 'fuerte'),
('Calcio', 'mineral', '500-1000mg/dia', 'Salud ósea, función muscular, coagulación sanguínea', 'fuerte'),
('Zinc', 'mineral', '15-30mg/dia', 'Apoya sistema inmune, síntesis proteica, función tiroidea', 'fuerte'),
('Hierro', 'mineral', '8-18mg/dia', 'Transporte de oxígeno,previene anemia, energía celular', 'fuerte'),
('Cromo', 'mineral', '200-1000mcg/dia', 'Mejora sensibilidad a insulina, metabolismo de glucosa', 'moderada');

-- VITAMINAS
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Vitamina D3', 'vitamina', '2000-5000 UI/dia', 'Salud ósea, sistema inmune, función muscular, ánimo', 'fuerte'),
('Vitamina K2', 'vitamina', '100-200mcg/dia', 'Moviliza calcio hacia huesos, salud cardiovascular', 'fuerte'),
('Vitamina B1 (Tiamina)', 'vitamina', '1-2mg/dia', 'Metabolismo energético, función nerviosa', 'moderada'),
('Vitamina B6', 'vitamina', '1.3-1.7mg/dia', 'Metabolismo de aminoácidos, síntesis de neurotransmisores', 'fuerte'),
('Vitamina B12', 'vitamina', '2.4mcg/dia', 'Función neurológica, formación de sangre, energía', 'fuerte'),
('Vitamina C', 'vitamina', '500-1000mg/dia', 'Antioxidante, sistema inmune, absorción de hierro', 'fuerte'),
('Vitamina E', 'vitamina', '15mg/dia', 'Antioxidante, salud de piel, función inmune', 'moderada'),
('Biotina', 'vitamina', '30-100mcg/dia', 'Salud de cabello, piel y uñas, metabolismo', 'moderada'),
('Colina', 'vitamina', '425-550mg/dia', 'Función hepática, cognición, síntesis de acetilcolina', 'fuerte');

-- PROTEÍNAS Y AMINOÁCIDOS
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Proteína de suero (Whey)', 'proteina', '20-40g/post-entrenamiento', 'Síntesis muscular, recuperación, alto valor biológico', 'fuerte'),
('Proteína vegetal keto', 'proteina', '25-35g/dia', 'Opción vegetal baja en carb para veganos', 'moderada'),
('BCAA', 'aminoacido', '5-10g/dia', 'Reduce fatiga muscular, apoya recuperación', 'moderada'),
('L-Glutamina', 'aminoacido', '5-10g/dia', 'Recuperación intestinal, sistema inmune, cicatrización', 'moderada'),
('L-Carnitina', 'aminoacido', '500-2000mg/dia', 'Transporte de grasas a mitocondrias, energía', 'fuerte'),
('Creatina monohidrato', 'creatina', '3-5g/dia', 'Fuerza, potencia, función cerebral, hidratación celular', 'fuerte'),
('Taurina', 'aminoacido', '500-2000mg/dia', 'Salud cardíaca, función cerebral, regulación de agua', 'moderada'),
('Beta-Alanina', 'aminoacido', '2-5g/dia', 'Mejora resistencia, retrasa fatiga muscular', 'fuerte'),
('HMB', 'metabolito', '3g/dia', 'Previene degradación muscular, favorece síntesis', 'moderada');

-- QUETÓGENOS Y METABÓLICOS
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Exogenous ketones (BHB)', 'cetogenico', '10-20g/dia', 'Energía inmediata ketosis, reduce adaptación, mental clarity', 'fuerte'),
('MCT Oil', 'cetogenico', '1-3 cucharadas/dia', 'Produce cuerpos cetónicos, energía sostenida, satiety', 'fuerte'),
('Aceite de coco', 'cetogenico', '1-2 cucharadas/dia', 'Fuente de MCT, energía, función tiroidea', 'moderada'),
('Colágeno', 'proteina', '10-20g/dia', 'Salud articular, piel, cabello,digestión', 'fuerte'),
('Omega-3 (EPA/DHA)', 'acido_graso', '1-3g/dia', 'Anti-inflamatorio, salud cerebral, cardíaca', 'fuerte'),
('Omega-6', 'acido_graso', '1-2g/dia', 'Equilibrio inflamatorio, función celular', 'moderada'),
('Garcinia cambogia', 'quemador', '500-1500mg/dia', 'Apetito suppression, inhibición de grasa', 'debil'),
('Green tea extract', 'antioxidante', '250-500mg/dia', 'Termogénesis, antioxidantes, metabolismo', 'moderada'),
('Café verde', 'antioxidante', '400mg/dia', 'Contenido ácido clorogénico, metabolismo', 'moderada');

-- DIGESTIVOS Y SALUD INTESTINAL
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Probióticos', 'digestivo', '10-50 mil millones UFC/dia', 'Salud intestinal, sistema inmune, digestión', 'fuerte'),
('Prebióticos', 'digestivo', '3-5g/dia', 'Alimentan bacterias beneficiosas, salud microbiota', 'moderada'),
('Digestive enzymes', 'digestivo', '1-2 capsulas/comida', 'Mejora digestión de grasas y proteínas', 'moderada'),
('Psyllium husk', 'fibra', '5-10g/dia', 'Fibra soluble, salud intestinal, saciedad', 'fuerte'),
('Apple cider vinegar', 'acidifico', '1-2 cucharadas/dia', 'Digestión, control de azúcar, saciedad', 'moderada'),
('Betaine HCL', 'acidifico', '650mg/comida grasa', 'Mejora digestión ácida, absorción minerales', 'moderada');

-- HORMONALES Y ADRENALES
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Ashwagandha', 'adaptogeno', '300-600mg/dia', 'Reduce estrés, cortisol, mejora sueño y energía', 'fuerte'),
('Rhodiola rosea', 'adaptogeno', '200-400mg/dia', 'Resistencia al estrés, fatiga, desempeño mental', 'fuerte'),
('Maca', 'adaptogeno', '1500-3000mg/dia', 'Energía, libido, equilibrio hormonal', 'moderada'),
('Ginseng', 'adaptogeno', '200-400mg/dia', 'Energía, función cognitiva, sistema inmune', 'moderada'),
('Melatonina', 'hormona', '0.5-5mg/antes de dormir', 'Regulación de sueño, jet lag, calidad descanso', 'fuerte'),
('5-HTP', 'precursor', '50-200mg/dia', 'Precursor de serotonina, ánimo, sueño', 'moderada'),
('L-Tirosina', 'aminoacido', '500-2000mg/dia', 'Precursor dopamina, función tiroidea, estrés', 'moderada');

-- QUEMADORES DE GRASA
INSERT INTO public.suplementos (nombre, categoria, dosis_recomendada, beneficios, evidencia_nivel) VALUES
('Cafeína anhidra', 'estimulante', '100-200mg/dia', 'Termogénesis, energía, enfoque, metabolismo', 'fuerte'),
('L-Carnitina', 'quemador', '500-2000mg/dia', 'Transporte ácidos grasos, energía', 'fuerte'),
('Capsaicina', 'termogenico', '2-6mg/dia', 'Termogénesis, supresión apetito', 'moderada'),
('Forskolin', 'termogenico', '250mg/dia', 'Activa adenilato ciclasa, aumenta cAMP', 'debil'),
('Yohimbina', 'quemador', '5-20mg/dia', 'Bloquea receptores alfa, moviliza grasa', 'moderada'),
('Synephrine', 'quemador', '20-50mg/dia', 'Estimulante suave, termogénesis', 'moderada');

SELECT 'Suplementos insertados!' as status;
