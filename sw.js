const upToDateCacheName = 'restaurant-reviews-v7';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(upToDateCacheName).then((cache) => {
      cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/css/styles.css',
        '/css/mediaQueries.css',
        '/data/restaurants.json',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.filter((cacheName) => cacheName != upToDateCacheName)
          .map((cacheName) => caches.delete(cacheName))
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
