// sw.js - DESHABILITADO TEMPORALMENTE
// Para habilitarlo, descomenta las líneas

// Por ahora, solo registramos que el SW existe pero no hacemos nada
console.log('[SW] Service Worker deshabilitado temporalmente');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// fetch handler eliminado — el no-op causaba overhead en navegación
