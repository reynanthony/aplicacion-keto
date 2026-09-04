// ==================== SUPABASE EDGE FUNCTION: LemonSqueezy Webhook ====================
// Ubicacion: supabase/functions/lemonsqueezy-webhook/index.ts
// Deploy: supabase functions deploy lemonsqueezy-webhook --no-verify-jwt
// Secret requerido: supabase secrets set LEMONSQUEEZY_WEBHOOK_SECRET=...
//
// Recibe eventos de suscripcion de LemonSqueezy y los refleja en
// public.suscripciones. El checkout debe pasar checkout[custom][usuario_id]
// con el auth.uid() de Supabase para poder vincular la suscripcion al
// usuario (LemonSqueezy no conoce nuestros user id, solo los que le pasamos).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

async function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): Promise<boolean> {
  if (!signatureHeader) return false
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody))
  const digestHex = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('')
  // Comparacion en tiempo constante
  if (digestHex.length !== signatureHeader.length) return false
  let diff = 0
  for (let i = 0; i < digestHex.length; i++) diff |= digestHex.charCodeAt(i) ^ signatureHeader.charCodeAt(i)
  return diff === 0
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const secret = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET') ?? ''
  const rawBody = await req.text()
  const signature = req.headers.get('X-Signature')

  if (!secret || !(await verifySignature(rawBody, signature, secret))) {
    return new Response(JSON.stringify({ error: 'Firma invalida' }), { status: 401 })
  }

  const payload = JSON.parse(rawBody)
  const eventName: string = payload?.meta?.event_name ?? ''
  const usuarioId: string | undefined = payload?.meta?.custom_data?.usuario_id
  const attrs = payload?.data?.attributes ?? {}

  if (!eventName.startsWith('subscription_')) {
    // Eventos que no nos interesan (order_created, etc.) — se ignoran sin error.
    return new Response(JSON.stringify({ ok: true, ignored: eventName }), { status: 200 })
  }

  if (!usuarioId) {
    console.error('Webhook de suscripcion sin custom_data.usuario_id', eventName)
    return new Response(JSON.stringify({ error: 'Falta usuario_id en custom_data' }), { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  )

  const row = {
    usuario_id: usuarioId,
    ls_customer_id: String(attrs.customer_id ?? ''),
    ls_subscription_id: String(payload?.data?.id ?? ''),
    ls_variant_id: String(attrs.variant_id ?? ''),
    plan: attrs.variant_name?.toLowerCase().includes('anual') ? 'anual' : 'mensual',
    estado: attrs.status ?? 'unknown',
    renueva_en: attrs.renews_at ?? null,
  }

  const { error } = await supabase
    .from('suscripciones')
    .upsert(row, { onConflict: 'ls_subscription_id' })

  if (error) {
    console.error('Error guardando suscripcion:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})
