require('knockout')

var styles = require('./styles').styles

 //function AppViewModel() {

      var map;

      var markers = [];

      var placeMarkers = [];

      var wilm = { lat: 34.2257, lng: -77.9447 };

      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: wilm, //{lat: 34.2257, lng: -77.9447},
          zoom: 10,
          styles: styles,
          mapTypeConrtol: false
        });

        function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
      function zoomToSearch() {
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var address = document.getElementById('pac-input').value;
        // Make sure the address isn't blank.
        if (address == '') {
          window.alert('You must enter an area, or address.');
        } else {
          // Geocode the address/area entered to get the center. Then, center the map on it and zoom in
          geocoder.geocode(
            { address: address,
              componentRestrictions: {none}
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            });
          }
        }
      
      
        // Create a searchbox in order to execute a places search
        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('pac-input'));
        // Bias the searchbox to within the bounds of the map.
        searchBox.setBounds(map.getBounds());
        // Listen for the event fired when the user selects a prediction from the
        // picklist and retrieve more details for that place.
        searchBox.addListener('places_changed', function() {
          searchBoxPlaces(this);
        });
        // Listen for the event fired when the user selects a prediction and clicks
        // "go" more details for that place.
//        document.getElementById('pac-input').addEventListener('click', textSearchPlaces);

        // This function fires when the user selects a searchbox picklist item.
      // It will do a nearby search using the selected query string or place.
      function searchBoxPlaces(searchBox) {
        hideMarkers(placeMarkers);
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          window.alert('We did not find any places matching that search!');
        } else {
        // For each place, get the icon, name and location.
          createMarkersForPlaces(places);
        }
      }
      // Listen for the event fired when the user selects a prediction from the
        // picklist and retrieve more details for that place.
        searchBox.addListener('places_changed', function() {
          searchBoxPlaces(this);
        });
      
        function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      // This function firest when the user select "go" on the places search.
      // It will do a nearby search using the entered query string or place.
      function textSearchPlaces() {
        var bounds = map.getBounds();
        hideMarkers(placeMarkers);
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query: document.getElementById('pac-input').value,
          bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarkersForPlaces(results);
          }
        });
      }

      // This function creates markers for each place found in either places search.
      function createMarkersForPlaces(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          map.fitBounds(bounds);
        }
      }  
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
        