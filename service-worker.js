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

self.addEventListener('push', function(e) {
  var options = {
    body: 'Here is a notification body!',
    icon: '/assets/images/bigbears.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: '/assets/images/bigbears.png'},
      {action: 'close', title: 'Close notification',
        icon: '/assets/images/bigbears.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello Notification!', options)
  );
});