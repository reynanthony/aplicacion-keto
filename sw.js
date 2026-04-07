// sw.js - DESHABILITADO TEMPORALMENTE
// Para habilitarlo, descomenta las líneas

// Por ahora, solo registramos que el SW existe pero no hacemos nada
console.log('[SW] Service Worker deshabilitado temporalmente');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', event => {
  // No interceptar ninguna petición - dejar pasar todo
});
