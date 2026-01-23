const CACHE_NAME = 'otr-v1.0.0';
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/css/reset.min.css',
  '/css/variables.min.css',
  '/css/typography.css',
  '/css/layout.min.css',
  '/css/components.min.css',
  '/css/fonts.min.css',
  '/fonts/literata-regular.woff2',
  '/js/app.min.js',
  '/js/reader.min.js',
  '/js/navigation.min.js',
  '/data/chapters.js',
  '/assets/icons/OTR-header.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
