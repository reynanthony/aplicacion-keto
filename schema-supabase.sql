-- =============================================
-- KETOLAB SUPABASE SCHEMA
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- IMPORTANTE: Ejecutar en orden
-- 1. Primero ejecutar la seccion ELIMINAR (si hay tablas antiguas)
-- 2. Luego ejecutar CREAR TABLAS
-- 3. Luego RLS y TRIGGERS
-- 4. Finalmente DATOS SEMILLA

-- =============================================
-- ELIMINAR (solo si existen tablas)
-- =============================================
-- DROP TABLE IF EXISTS public.progreso_racha CASCADE;
-- DROP TABLE IF EXISTS public.datos_usuario CASCADE;
-- DROP TABLE IF EXISTS public.usuarios CASCADE;
-- DROP TABLE IF EXISTS public.recetas CASCADE;
-- DROP TABLE IF EXISTS public.alimentos CASCADE;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- =============================================
-- CREAR TABLAS
-- =============================================

CREATE TABLE public.alimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    calorias DECIMAL(8,2) NOT NULL DEFAULT 0,
    proteinas DECIMAL(8,2) NOT NULL DEFAULT 0,
    carbos DECIMAL(8,2) NOT NULL DEFAULT 0,
    grasas DECIMAL(8,2) NOT NULL DEFAULT 0,
    fibra DECIMAL(8,2) DEFAULT 0,
    unidad_base VARCHAR(20) DEFAULT 'g',
    fuente VARCHAR(100) DEFAULT 'sistema',
    validado_por VARCHAR(100),
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE public.recetas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT NOT NULL,
    tiempo_preparacion INT,
    tiempo_coccion INT,
    porciones INT DEFAULT 1,
    imagen_url TEXT,
    dificultad VARCHAR(20) DEFAULT 'media',
    fuente VARCHAR(100),
    validado_por VARCHAR(100),
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(150) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    peso_inicial DECIMAL(5,2),
    peso_actual DECIMAL(5,2),
    peso_meta DECIMAL(5,2),
    altura INT,
    edad INT,
    sexo VARCHAR(20),
    nivel_actividad VARCHAR(20) DEFAULT 'moderado',
    objetivo VARCHAR(50),
    fecha_registro TIMESTAMPTZ DEFAULT NOW(),
    ultimo_acceso TIMESTAMPTZ,
    preferencias JSONB DEFAULT '{}',
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE public.datos_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    peso DECIMAL(5,2),
    calorias DECIMAL(8,2) DEFAULT 0,
    proteinas DECIMAL(8,2) DEFAULT 0,
    carbos DECIMAL(8,2) DEFAULT 0,
    grasas DECIMAL(8,2) DEFAULT 0,
    agua_ml INT DEFAULT 0,
    completado BOOLEAN DEFAULT FALSE,
    UNIQUE(usuario_id, fecha)
);

CREATE TABLE public.progreso_racha (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE UNIQUE,
    racha_actual INT DEFAULT 0,
    racha_maxima INT DEFAULT 0,
    ultimo_dia DATE,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RLS (Row Level Security)
-- =============================================

ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datos_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso_racha ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alimentos_all" ON public.alimentos FOR ALL USING (true);
CREATE POLICY "recetas_all" ON public.recetas FOR ALL USING (true);
CREATE POLICY "usuarios_own" ON public.usuarios FOR ALL USING (auth.uid() = id);
CREATE POLICY "datos_own" ON public.datos_usuario FOR ALL USING (auth.uid() = usuario_id);
CREATE POLICY "racha_own" ON public.progreso_racha FOR ALL USING (auth.uid() = usuario_id);

-- =============================================
-- TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, email, nombre) VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1)) ON CONFLICT (id) DO NOTHING;
    INSERT INTO public.progreso_racha (usuario_id, racha_actual, racha_maxima) VALUES (NEW.id, 0, 0) ON CONFLICT (usuario_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- DATOS SEMILLA
-- =============================================

INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, unidad_base, fuente) VALUES
('Huevo entero', 'proteina', 155, 13, 1.1, 11, 'g', 'USDA'),
('Aguacate', 'grasa', 160, 2, 9, 15, 'g', 'USDA'),
('Carne molida 80/20', 'proteina', 254, 17, 0, 21, 'g', 'USDA'),
('Pechuga de pollo', 'proteina', 165, 31, 0, 3.6, 'g', 'USDA'),
('Salmon', 'proteina', 208, 20, 0, 13, 'g', 'USDA'),
('Queso cheddar', 'lacteo', 403, 25, 1.3, 33, 'g', 'USDA'),
('Aceite de oliva', 'grasa', 884, 0, 0, 100, 'ml', 'USDA'),
('Mantequilla', 'grasa', 717, 1, 0, 81, 'g', 'USDA'),
('Espinacas', 'vegetal', 23, 3, 4, 0.4, 'g', 'USDA'),
('Brocoli', 'vegetal', 34, 3, 7, 0.4, 'g', 'USDA');

INSERT INTO public.recetas (titulo, descripcion, instrucciones, dificultad) VALUES
('Huevos con Aguacate', 'Desayuno keto', 'Cocina huevos, corta aguacate, sirve', 'facil'),
('Pollo con Brocoli', 'Almuerzo keto', 'Cocina pollo, vaporiza brocoli, sirve', 'facil'),
('Salmon con Espinacas', 'Cena keto', 'Cocina salmon, saltea espinacas, sirve', 'media');
