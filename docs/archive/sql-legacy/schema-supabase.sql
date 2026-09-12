-- =============================================
-- KETOLAB SUPABASE SCHEMA
-- Base de datos completa para dieta cetogénica
-- =============================================

-- Crear tablas (ejecutar en orden)
-- Tablas: alimentos, recetas, usuarios, datos_usuario, progreso_racha, suplementos, ejercicios

-- TABLA ALIMENTOS
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

-- TABLA RECETAS
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
    fuente VARCHAR(100),
    validado_por VARCHAR(100),
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);

-- TABLA USUARIOS
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

-- TABLA DATOS_USUARIO
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

-- TABLA PROGRESO_RACHA
CREATE TABLE IF NOT EXISTS public.progreso_racha (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE UNIQUE,
    racha_actual INT DEFAULT 0,
    racha_maxima INT DEFAULT 0,
    ultimo_dia DATE,
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW()
);

-- TABLA SUPLEMENTOS
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

-- TABLA EJERCICIOS
CREATE TABLE IF NOT EXISTS public.ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    musculos_trabajados TEXT,
    equipo_necesario TEXT,
    nivel VARCHAR(20) DEFAULT 'principiante',
    calorias_estimadas_por_minuto DECIMAL(5,2),
    instrucciones TEXT,
    activo BOOLEAN DEFAULT TRUE
);

-- RLS
ALTER TABLE public.alimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datos_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso_racha ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suplementos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ejercicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alimentos_all" ON public.alimentos FOR ALL USING (true);
CREATE POLICY "recetas_all" ON public.recetas FOR ALL USING (true);
CREATE POLICY "usuarios_own" ON public.usuarios FOR ALL USING (auth.uid() = id);
CREATE POLICY "datos_own" ON public.datos_usuario FOR ALL USING (auth.uid() = usuario_id);
CREATE POLICY "racha_own" ON public.progreso_racha FOR ALL USING (auth.uid() = usuario_id);
CREATE POLICY "suplementos_all" ON public.suplementos FOR ALL USING (true);
CREATE POLICY "ejercicios_all" ON public.ejercicios FOR ALL USING (true);

-- TRIGGER AUTO-USER
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, email, nombre) VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1)) ON CONFLICT (id) DO NOTHING;
    INSERT INTO public.progreso_racha (usuario_id, racha_actual, racha_maxima) VALUES (NEW.id, 0, 0) ON CONFLICT (usuario_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
