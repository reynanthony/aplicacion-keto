/**
 * @jest-environment jsdom
 */

function makeSupabaseMock(result) {
  const chain = {
    from: jest.fn(() => chain),
    select: jest.fn(() => chain),
    eq: jest.fn(() => chain),
    order: jest.fn(() => chain),
    limit: jest.fn(() => chain),
    maybeSingle: jest.fn(() => Promise.resolve(result)),
  };
  return chain;
}

function makeAuthMock(user) {
  return { getUser: jest.fn(() => Promise.resolve({ data: { user } })) };
}

describe('KetoEntitlements', () => {
  var ent;

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '';
    require('./entitlements.js');
    ent = global.KetoEntitlements;
  });

  describe('getSuscripcion', () => {
    test('returns null when there is no logged-in user', async () => {
      global.auth = makeAuthMock(null);
      global.supabase = makeSupabaseMock({ data: { estado: 'active' }, error: null });

      const sub = await ent.getSuscripcion();
      expect(sub).toBeNull();
      expect(global.supabase.from).not.toHaveBeenCalled();
    });

    test('returns the row from suscripciones for the logged-in user', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'active', plan: 'mensual' }, error: null });

      const sub = await ent.getSuscripcion();
      expect(sub).toEqual({ estado: 'active', plan: 'mensual' });
      expect(global.supabase.from).toHaveBeenCalledWith('suscripciones');
      expect(global.supabase.eq).toHaveBeenCalledWith('usuario_id', 'user-1');
    });

    test('returns null and does not throw when supabase errors', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: null, error: new Error('boom') });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const sub = await ent.getSuscripcion();
      expect(sub).toBeNull();
    });

    test('caches the result and does not re-query on the second call', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'active' }, error: null });

      await ent.getSuscripcion();
      await ent.getSuscripcion();
      expect(global.supabase.from).toHaveBeenCalledTimes(1);
    });

    test('forceRefresh bypasses the cache', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'active' }, error: null });

      await ent.getSuscripcion();
      await ent.getSuscripcion(true);
      expect(global.supabase.from).toHaveBeenCalledTimes(2);
    });
  });

  describe('isPremium', () => {
    test.each(['active', 'on_trial'])('returns true for estado=%s', async (estado) => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado }, error: null });
      expect(await ent.isPremium()).toBe(true);
    });

    test.each(['cancelled', 'expired', 'past_due'])('returns false for estado=%s', async (estado) => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado }, error: null });
      expect(await ent.isPremium()).toBe(false);
    });

    test('returns false when there is no subscription row', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: null, error: null });
      expect(await ent.isPremium()).toBe(false);
    });
  });

  describe('checkoutUrl', () => {
    test('builds the monthly checkout URL by default, with user id and email', async () => {
      global.auth = makeAuthMock({ id: 'user-1', email: 'a@b.com' });

      const url = await ent.checkoutUrl();
      expect(url).toContain('/checkout/buy/');
      expect(url).toContain('REEMPLAZAR_VARIANT_ID_MENSUAL');
      expect(decodeURIComponent(url)).toContain('checkout[custom][usuario_id]=user-1');
      expect(decodeURIComponent(url)).toContain('checkout[email]=a@b.com');
    });

    test('builds the annual checkout URL when plan="anual"', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });

      const url = await ent.checkoutUrl('anual');
      expect(url).toContain('REEMPLAZAR_VARIANT_ID_ANUAL');
    });

    test('omits custom params when there is no logged-in user', async () => {
      global.auth = makeAuthMock(null);

      const url = await ent.checkoutUrl();
      expect(url).not.toContain('usuario_id');
      expect(url).not.toContain('checkout%5Bemail%5D');
    });
  });

  describe('gate', () => {
    test('returns true and leaves the DOM untouched when the user is premium', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'active' }, error: null });
      document.body.innerHTML = '<div id="feature"></div>';

      const result = await ent.gate('feature', 'Progreso');
      expect(result).toBe(true);
      expect(document.getElementById('feature').style.filter).toBe('');
    });

    test('blurs the element and inserts an upsell banner when not premium', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'cancelled' }, error: null });
      document.body.innerHTML = '<div id="feature"></div>';

      const result = await ent.gate('feature', 'Progreso');
      expect(result).toBe(false);
      const el = document.getElementById('feature');
      expect(el.style.filter).toBe('blur(3px)');
      expect(el.style.pointerEvents).toBe('none');
      expect(document.body.textContent).toContain('Progreso es una función Premium');
      expect(document.querySelector('a[href="/app/perfil"]')).not.toBeNull();
    });

    test('returns false without throwing when the target element does not exist', async () => {
      global.auth = makeAuthMock({ id: 'user-1' });
      global.supabase = makeSupabaseMock({ data: { estado: 'cancelled' }, error: null });

      const result = await ent.gate('missing-el', 'Progreso');
      expect(result).toBe(false);
    });
  });
});
