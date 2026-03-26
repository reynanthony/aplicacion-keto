// sw.js - Service Worker para KetoLab
// Versión: v1.0.4
// Estrategia: Cache First con actualización en background (Stale-While-Revalidate)

const CACHE_NAME = 'ketolab-v1.0.4';
const STATIC_CACHE = 'ketolab-static-v1.0.4';
const DYNAMIC_CACHE = 'ketolab-dynamic-v1.0.4';

// Archivos estáticos a cachear durante la instalación
const STATIC_ASSETS = [
  './',
  './index.html',
  './alimentos.html',
  './compras.html',
  './macros.html',
  './plan.html',
  './recetas.html',
  './checklist.html',
  './entrenamientos.html',
  './perfil.html',
  './suplementos.html',
  './onboarding.html',
  './scanner.html',
  './compras.js',
  './manifest.json',
  './offline.html',
  './utils.js',
  './food-api.js',
  './backup.js',
  './recipe-suggestions.js',
  './modules/auto-meal-generator.js',
  './modules/auto-workout-generator.js',
  './modules/supplement-recommender.js',
  './styles/animations.css',
  './styles/mobile-enhancements.css',
  './utils/touch-gestures.js',
  // Imágenes de recetas
  './images/recipes/pure-coliflor.svg',
  './images/recipes/hongos.svg',
  './images/recipes/pollo-jugoso.svg',
  './images/recipes/carne-molida.svg',
  './images/recipes/huevos.svg',
  './images/recipes/arroz-coliflor.svg',
  './images/recipes/aderezo.svg',
  // Imágenes de ejercicios
  './images/exercises/pecho.svg',
  './images/exercises/espalda.svg',
  './images/exercises/piernas.svg'
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
  // No cachear peticiones a APIs externas (CDN, fonts, GitHub Pages, etc)
  const hostname = url.hostname;
  if (hostname.includes('cdn.') || 
      hostname.includes('fonts.') ||
      hostname.includes('api.') ||
      hostname.includes('github.') ||
      hostname.includes('github.io') || 
      url.pathname.includes('/api/')) {
    return; // No hacer nada, dejar que el navegador maneje la solicitud normalmente
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
                caches.open(STATIC_CACHE).then(function(cache) {
                  try {
                    cache.put(event.request, networkResponse.clone());
                  } catch(e) {
                    console.log('[SW] Static cache put error:', e.message);
                  }
                });
              }
              return networkResponse.clone();
            })
            .catch(error => {
              // Error de red esperado en algunas configuraciones - no es crítico
              // console.log('[SW] Error de red para:', event.request.url);
              // Devolver cache o página offline si falla
              if (cachedResponse) {
                return cachedResponse;
              }
              if (event.request.destination === 'document') {
                return caches.match('./offline.html');
              }
              return new Response('Recurso no disponible', { status: 503 });
            });
          
          // Devolver cache si existe, sino esperar respuesta de red
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetchPromise.then(function(response) {
            if (response) return response;
            // Si todo falla, devolver offline
            if (event.request.destination === 'document') {
              return caches.match('./offline.html');
            }
            return new Response('No disponible', { status: 503 });
          });
        })
        .catch(() => {
          // Fallback offline para páginas HTML
          if (event.request.destination === 'document') {
            return caches.match('./offline.html');
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
        // Cachear recursos externos exitosos (solo URLs válidas)
        if (networkResponse && networkResponse.status === 200) {
          var url = event.request.url;
          // Solo cachear si es http/https y es imagen o fuente
          if (url.startsWith('http') && (url.includes('/icons/') || url.includes('.png') || url.includes('.jpg') || url.includes('.svg') || url.includes('.woff') || url.includes('.ttf'))) {
            var clonedResponse = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then(function(cache) {
              try {
                cache.put(event.request, clonedResponse);
              } catch(e) {
                console.log('[SW] Cache put error:', e.message);
              }
            });
          }
        }
        return networkResponse;
      })
      .catch(function() {
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
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || './'
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
