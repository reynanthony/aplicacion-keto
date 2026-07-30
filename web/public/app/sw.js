/* KetoCore Service Worker — v3 (rediseño Editorial Bento)
 * Estrategia:
 *  - Al activarse PURGA todos los cachés de versiones anteriores
 *    (incluye los del SW cacheador antiguo que dejaba la app congelada).
 *  - Navegaciones (HTML): network-first → siempre la última versión publicada;
 *    fallback a la página offline sin conexión.
 *  - Assets (/app/, /_astro/): stale-while-revalidate.
 */
const VERSION = 'ketocore-v4';
const OFFLINE_URL = '/app/offline/';

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

  // HTML: siempre de red (la app nunca se queda en una versión vieja)
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (e) {
        const cached = await caches.match(OFFLINE_URL);
        return cached || Response.error();
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
