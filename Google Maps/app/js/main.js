var ko = require("knockout")

var styles = require('./styles').styles

   function AppViewModel() {
         this.header = ko.observable("Search For Location");
         this.local = ko.observable("Local Coffee Shops:");

         var self = this;
         self.shops = ko.observableArray([
          'Port City Java',
          'Starbucks',
          '24 South Coffee House',
          'Karen\'s Cafe',
          'Luna Caffè',
          'Folks on Fourth',
          'Folks Cafe',
          'Zola Coffee & Tea',
          'Grinders Caffè',
          'Daily Grind',
          'Addicted to the Bean',
          'Bitty & Beau\'s Coffee',
          'Lucky Joe Craft Coffee',
          'Java Dog Coffee House',
          'Morning Glory Coffeehouse',
          'Bespoke Coffee & Dry Goods',
          'Brick + Mortar Coffee and Supply'
          ]);
         self.showPlace = function() {
          self.shops.infowindow.open(map, marker)
         }

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

       var coffeeShops = [
         {title: 'Port City Java', location: {lat: 34.235912, lng: -77.948826}},
         {title: 'Port City Java', location: {lat: 34.238930, lng: -77.949028}},
         {title: 'Port City Java', location: {lat: 34.237872, lng: -77.921174}},
         {title: 'Port City Java', location: {lat: 34.201974, lng: -77.922590}},
         {title: 'Port City Java', location: {lat: 34.242096, lng: -77.863673}},
         {title: 'Port City Java', location: {lat: 34.194293, lng: -77.910822}},
         {title: 'Starbucks', location: {lat: 34.216803, lng: -77.906956}},
         {title: 'Starbucks', location: {lat: 34.242066, lng: -77.828570}},
         {title: 'Starbucks', location: {lat: 34.196443, lng: -77.890236}},
         {title: 'Bespke Coffee & Dry Goods', location: {lat: 34.236453, lng: -77.947403}},
         {title: '24 South Coffee House', location: {lat: 34.234496, lng: -77.948725}},
         {title: 'Karen\'s Cafe', location: {lat: 34.238730, lng: -77.948981}},
         {title: 'Java Dog Coffee House', location: {lat: 34.239104, lng: -77.949228}},
         {title: 'Folks on Fourth', location: {lat: 34.243700, lng: -77.945501}},
         {title: 'Brick + Mortar Coffee and Supply', location: {lat: 34.247251, lng: -77.946280}},
         {title: 'Folks Cafe', location: {lat: 34.237704, lng: -77.934188}},
         {title: 'Luna Caffè', location: {lat: 34.228263, lng: -77.940812}},
         {title: 'Morning Glory Coffeehouse', location: {lat: 34.225831, lng: -77.929120}},
         {title: 'Zola Coffee & Tea', location: {lat: 34.213228, lng: -77.887951}},
         {title: 'Addicted to the Bean', location: {lat: 34.213678, lng: -77.886954}},
         {title: 'Grinders Caffè', location: {lat: 34.212560, lng: -77.871677}},
         {title: 'Daily Grind', location: {lat: 34.241911, lng: -77.867955}},
         {title: 'Bitty & Beau\'s Coffee', location: {lat: 34.242041, lng: -77.877485}},
         {title: 'Lucky Joe Craft Coffee', location: {lat: 34.266057, lng: -77.837758}}
       ];

       var infowindow = new google.maps.InfoWindow();

       for (var i = 0; i < coffeeShops.length; i++) {
         var position = coffeeShops[i].location;
         var title = coffeeShops[i].title;
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

       document.getElementById('show-shops').addEventListener('click', showMarkers);

       document.getElementById('hide-shops').addEventListener('click', function() {
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