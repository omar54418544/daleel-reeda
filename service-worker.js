const CACHE_NAME = 'reeda-guide-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/add-service.html',
  '/admin.html',
  '/schools.html',
  '/primary-school.html',
  '/prep-school.html',
  '/secondary-school.html',
  '/quran.html',
  '/agriculture.html',
  '/health.html',
  '/council.html',
  '/images/1.webp',
  '/images/schools-section.webp',
  '/images/quran-section.webp',
  '/images/primary-school.webp',
  '/images/prep-school.webp',
  '/images/secondary-school.webp',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
