/**
* A Service Worker Script
*/

// register a service worker
if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('service-worker.js')

    .then(function (registration) {
      // register was successful
      console.log('register suceeded:', registration);
    })

    .catch(function (error) {
      // registration failed
      console.log('Service worker registration failed', error);
    })

} else {
  // ...
}
