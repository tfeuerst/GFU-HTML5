/**
* Geolocation Example
*/
// IIFE
!(function () {
    'use strict';
    // declaration
    let
      outputLat = document.querySelector('#latitude'),
      outputLon = document.querySelector('#longitude');
    // methods
    function onWindowLoad(){
      console.dir(navigator.geolocation);

      navigator.geolocation.getCurrentPosition(function(position){
        50.9252423,
        outputLat.innerHTML = "Latitude: " + position.coords.latitude;
        outputLon.innerHTML = "Longitude: " + position.coords.longitude;
      })
    }
    // event-control
    window.addEventListener('load', onWindowLoad);
}());
