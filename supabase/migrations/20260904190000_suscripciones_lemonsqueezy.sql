-- Tabla de suscripciones (LemonSqueezy). Solo el Edge Function del webhook
-- (via service role, que bypassea RLS) puede escribir; el usuario solo lee
-- su propia fila. No hay policy de INSERT/UPDATE/DELETE para anon/authenticated
-- a proposito: el estado de la suscripcion no lo debe poder tocar el cliente.

CREATE TABLE IF NOT EXISTS public.suscripciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  ls_customer_id text,
  ls_subscription_id text UNIQUE,
  ls_variant_id text,
  plan text, -- 'mensual' | 'anual'
  estado text NOT NULL, -- active | on_trial | past_due | paused | cancelled | expired | unpaid
  renueva_en timestamptz,
  fecha_creacion timestamptz NOT NULL DEFAULT now(),
  fecha_actualizacion timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS suscripciones_usuario_id_idx ON public.suscripciones (usuario_id);

ALTER TABLE public.suscripciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve su propia suscripcion"
  ON public.suscripciones FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE TRIGGER suscripciones_set_updated_at
  BEFORE UPDATE ON public.suscripciones
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
