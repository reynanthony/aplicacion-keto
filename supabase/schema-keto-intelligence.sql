-- ==================== SUPABASE SCHEMA PARA KETO INTELLIGENCE ====================
-- Ejecutar en SQL Editor de Supabase

-- 1. Habilitar extensión pg_vector (búsqueda semántica)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabla de ingredientes con embeddings vectoriales
CREATE TABLE IF NOT EXISTS keto_ingredientes_vectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  nombre_normalizado TEXT,
  categoria TEXT NOT NULL,
  critico BOOLEAN DEFAULT false,
  carb_netos_100g DECIMAL(5,2) DEFAULT 0,
  limite_recomendado INTEGER DEFAULT 100,
  embedding VECTOR(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsqueda vectorial
CREATE INDEX IF NOT EXISTS idx_ingredientes_embedding 
ON keto_ingredientes_vectors 
USING ivfflat (embedding vector_cosine_ops);

-- Índice para búsqueda por nombre
CREATE INDEX IF NOT EXISTS idx_ingredientes_nombre 
ON keto_ingredientes_vectors (nombre);
CREATE INDEX IF NOT EXISTS idx_ingredientes_categoria 
ON keto_ingredientes_vectors (categoria);

-- 3. Tabla de recetas con embeddings
CREATE TABLE IF NOT EXISTS keto_recetas_vectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  nombre_normalizado TEXT,
  meal_type TEXT,
  calories INTEGER DEFAULT 0,
  protein DECIMAL(6,2) DEFAULT 0,
  fat DECIMAL(6,2) DEFAULT 0,
  net_carbs DECIMAL(6,2) DEFAULT 0,
  keto_score INTEGER DEFAULT 0,
  ingredientes TEXT[],
  instrucciones TEXT[],
  embedding VECTOR(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recetas_embedding 
ON keto_recetas_vectors 
USING ivfflat (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_recetas_meal_type 
ON keto_recetas_vectors (meal_type);

CREATE INDEX IF NOT EXISTS idx_recetas_keto_score 
ON keto_recetas_vectors (keto_score DESC);

-- 4. Tabla de feedback del usuario
CREATE TABLE IF NOT EXISTS keto_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- 'like_receta', 'dislike_receta', 'calificacion', 'vista'
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_user 
ON keto_feedback (user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_tipo 
ON keto_feedback (tipo);
CREATE INDEX IF NOT EXISTS idx_feedback_created 
ON keto_feedback (created_at DESC);

-- 5. Tabla de planes semanales
CREATE TABLE IF NOT EXISTS keto_planes_semanales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT,
  plan JSONB NOT NULL,
  macros_objetivo JSONB,
  dias INTEGER DEFAULT 7,
  generado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmado BOOLEAN DEFAULT false,
  confirmado_el TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_planes_user 
ON keto_planes_semanales (user_id);
CREATE INDEX IF NOT EXISTS idx_planes_confirmado 
ON keto_planes_semanales (confirmado);

-- 6. Tabla de perfil de usuario
CREATE TABLE IF NOT EXISTS keto_perfil_usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nivel_experiencia TEXT DEFAULT 'nuevo',
  ingredientes_favoritos JSONB DEFAULT '[]',
  ingredientes_evitados JSONB DEFAULT '[]',
  macros_preferidos JSONB DEFAULT '{"netCarbs": 20, "proteina": 30, "grasa": 70}',
  preferencias_dieteticas JSONB DEFAULT '{}',
  actualizado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Función para buscar sustituto keto por similitud vectorial
CREATE OR REPLACE FUNCTION buscar_sustituto_keto(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  nombre TEXT,
  categoria TEXT,
  critico BOOLEAN,
  carb_netos_100g DECIMAL,
  similitud FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    k.nombre,
    k.categoria,
    k.critico,
    k.carb_netos_100g,
    1 - (k.embedding <=> buscar_sustituto_keto.query_embedding) AS similitud
  FROM keto_ingredientes_vectors k
  WHERE k.critico = false
    AND 1 - (k.embedding <=> buscar_sustituto_keto.query_embedding) > match_threshold
  ORDER BY k.embedding <=> buscar_sustituto_keto.query_embedding
  LIMIT match_count;
END;
$$;

-- 8. Función para buscar recetas similares
CREATE OR REPLACE FUNCTION buscar_receta_similar(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.6,
  match_count INTEGER DEFAULT 3
)
RETURNS TABLE (
  id UUID,
  nombre TEXT,
  meal_type TEXT,
  calories INTEGER,
  net_carbs DECIMAL,
  keto_score INTEGER,
  similitud FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.nombre,
    r.meal_type,
    r.calories,
    r.net_carbs,
    r.keto_score,
    1 - (r.embedding <=> buscar_receta_similar.query_embedding) AS similitud
  FROM keto_recetas_vectors r
  WHERE 1 - (r.embedding <=> buscar_receta_similar.query_embedding) > match_threshold
  ORDER BY r.embedding <=> buscar_receta_similar.query_embedding
  LIMIT match_count;
END;
$$;

-- 9. Función RPC para generar embeddings (usar con Edge Function de OpenAI)
CREATE OR REPLACE FUNCTION get_embedding(texto TEXT)
RETURNS TABLE (embedding VECTOR(1536))
LANGUAGE plpgsql
AS $$
BEGIN
  -- Esta función será llamada desde una Edge Function que usa OpenAI
  -- Retorna el embedding generado
  RETURN;
END;
$$;

-- 10. Trigger para actualizar perfil cuando hay nuevo feedback
CREATE OR REPLACE FUNCTION actualizar_perfil_desde_feedback()
RETURNS TRIGGER AS $$
DECLARE
  prefs JSONB;
BEGIN
  -- Obtener últimos 100 feedbacks del usuario
  SELECT 
    jsonb_agg(
      jsonb_build_object(
        'tipo', tipo,
        'data', data
      ) ORDER BY created_at DESC
    ) INTO prefs
  FROM (
    SELECT tipo, data, created_at
    FROM keto_feedback
    WHERE user_id = NEW.user_id
    ORDER BY created_at DESC
    LIMIT 100
  ) t;

  -- Actualizar perfil del usuario
  UPDATE keto_perfil_usuario
  SET 
    ingredientes_favoritos = prefs->'like_receta',
    ingredientes_evitados = prefs->'dislike_receta',
    actualizado_el = NOW()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Políticas RLS (Row Level Security)
ALTER TABLE keto_ingredientes_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE keto_recetas_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE keto_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE keto_planes_semanales ENABLE ROW LEVEL SECURITY;
ALTER TABLE keto_perfil_usuario ENABLE ROW LEVEL SECURITY;

-- Políticas para ingredientes y recetas (lectura pública, escritura admin)
CREATE POLICY "Ingredientes son públicos para lectura"
ON keto_ingredientes_vectors FOR SELECT
USING (true);

CREATE POLICY "Recetas son públicas para lectura"
ON keto_recetas_vectors FOR SELECT
USING (true);

-- Políticas para datos de usuario (solo el usuario puede ver sus datos)
CREATE POLICY "Usuario ve su propio feedback"
ON keto_feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuario crea su propio feedback"
ON keto_feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario ve sus propios planes"
ON keto_planes_semanales FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuario crea sus propios planes"
ON keto_planes_semanales FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario actualiza sus propios planes"
ON keto_planes_semanales FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuario ve su propio perfil"
ON keto_perfil_usuario FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuario crea su propio perfil"
ON keto_perfil_usuario FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 12. Insertar ingredientes base con categorías
INSERT INTO keto_ingredientes_vectors (nombre, nombre_normalizado, categoria, critico, carb_netos_100g) VALUES
-- Proteínas (seguros)
('pollo', 'pollo', 'proteinas', false, 0),
('carne de res', 'carne_res', 'proteinas', false, 0),
('cerdo', 'cerdo', 'proteinas', false, 0),
('cordero', 'cordero', 'proteinas', false, 0),
('pavo', 'pavo', 'proteinas', false, 0),
('salmon', 'salmon', 'proteinas', false, 0),
('atun', 'atun', 'proteinas', false, 0),
('huevos', 'huevos', 'huevos', false, 1),

-- Verduras (seguras)
('brocoli', 'brocoli', 'verduras', false, 4),
('coliflor', 'coliflor', 'verduras', false, 3),
('espinacas', 'espinacas', 'verduras', false, 2),
('calabacin', 'calabacin', 'verduras', false, 2),
('aguacate', 'aguacate', 'grasas', false, 2),
('lechuga', 'lechuga', 'verduras', false, 1),

-- Críticos (NO keto)
('arroz', 'arroz', 'granos', true, 28),
('arroz blanco', 'arroz_blanco', 'granos', true, 28),
('pasta', 'pasta', 'granos', true, 25),
('pan', 'pan', 'granos', true, 45),
('patata', 'patata', 'granos', true, 17),
('papa', 'papa', 'granos', true, 17),
('boniato', 'boniato', 'granos', true, 20),
('avena', 'avena', 'granos', true, 12),
('frijoles', 'frijoles', 'legumbres', true, 14),
('lentejas', 'lentejas', 'legumbres', true, 20),

-- Grasas (seguras)
('mantequilla', 'mantequilla', 'grasas', false, 0),
('aceite de oliva', 'aceite_oliva', 'grasas', false, 0),
('aceite de coco', 'aceite_coco', 'grasas', false, 0),
('nata', 'nata', 'grasas', false, 3),

-- Lácteos
('queso', 'queso', 'lacteos', false, 1),
('queso cheddar', 'queso_cheddar', 'lacteos', false, 1),
('queso mozzarella', 'queso_mozzarella', 'lacteos', false, 2),
('crema agria', 'crema_agria', 'lacteos', false, 4),
('yogur griego', 'yogur_griego', 'lacteos', false, 4),

-- Edulcorantes (seguros con moderación)
('eritritol', 'eritritol', 'edulcorantes', false, 0),
('stevia', 'stevia', 'edulcorantes', false, 0),
('monk fruit', 'monk_fruit', 'edulcorantes', false, 0),

-- Especias (seguras)
('canela', 'canela', 'especias', false, 5),
('curcuma', 'curcuma', 'especias', false, 3),
('pimienta', 'pimienta', 'especias', false, 4),
('jengibre', 'jengibre', 'especias', false, 5)
ON CONFLICT DO NOTHING;
