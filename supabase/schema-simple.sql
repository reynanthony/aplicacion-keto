-- SCHEMA SIMPLIFICADO KETO LAB
-- Sin auth, acceso anónimo
-- Ejecutar en Supabase SQL Editor

-- Feedback del usuario
CREATE TABLE IF NOT EXISTS keto_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  tipo TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_session ON keto_feedback (session_id);
CREATE INDEX IF NOT EXISTS idx_feedback_tipo ON keto_feedback (tipo);

-- Planes semanales
CREATE TABLE IF NOT EXISTS keto_planes_semanales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  nombre TEXT,
  plan JSONB NOT NULL DEFAULT '{}',
  macros_objetivo JSONB DEFAULT '{}',
  dias INTEGER DEFAULT 7,
  generado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmado BOOLEAN DEFAULT false,
  confirmado_el TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_planes_session ON keto_planes_semanales (session_id);

-- Perfil de usuario
CREATE TABLE IF NOT EXISTS keto_perfil_usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE,
  nivel_experiencia TEXT DEFAULT 'nuevo',
  ingredientes_favoritos JSONB DEFAULT '[]',
  ingredientes_evitados JSONB DEFAULT '[]',
  macros_preferidos JSONB DEFAULT '{"netCarbs": 20, "proteina": 30, "grasa": 70}',
  actualizado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_perfil_session ON keto_perfil_usuario (session_id);

-- RLS deshabilitado para acceso público
ALTER TABLE keto_feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE keto_planes_semanales DISABLE ROW LEVEL SECURITY;
ALTER TABLE keto_perfil_usuario DISABLE ROW LEVEL SECURITY;

-- Acceso público
GRANT ALL ON keto_feedback TO anon, authenticated;
GRANT ALL ON keto_planes_semanales TO anon, authenticated;
GRANT ALL ON keto_perfil_usuario TO anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

SELECT '✅ Schema creado exitosamente' AS status;
