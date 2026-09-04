-- Corrige "Function Search Path Mutable" (advisor de seguridad de Supabase):
-- fija search_path explicito en funciones SECURITY DEFINER / de uso publico
-- para evitar hijacking de esquema via search_path.
ALTER FUNCTION public.update_updated_at_column() SET search_path = public, pg_temp;
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;
ALTER FUNCTION public.buscar_sustituto_keto(vector, double precision, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.buscar_receta_similar(vector, double precision, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_embedding(text) SET search_path = public, pg_temp;
ALTER FUNCTION public.actualizar_perfil_desde_feedback() SET search_path = public, pg_temp;
