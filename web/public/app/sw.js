/* KetoCore Service Worker — v5 (rediseño Editorial Bento)
 * Estrategia:
 *  - Al activarse PURGA todos los cachés de versiones anteriores
 *    (incluye los del SW cacheador antiguo que dejaba la app congelada).
 *  - Navegaciones (HTML): network-first con timeout corto → siempre la
 *    última versión publicada; si la red falla o tarda, cae a la copia
 *    cacheada de ESA MISMA pantalla (no a la de offline genérica) —
 *    esto es lo que hace que "atrás" siga funcionando con una red
 *    inestable en vez de mandar siempre a la pantalla de sin conexión.
 *    Solo si tampoco hay copia cacheada de esa pantalla se usa OFFLINE_URL.
 *  - Assets (/app/, /_astro/): stale-while-revalidate.
 */
const VERSION = 'ketocore-v5';
const OFFLINE_URL = '/app/offline/';
const NAV_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(VERSION);
      await cache.add(OFFLINE_URL);
    } catch (e) { /* offline page opcional */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML: red primero (con timeout), cachea cada pantalla visitada,
  // y si la red falla usa esa misma pantalla cacheada antes que "offline".
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), NAV_TIMEOUT_MS);
        const res = await fetch(req, { signal: controller.signal });
        clearTimeout(timer);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (e) {
        const cachedPage = await cache.match(req);
        if (cachedPage) return cachedPage;
        const offline = await cache.match(OFFLINE_URL);
        return offline || Response.error();
      }
    })());
    return;
  }

  // Assets: sirve caché y refresca en segundo plano
  if (url.pathname.startsWith('/app/') || url.pathname.startsWith('/_astro/')) {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      return cached || (await network) || Response.error();
    })());
  }
});
