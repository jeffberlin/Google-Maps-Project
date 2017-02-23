var ko = require("knockout")

var styles = require('./styles').styles

   function AppViewModel() {
         this.header = ko.observable("Search For Location");
         this.parks = ko.observable("Local Parks:");

     }
     ko.applyBindings(new AppViewModel());

     var map;
     var markers = [];
     var infowindow;

     function initMap() {

       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 34.2257, lng: -77.9447},
         zoom: 13,
         styles: styles,
         mapTypeConrtol: false
       });

       var parks = [
         {title: 'Robert Strange Park', location: {lat: 34.230745, lng: -77.937444}},
         {title: 'Claude Howell Park', location: {lat: 34.232732, lng: -77.949375}},
         {title: 'Hugh McRae Park', location: {lat: 34.208258, lng: -77.879051}},
         {title: 'Portia Hines Park', location: {lat: 34.240406, lng: -77.936905}},
         {title: 'Greenfield Park', location: {lat: 34.214281, lng: -77.944126}},
         {title: 'Empire Park', location: {lat: 34.220848, lng: -77.902875}},
         {title: 'Maides Park', location: {lat: 34.249825, lng: -77.901473}},
         {title: 'Story Park', location: {lat: 34.238018, lng: -77.946599}}
       ];

       var infowindow = new google.maps.InfoWindow();

       for (var i = 0; i < parks.length; i++) {
         var position = parks[i].location;
         var title = parks[i].title;
         var marker = new google.maps.Marker({
           position: position,
           title: title,
           map: map,
           id: i
         });
         markers.push(marker);
         marker.addListener('click', function() {
           infowindow.setContent(this.title);
           infowindow.open(map, this);
           infowindow.setPosition(this.position);

         })
       }

       document.getElementById('show-parks').addEventListener('click', showMarkers);

       document.getElementById('hide-parks').addEventListener('click', function() {
         hideMarkers(markers);
       });

       function showMarkers() {
         var bounds = new google.maps.LatLngBounds();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(map);
           bounds.extend(markers[i].position);
         }
         map.fitBounds(bounds);
       }

       function hideMarkers(markers) {
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
       }

       // APPEND NEARBY:

       // var service = new google.maps.places.PlacesService(map);
       // service.nearbySearch({
       //   location: wilm, // <-- NEED SOMETHING FOR LOCATION
       //   radius: 3218.69,
       //   types: ['park'],
       //   // results: ['food']
       // }, callback);
       //
       // function callback(results, status) {
       //   if (status == google.maps.places.PlacesServiceStatus.OK) {
       //     for (var i = 0; i < results.length; i++) {
       //       var place = results[i];
       //       createMarker(results[i]);
       //     }
       //   }
       // }
       //
       // function createMarker(place) {
       //   var placeLoc = place.geometry.location;
       //   var marker = new google.maps.Marker({
       //     map: map,
       //     position: place.geometry.location
       //   });
       //
       //   marker.addListener(marker, 'click', function() {
       //     infowindow.setContent(place.name);
       //     infowindow.open(map, marker);
       //   });
       // }

       // AUTOCOMPLETE:

       var input = document.getElementById('pac-input');
       var card = document.getElementById('container');
       var autocomplete = new google.maps.places.Autocomplete(input);

       autocomplete.bindTo('bounds', map);
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
         infowindow.setContent(infowindowContent);
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

       // STREETVIEW:

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