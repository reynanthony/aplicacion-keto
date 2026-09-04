// ==============================================
// KetoCore Entitlements (LemonSqueezy)
// ==============================================
// Verifica si el usuario tiene suscripcion activa consultando la tabla
// suscripciones (RLS: cada usuario solo ve su propia fila). Requiere que
// supabase-client.js ya haya corrido antes (window.supabase, window.auth).

// TODO: completar con los datos reales de LemonSqueezy antes de activar el paywall.
const LEMONSQUEEZY_CHECKOUT = {
    storeUrl: 'https://TU-TIENDA.lemonsqueezy.com', // Settings > General en LemonSqueezy
    variantMensual: 'REEMPLAZAR_VARIANT_ID_MENSUAL',
    variantAnual: 'REEMPLAZAR_VARIANT_ID_ANUAL',
};

const ESTADOS_ACTIVOS = ['active', 'on_trial'];

window.KetoEntitlements = {
    _cache: null,

    async getSuscripcion(forceRefresh = false) {
        if (this._cache && !forceRefresh) return this._cache;

        const { data: userData } = await window.auth.getUser();
        const user = userData?.user;
        if (!user) { this._cache = null; return null; }

        const { data, error } = await window.supabase
            .from('suscripciones')
            .select('estado, plan, renueva_en')
            .eq('usuario_id', user.id)
            .order('fecha_actualizacion', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error('[Entitlements] Error consultando suscripcion:', error);
            this._cache = null;
            return null;
        }

        this._cache = data;
        return data;
    },

    async isPremium() {
        const sub = await this.getSuscripcion();
        return !!sub && ESTADOS_ACTIVOS.includes(sub.estado);
    },

    async checkoutUrl(plan = 'mensual') {
        const { data: userData } = await window.auth.getUser();
        const user = userData?.user;
        const variantId = plan === 'anual' ? LEMONSQUEEZY_CHECKOUT.variantAnual : LEMONSQUEEZY_CHECKOUT.variantMensual;
        const url = new URL(`${LEMONSQUEEZY_CHECKOUT.storeUrl}/checkout/buy/${variantId}`);
        if (user) {
            url.searchParams.set('checkout[custom][usuario_id]', user.id);
            if (user.email) url.searchParams.set('checkout[email]', user.email);
        }
        return url.toString();
    },

    // Muestra un overlay simple de "funcion premium" sobre un elemento dado,
    // reutilizando la misma idea visual que el resto del app usa para
    // features en beta (ver .coming-soon-overlay en comunidad.astro).
    async gate(elementId, featureLabel) {
        const premium = await this.isPremium();
        if (premium) return true;

        const el = document.getElementById(elementId);
        if (!el) return false;
        el.classList.add('coming-soon-overlay');
        el.style.filter = 'blur(3px)';
        el.style.pointerEvents = 'none';
        el.style.userSelect = 'none';

        const banner = document.createElement('div');
        banner.style.cssText = 'text-align:center;padding:16px;margin-top:8px;border-radius:12px;background:rgba(255,77,0,0.1);border:1px solid rgba(255,77,0,0.2)';
        const label = document.createElement('p');
        label.style.cssText = 'font-size:14px;color:#ff7a3c;font-weight:700;margin-bottom:8px';
        label.textContent = featureLabel + ' es una función Premium';
        const link = document.createElement('a');
        link.href = '/app/perfil';
        link.style.cssText = 'display:inline-block;padding:10px 20px;border-radius:10px;background:#ff4d00;color:#fff;font-weight:700;text-decoration:none;font-size:13px';
        link.textContent = 'Suscribirme';
        banner.appendChild(label);
        banner.appendChild(link);
        el.insertAdjacentElement('afterend', banner);
        return false;
    },
};
