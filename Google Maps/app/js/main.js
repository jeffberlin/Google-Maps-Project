require('knockout')

var styles = require('./styles').styles

 //function AppViewModel() {

      var map;
      var markers = [];
      var infowindow;

      //var wilm = { lat: 34.2257, lng: -77.9447 };

      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          //center: wilm, //{lat: 34.2257, lng: -77.9447},
          zoom: 11,
          styles: styles,
          mapTypeConrtol: false
        });

        // GEOLOCATION:

        var infoWindow = new google.maps.InfoWindow({map: map});
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('YOU ARE HERE!');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          })
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationErro(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Please enable Google to access your location.');
        }

        // AUTOCOMPLETE:

        var input = document.getElementById('pac-input');
        var card = document.getElementById('container');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);

        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          // present on map if place has geometry
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });

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
        