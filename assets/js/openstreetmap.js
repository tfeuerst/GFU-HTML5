/**
* An openStreet MAP Example
*/

!(function() {
  'use strict';
  // declaration
  let init = null;
  // methods
  init = function (){
    let
      map = new OpenLayers.Map("basicMap"),
      mapnik = new OpenLayers.Layer.OSM(),
      markers = undefined;

      map.addLayer(mapnik);

      // get current getCurrentPosition
      navigator.geolocation.getCurrentPosition(function(position) {
        let
          lonLat = new OpenLayers
          .LonLat(position.coords.longitude, position.coords.latitude)
          .transform(
            new OpenLayers.Projection('EPSG:4326'), // projection
            map.getProjectionObject() // to mercator
          );
          // set marker
          markers.addMarker(new OpenLayers.Marker(lonLat));
          map.setCenter(lonLat, 10);
      });

      map
        .setCenter(new OpenLayers.LonLat(3,3)
        .transform(
          new OpenLayers.Projection("EPSG:4326"),
          new OpenLayers.Projection("EPSG:900913")
        ),
        10);
        markers = new OpenLayers.Layer.Markers('Markers');
        map.addLayer(markers)
      };
  // event-control
  window.addEventListener('load', init);
}());
