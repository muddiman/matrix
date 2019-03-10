
const cacheName = 'v2';

//  call install event
self.addEventListener('install', e => {
    console.log(`ServiceWorker: Installed`);
});

//  call Activate Event
self.addEventListener('activate', e => {
    console.log(`Service Worker: Activated `);
    // remove unwanted caches
    e.waitUntil(
        caches.keys.then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log(`Service Worker: Clearing old cache`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
//  Call fetch Event
self.addEventListener('fetch', e => {
    console.log(`Service Worker: Fetching`);
    e.respondWith(
        fetch(e.request)
          .then(res => {
              // clone response
              const resClone = res.clone();
              // open cache
              caches  
                .open(cacheName)
                .then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
            return res;

          }).catch(err => caches.match(e.request).then(res => res))
    );
});