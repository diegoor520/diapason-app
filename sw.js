/* =====================================================================
   DIAPASÓN · SERVICE WORKER
   Guarda la app en el dispositivo para que funcione sin conexión.
   Solo se usa cuando la app se sirve por http(s) (p. ej. GitHub Pages);
   si abres index.html directamente desde el archivo, no interviene.

   ⚠️ Cada vez que cambies cualquier archivo de la app, sube VERSION
   (y APP_VERSION en index.html): así los móviles detectan la nueva
   versión y muestran el aviso "Nueva versión disponible".
   ===================================================================== */
const VERSION = '1.1.0';
const CACHE = 'diapason-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

/* Instalación: descarga y guarda todos los archivos de esta versión */
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
  // no se activa sola: espera a que la app pida actualizar (botón "Actualizar")
});

/* La página pide activar la versión nueva */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* Activación: borra las cachés de versiones anteriores */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('diapason-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Peticiones: primero la caché (offline); si no está, la red, y se guarda para la próxima vez */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // cualquier navegación dentro de la app abre index.html (ignora ?parámetros y #anclas)
    e.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
