-- =============================================
-- RESET COMPLETO - KetoLab Database
-- EJECUTA ESTE SCRIPT PRIMERO
-- =============================================

-- 1. Eliminar tablas existentes (en orden inverso por las FK)
DROP TABLE IF EXISTS public.rutina_ejercicios CASCADE;
DROP TABLE IF EXISTS public.rutinas CASCADE;
DROP TABLE IF EXISTS public.receta_ingredientes CASCADE;
DROP TABLE IF EXISTS public.recetas CASCADE;
DROP TABLE IF EXISTS public.datos_usuario CASCADE;
DROP TABLE IF EXISTS public.progreso_racha CASCADE;
DROP TABLE IF EXISTS public.suplementos CASCADE;
DROP TABLE IF EXISTS public.ejercicios CASCADE;
DROP TABLE IF EXISTS public.alimentos CASCADE;
DROP TABLE IF EXISTS public.usuarios CASCADE;

-- 2. Eliminar funciones y triggers existentes
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Crear tablas SIN RLS primero (para testing)
-- Las tablas sin RLS permiten acceso total

-- ALIMENTOS
CREATE TABLE public.alimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL DEFAULT 'otro',
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

-- RECETAS
CREATE TABLE public.recetas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT NOT NULL DEFAULT '',
    tiempo_preparacion INT,
    tiempo_coccion INT,
    porciones INT DEFAULT 1,
    imagen_url TEXT,
    dificultad VARCHAR(20) DEFAULT 'media',
    tags TEXT[],
    fuente VARCHAR(100),
    validado_por VARCHAR(100),
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

-- RECETA_INGREDIENTES
CREATE TABLE public.receta_ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID REFERENCES public.recetas(id) ON DELETE CASCADE,
    alimento_id UUID REFERENCES public.alimentos(id) ON DELETE SET NULL,
    cantidad DECIMAL(10,2) NOT NULL DEFAULT 1,
    unidad VARCHAR(20),
    notas VARCHAR(200)
);

-- EJERCICIOS
CREATE TABLE public.ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    musculos_trabajados TEXT[],
    equipo_necesario TEXT[],
    nivel VARCHAR(20) DEFAULT 'principiante',
    calorias_estimadas_por_minuto DECIMAL(5,2),
    video_url TEXT,
    instrucciones TEXT,
    imagen_url TEXT,
    validado_por VARCHAR(100),
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

-- RUTINAS
CREATE TABLE public.rutinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    objetivo VARCHAR(50),
    nivel VARCHAR(20) DEFAULT 'principiante',
    duracion_semanas INT,
    dias_por_semana INT,
    descripcion TEXT,
    creado_por VARCHAR(100),
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

-- RUTINA_EJERCICIOS
CREATE TABLE public.rutina_ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rutina_id UUID REFERENCES public.rutinas(id) ON DELETE CASCADE,
    ejercicio_id UUID REFERENCES public.ejercicios(id) ON DELETE SET NULL,
    dia_semana INT,
    series INT,
    repeticiones VARCHAR(20),
    descanso_segundos INT,
    orden INT,
    notas VARCHAR(200)
);

-- SUPLEMENTOS
CREATE TABLE public.suplementos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    dosis_recomendada VARCHAR(100),
    beneficios TEXT,
    contraindicaciones TEXT,
    evidencia_nivel VARCHAR(20),
    imagen_url TEXT,
    enlace_afiliado TEXT,
    activo BOOLEAN DEFAULT TRUE
);

-- USUARIOS
CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY,
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

-- DATOS_USUARIO
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

-- PROGRESO_RACHA
CREATE TABLE public.progreso_racha (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE UNIQUE,
    racha_actual INT DEFAULT 0,
    racha_maxima INT DEFAULT 0,
    ultimo_dia DATE,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Índices
CREATE INDEX idx_alimentos_categoria ON public.alimentos(categoria);
CREATE INDEX idx_recetas_tags ON public.recetas USING GIN(tags);

-- 5. Insertar datos de prueba
INSERT INTO public.alimentos (nombre, categoria, calorias, proteinas, carbos, grasas, fibra, unidad_base, fuente) VALUES
('Huevo entero', 'proteina', 155, 13, 1.1, 11, 0, 'g', 'USDA'),
('Aguacate', 'grasa', 160, 2, 9, 15, 7, 'g', 'USDA'),
('Carne molida 80/20', 'proteina', 254, 17, 0, 21, 0, 'g', 'USDA'),
('Pechuga de pollo', 'proteina', 165, 31, 0, 3.6, 0, 'g', 'USDA'),
('Salmón', 'proteina', 208, 20, 0, 13, 0, 'g', 'USDA'),
('Queso cheddar', 'lacteo', 403, 25, 1.3, 33, 0, 'g', 'USDA'),
('Aceite de oliva', 'grasa', 884, 0, 0, 100, 0, 'ml', 'USDA'),
('Mantequilla', 'grasa', 717, 1, 0, 81, 0, 'g', 'USDA'),
('Espinacas', 'vegetal', 23, 3, 4, 0.4, 2, 'g', 'USDA'),
('Brócoli', 'vegetal', 34, 3, 7, 0.4, 3, 'g', 'USDA'),
('Almendras', 'fruto_seco', 579, 21, 22, 50, 12, 'g', 'USDA'),
('Bacon', 'proteina', 541, 37, 1.4, 42, 0, 'g', 'USDA'),
('Crema de coco', 'grasa', 660, 5, 7, 71, 2, 'ml', 'USDA'),
('Cacao puro', 'grasa', 228, 20, 58, 14, 33, 'g', 'USDA'),
('Nuez de macadamia', 'fruto_seco', 718, 8, 14, 76, 9, 'g', 'USDA');

INSERT INTO public.recetas (titulo, descripcion, instrucciones, tiempo_preparacion, porciones, dificultad, tags, fuente) VALUES
('Huevos con Aguacate', 'Desayuno keto clásico', '1. Cocina los huevos a tu gusto\n2. Corta el aguacate\n3. Sirve juntos con sal y pimienta', 10, 1, 'baja', ARRAY['desayuno', 'rapida'], 'ejemplo'),
('Pollo al Horno con Queso', 'Comida alta en proteína', '1. Sazona el pollo\n2. Hornea a 200°C por 25 min\n3. Añade queso cheddar los últimos 5 min', 15, 25, 2, 'media', ARRAY['almuerzo', 'cena'], 'ejemplo'),
('Smoothie de Aguacate', 'Bebida keto nutritiva', '1. Licúa aguacate con aceite de oliva\n2. Añade cacao puro\n3. Endulza con eritritol al gusto', 5, 1, 'baja', ARRAY['desayuno', 'bebidas', 'rapida'], 'ejemplo');

-- 6. Verificar
SELECT 'Base de datos configurada correctamente!' as mensaje;
SELECT 'Tablas:' as info;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
SELECT 'Alimentos:' as info;
SELECT COUNT(*) as total FROM public.alimentos;
SELECT 'Recetas:' as info;  
SELECT COUNT(*) as total FROM public.recetas;
