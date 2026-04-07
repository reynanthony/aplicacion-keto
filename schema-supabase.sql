-- =============================================
-- KETOLAB SUPABASE SCHEMA
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- =============================================
-- 1. TABLAS BASE
-- =============================================

-- ALIMENTOS
CREATE TABLE IF NOT EXISTS public.alimentos (
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

-- RECETAS
CREATE TABLE IF NOT EXISTS public.recetas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT NOT NULL,
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
CREATE TABLE IF NOT EXISTS public.receta_ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receta_id UUID REFERENCES public.recetas(id) ON DELETE CASCADE,
    alimento_id UUID REFERENCES public.alimentos(id) ON DELETE SET NULL,
    cantidad DECIMAL(10,2) NOT NULL DEFAULT 1,
    unidad VARCHAR(20),
    notas VARCHAR(200)
);

-- EJERCICIOS
CREATE TABLE IF NOT EXISTS public.ejercicios (
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
CREATE TABLE IF NOT EXISTS public.rutinas (
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
CREATE TABLE IF NOT EXISTS public.rutina_ejercicios (
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
CREATE TABLE IF NOT EXISTS public.suplementos (
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

-- =============================================
-- 2. TABLAS DE USUARIO
-- =============================================

-- USUARIOS
CREATE TABLE IF NOT EXISTS public.usuarios (
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

-- DATOS_USUARIO (tracking diario)
CREATE TABLE IF NOT EXISTS public.datos_usuario (
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
CREATE TABLE IF NOT EXISTS public.progreso_racha (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE UNIQUE,
    racha_actual INT DEFAULT 0,
    racha_maxima INT DEFAULT 0,
    ultimo_dia DATE,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. ÍNDICES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_alimentos_categoria ON public.alimentos(categoria);
CREATE INDEX IF NOT EXISTS idx_alimentos_nombre ON public.alimentos(nombre);
CREATE INDEX IF NOT EXISTS idx_recetas_tags ON public.recetas USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_ejercicios_nivel ON public.ejercicios(nivel);
CREATE INDEX IF NOT EXISTS idx_ejercicios_categoria ON public.ejercicios(categoria);
CREATE INDEX IF NOT EXISTS idx_datos_usuario_fecha ON public.datos_usuario(usuario_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON public.usuarios(email);

-- =============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS
ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receta_ingredientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutina_ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suplementos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datos_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso_racha ENABLE ROW LEVEL SECURITY;

-- Políticas para tablas públicas (lectura sin auth)
CREATE POLICY "alimentos_read_public" ON public.alimentos FOR SELECT USING (activo = true);
CREATE POLICY "recetas_read_public" ON public.recetas FOR SELECT USING (activo = true);
CREATE POLICY "ejercicios_read_public" ON public.ejercicios FOR SELECT USING (activo = true);
CREATE POLICY "suplementos_read_public" ON public.suplementos FOR SELECT USING (activo = true);

-- Políticas para usuarios (datos propios)
CREATE POLICY "usuarios_select_own" ON public.usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "usuarios_update_own" ON public.usuarios FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "usuarios_insert_own" ON public.usuarios FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "datos_select_own" ON public.datos_usuario FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "datos_insert_own" ON public.datos_usuario FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "datos_update_own" ON public.datos_usuario FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "datos_delete_own" ON public.datos_usuario FOR DELETE USING (auth.uid() = usuario_id);

CREATE POLICY "racha_all_own" ON public.progreso_racha FOR ALL USING (auth.uid() = usuario_id);

-- =============================================
-- 5. TRIGGERS
-- =============================================

-- Trigger para actualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_alimentos_updated_at BEFORE UPDATE ON public.alimentos
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ejercicios_updated_at BEFORE UPDATE ON public.ejercicios
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_racha_updated_at BEFORE UPDATE ON public.progreso_racha
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para crear usuario automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, email, nombre)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO NOTHING;
    
    INSERT INTO public.progreso_racha (usuario_id, racha_actual, racha_maxima)
    VALUES (NEW.id, 0, 0)
    ON CONFLICT (usuario_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 6. DATOS DE SEMILLA (opcional)
-- =============================================

-- Descomenta las siguientes líneas para insertar datos de ejemplo:

/*
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
('Nuez de macadamia', 'fruto_seco', 718, 8, 14, 76, 9, 'g', 'USDA')
ON CONFLICT DO NOTHING;
*/

-- =============================================
-- 7. VERIFICACIÓN
-- =============================================

-- Verificar tablas creadas
SELECT 'Tablas creadas:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE 'pg_%';

-- Verificar políticas RLS
SELECT 'Políticas RLS:' as status;
SELECT tablename, policyname, permissive, roles, cmd FROM pg_policies WHERE schemaname = 'public';
