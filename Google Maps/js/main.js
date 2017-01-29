 //function AppViewModel() {
 

// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {

        var styles = [
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#F67503'}
              ]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff'},
              { weight: 5 }
            ]
          },
          {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#1B63C0'}
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#27ACF9'}
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'labels.text.stroke',
            stylers: [
              {weight: 3}
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {color: '#FDDC06'}
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {color: '#ECDAA1'}
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {color: '#FEDD02'}
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {color: '#000000'},
              {weight: .5}
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.fill',
            stylers: [
              {color: '#D12E05'},
              {lightness: 30}
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {color: '#0598FA'},
              {saturation: 10 },
              {hue: -3},
              {lightness: -5}
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {color: '#ffffff'}
            ]
          },
          {
            featureType: 'poi.attraction',
            elementType: 'labels.text.fill',
            stylers: [
              {color: '#ffffff'}
            ]
          },
          {
            featureType: 'poi.attraction',
            elementType: 'labels.text.stroke',
            stylers: [
              {color: '#845A1A'},
              {weight: 2}
            ]
          },
          {
            featureType: 'poi.medical',
            elementType: 'labels.text.fill',
            stylers: [
              {color: '#F30101'}
            ]
          },
          {
            featureType: 'poi.medical',
            elementType: 'labels.text.stroke',
            stylers: [
              {color: '#ffffff'},
              {weight: 3}
            ]
          },
          {
            featureType: 'poi.school',
            elementType: 'labels.text.fill',
            stylers: [
              {color: '#805F04'}
            ]
          },
          {
            featureType: 'poi.school',
            elementType: 'labels.text.stroke',
            stylers: [
              {color: '#ffffff'},
              {weight: 3}
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.fill',
            stylers: [
              {color: '#ffffff'}
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.stroke',
            stylers: [
              {color: '#01B2FE'},
              {weight: 3},
              {lightness: -10}
            ]
          }
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.2257, lng: -77.9447},
          zoom: 10,
          styles: styles,
          mapTypeConrtol: false
        });

        var locations = [
          {title: 'Copper Penny', location: {lat: 34.237686, lng: -77.948403}},
          {title: 'Front Street Brewery', location: {lat: 34.235776, lng: -77.94891}},
          {title: "Havana's", location: {lat: 34.033937, lng: -77.894472}},
          {title: 'K38 Baja Grill', location: {lat: 34.207934, lng: -77.85955}},
          {title: 'K38 Baja Grill', location: {lat: 34.299806, lng: -77.791142}},
          {title: 'Tower 7 Baja Mexican Grill', location: {lat: 34.2082, lng: -77.79545}},
          {title: 'Las Olas', location: {lat: 34.236189, lng: -77.82798}},
          {title: 'Okami Japanese Steakhouse', location: {lat: 34.225136, lng: -77.881866}}
        ];

        //model
        var Location = function(data) {
          var self = this;
          self.title = data.title;
          self.location = data.location;
          self.id = data.id;
          self.show = ko.observable(true);
        };

//view model
        var ViewModel = function() {
          var self = this;
          self.locs = ko.observableArray(locations);
          self.query = ko.observable('');
          self.defaultLocations = ko.observableArray();
          self.mapErrorMessage = ko.observable(false);
          self.apiErrorMessage = ko.observable(false);

          for (var i = 0; i < locations.length; i++) {
            var loc = new Location(locations[i]);
            self.filteredLocations.push(loc);
          }
          self.defaultLocations = ko.computed(function() {
            var value = self.query();
            for (var i = 0; i < self.filteredLocations().length; i++) {
              if (self.filteredLocations()[i].title.toLowerCase().indexOf(value) >= 0) {
                self.filteredLocations()[i].show(true);
                if (self.filteredLocations()[i].marker) {
                  self.filteredLocations()[i].marker.setVisible(true);
                }
              } else {
                self.filteredLocations()[i].show(false);
                if (self.filteredLocations()[i].marker) {
                  self.filteredLocations()[i].marker.setVisible(false);
                }
              }
            }
          })
          self.showInfo = function(locations) {
            google.maps.event.trigger(locations.marker, 'click');
          };
        };

        var map;
        var markers = [];

        var largeInfowindow = new google.maps.InfoWindow();

        for (var i = 0; i < viewModel.filteredLocations().length; i++) {
          var locId = viewModel.filteredLocations()[i].id;
          var position = viewModel.filteredLocations()[i].location;
          var title = viewModel.filteredLocations()[i].title;
        //}

        for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
          viewModel.filteredLocations()[i].marker = marker;
          markers.push(marker);
        }

        function makeMarkerIcon(markerColor) {
          var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
            return markerImage;
        }

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
    }
      
      var viewModel = new ViewModel();
      ko.applyBindings(new ViewModel());