/**
* A Service Worker
*/

// IIFE
!(function () {
    'use strict';
    // declaration
    const CACHE_NAME = 'my-site-cache-v2';

    let
      urlsToCache = [
        '/',
        'index.html',
        'script.js',
        'service-worker.js'
      ];
    // methods
    function onServiceWorkerInstall(event) {
        console.log('service worker install');

        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(function (cache) {
              return cache.addAll(urlsToCache)
            })
        );
    }
    function onServiceWorkerActivate(event) {
        console.log('service worker activate');

        // update caches, delete old ones, etc ...
        let cacheWhiteList = [CACHE_NAME, 'my-blog-cache-v3'];

        event.waitUntil(
          caches
            .keys()
            .then(function (cacheNames) {
              // delete al entries not in white list
              return Promise.all(
                cacheNames.map(function (cacheName) {
                  if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName);
                  }
                })
              )
          })
        )
    }
    function onFetch(event) {
        console.log('service worker fetching');

        event.respondWith(
          caches
            .match(event.request)
            .then(function (response) {
              if(response){
                return response;
              }
              return fetch(event.request);
            })
        )
    }

    // event-control
    self.addEventListener('install', onServiceWorkerInstall);
    self.addEventListener('activate', onServiceWorkerActivate);

    self.addEventListener('fetch', onFetch);
}());
