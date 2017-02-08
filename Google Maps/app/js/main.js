require('knockout')

var styles = require('./styles').styles

 //function AppViewModel() {

      var map;
      var markers = [];
      var infowindow;
      var service;

      var wilm = { lat: 34.2257, lng: -77.9447 };

      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          //center: wilm, {lat: 34.2257, lng: -77.9447},
          zoom: 14,
          styles: styles,
          //mapTypeConrtol: false
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

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Please enable Google to access your location.');
        }

        // APPEND NEARBY Night Clubs and Bars (5 mile radius):
        
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: wilm, // <-- NEED SOMETHING FOR LOCATION
          radius: 3218.69,
          types: ['night_club', 'bar', 'meal_takeaway', 'meal_delivery', 'cafe', 'restaurant'],
          results: ['food']
        }, callback);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              createMarker(results[i]);
            }
          }
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }

        // AUTOCOMPLETE:

        var input = document.getElementById('pac-input');
        var card = document.getElementById('container');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);



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
            map.setZoom(15);
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

        var icon = {
          // url: place.icon,
          size: new google.maps.Size(35, 35),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
          map: map,
          //icon: icon,
          animation: google.maps.Animation.DROP,
          anchorPoint: new google.maps.Point(0, -29)
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
        