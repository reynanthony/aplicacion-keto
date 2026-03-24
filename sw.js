// sw.js - Service Worker para KetoLab
// Versión: v1.0.1
// Estrategia: Cache First con actualización en background (Stale-While-Revalidate)

const CACHE_NAME = 'ketolab-v1.0.1';
const STATIC_CACHE = 'ketolab-static-v1.0.1';
const DYNAMIC_CACHE = 'ketolab-dynamic-v1.0.1';

// Archivos estáticos a cachear durante la instalación
const STATIC_ASSETS = [
  '/aplicacion-keto/',
  '/aplicacion-keto/index.html',
  '/aplicacion-keto/alimentos.html',
  '/aplicacion-keto/compras.html',
  '/aplicacion-keto/macros.html',
  '/aplicacion-keto/plan.html',
  '/aplicacion-keto/recetas.html',
  '/aplicacion-keto/checklist.html',
  '/aplicacion-keto/entrenamientos.html',
  '/aplicacion-keto/compras.js',
  '/aplicacion-keto/manifest.json',
  '/aplicacion-keto/offline.html',
  '/aplicacion-keto/utils.js',
  '/aplicacion-keto/food-api.js',
  '/aplicacion-keto/backup.js',
  '/aplicacion-keto/recipe-suggestions.js'
];

// ==================== INSTALACIÓN ====================
self.addEventListener('install', event => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Cacheando archivos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Instalación completada');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Error en instalación:', error);
      })
  );
});

// ==================== ACTIVACIÓN ====================
self.addEventListener('activate', event => {
  console.log('[SW] Activando Service Worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Limpiar caches antiguos
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] Activación completada');
      return self.clients.claim();
    })
  );
});

// ==================== ESTRATEGIA DE FETCH ====================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // ========== EXCEPCIONES ==========
  // No cachear peticiones a APIs externas (CDN, fonts, etc)
  if (url.hostname.includes('cdn.') || 
      url.hostname.includes('fonts.') ||
      url.hostname.includes('api.') || 
      url.pathname.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // ========== ESTRATEGIA: Stale-While-Revalidate ==========
  // Para archivos estáticos y recursos de la app
  if (STATIC_ASSETS.some(asset => event.request.url.includes(asset)) || 
      event.request.destination === 'document' ||
      event.request.destination === 'script' ||
      event.request.destination === 'style') {
    
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Actualizar cache con la respuesta de red
              if (networkResponse && networkResponse.status === 200) {
                caches.open(STATIC_CACHE).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
              return networkResponse.clone();
            })
            .catch(error => {
              console.log('[SW] Error de red para:', event.request.url);
              return null;
            });
          
          // Devolver cache si existe, sino esperar respuesta de red
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetchPromise;
        })
        .catch(() => {
          // Fallback offline para páginas HTML
          if (event.request.destination === 'document') {
            return caches.match('/aplicacion-keto/offline.html');
          }
          return new Response('Recurso no disponible offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
    );
    return;
  }
  
  // ========== ESTRATEGIA: Network First ==========
  // Para datos dinámicos (aunque localStorage maneja esto localmente)
  // En KetoLab, la mayoría de los datos están en localStorage,
  // por lo que esta estrategia es para imágenes y recursos externos
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Cachear recursos externos exitosos
        if (networkResponse && networkResponse.status === 200 && 
            (event.request.destination === 'image' || 
             event.request.destination === 'font')) {
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// ==================== MENSAJES ====================
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(STATIC_CACHE);
    caches.delete(DYNAMIC_CACHE);
    console.log('[SW] Caches limpiados');
  }
});

// ==================== NOTIFICACIONES PUSH ====================
// Preparado para futuras implementaciones de notificaciones push
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Actualiza tus macros y hábitos diarios',
      icon: '/aplicacion-keto/icons/icon-192x192.png',
      badge: '/aplicacion-keto/icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/aplicacion-keto/'
      }
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'KetoLab', options)
    );
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});
