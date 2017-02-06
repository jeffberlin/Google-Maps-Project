require('knockout')

var styles = require('./styles').styles

 //function AppViewModel() {

      var map;

      var markers = [];

      var placeMarkers = [];

      //var wilm = { lat: 34.2257, lng: -77.9447 };

      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          //center: wilm, //{lat: 34.2257, lng: -77.9447},
          zoom: 14,
          styles: styles,
          mapTypeConrtol: false
        });

        var infoWindow = new google.maps.InfoWindow({map: map});

        // geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

              infoWindow.setPosition(pos);
              infoWindow.setContent('YOU ARE HERE');
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
    
    }
    window.initMap = initMap
        //model
      //   var Location = function(data) {
      //     var self = this;
      //     self.title = data.title;
      //     self.location = data.location;
      //     self.id = data.id;
      //     self.show = ko.observable(true);
      //   };
      

//view model
        