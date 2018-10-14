var CACHE_NAME = 'iamgique-cache-v1';
var urlsToCache = [
  '/',
  '/assets/style/bootstrap.css',
  '/assets/images/bigbears.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['iamgique-cache-v1', 'other-cache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log("Cache hit - return response");
        console.log(response);
        if (response) {
          return response;
        }
        console.log(event.request);
        return fetch(event.request);
      }
    )
  );
});