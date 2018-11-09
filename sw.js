// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
var cacheStorageKey = 'minimal-pwa-1'
var cacheList = [
    '/',
    'index.html',
    'github.png'
]
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
    )
}) 
self.addEventListener('activate', function(e){
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheNames => {
                    return cacheNames !== cacheStorageKey
                }).map(cacheNames => {
                    return caches.delete(cacheNames)
                })
            )
        }).then(() => {
            return self.clients.claim()
        })
    )
})
