
// cache individual pages
const cacheName = 'v1';
const cacheAssets = [
    '../index.html',
    '../main.js',
    '../js/main.js'
];

//  call install event
self.addEventListener('install', e => {
    console.log(`ServiceWorker: Installed`);

    e.waitUntil(
        caches
         .open(cache.Name)
         .then(cache => {
             console.log(`Service Worker: Caching Files`);
             cache.addAll(cacheAssets);
         })
         .then(() => self.skipWaiting())
    );
});

//  call Activate Event
self.addEventListener('activate', e => {
    console.log(`Service Worker: Activated `);
    // remove unwanted caches
    e.waitUntil(
        caches.keys.then(cacheNames => {
            return Promise.all(
                cacheNames.map(cahce => {
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
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})