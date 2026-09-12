-- =============================================
-- FIX RLS POLICIES - KetoLab
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- Desactivar RLS temporalmente (para testing)
-- Una vez funcione, puedes reactivarlo con control más fino

-- Tablas públicas (solo lectura sin auth)
ALTER TABLE public.alimentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.recetas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.receta_ingredientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ejercicios DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutinas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.rutina_ejercicios DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.suplementos DISABLE ROW LEVEL SECURITY;

-- Tablas de usuario (requieren auth)
-- Mantener RLS activo pero con políticas correctas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datos_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso_racha ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "alimentos_read_public" ON public.alimentos;
DROP POLICY IF EXISTS "recetas_read_public" ON public.recetas;
DROP POLICY IF EXISTS "ejercicios_read_public" ON public.ejercicios;
DROP POLICY IF EXISTS "suplementos_read_public" ON public.suplementos;

-- Crear políticas públicas (sin auth)
CREATE POLICY "alimentos_public_read" ON public.alimentos FOR SELECT USING (true);
CREATE POLICY "recetas_public_read" ON public.recetas FOR SELECT USING (true);
CREATE POLICY "recetas_public_insert" ON public.recetas FOR INSERT WITH CHECK (true);
CREATE POLICY "ejercicios_public_read" ON public.ejercicios FOR SELECT USING (true);
CREATE POLICY "suplementos_public_read" ON public.suplementos FOR SELECT USING (true);

-- Políticas para usuarios (con auth)
DROP POLICY IF EXISTS "usuarios_select_own" ON public.usuarios;
DROP POLICY IF EXISTS "usuarios_update_own" ON public.usuarios;
DROP POLICY IF EXISTS "usuarios_insert_own" ON public.usuarios;

CREATE POLICY "usuarios_select_own" ON public.usuarios FOR SELECT USING (auth.uid() = id OR id IS NULL);
CREATE POLICY "usuarios_update_own" ON public.usuarios FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "usuarios_insert_own" ON public.usuarios FOR INSERT WITH CHECK (auth.uid() = id OR id IS NULL);

-- Políticas para datos_usuario (con auth)
DROP POLICY IF EXISTS "datos_select_own" ON public.datos_usuario;
DROP POLICY IF EXISTS "datos_insert_own" ON public.datos_usuario;
DROP POLICY IF EXISTS "datos_update_own" ON public.datos_usuario;
DROP POLICY IF EXISTS "datos_delete_own" ON public.datos_usuario;

CREATE POLICY "datos_select_own" ON public.datos_usuario FOR SELECT USING (auth.uid() = usuario_id OR usuario_id IS NULL);
CREATE POLICY "datos_insert_own" ON public.datos_usuario FOR INSERT WITH CHECK (auth.uid() = usuario_id OR usuario_id IS NULL);
CREATE POLICY "datos_update_own" ON public.datos_usuario FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "datos_delete_own" ON public.datos_usuario FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas para progreso_racha
DROP POLICY IF EXISTS "racha_all_own" ON public.progreso_racha;
CREATE POLICY "racha_all_own" ON public.progreso_racha FOR ALL USING (auth.uid() = usuario_id OR usuario_id IS NULL);

-- Verificar
SELECT 'RLS Fixed!' as status;
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
