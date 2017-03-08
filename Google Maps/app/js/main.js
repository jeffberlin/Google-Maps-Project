var ko = require("knockout")

var styles = require('./styles').styles

   function AppViewModel() {
      this.header = ko.observable("Wilmington Coffee Shops");

      // List of coffee shops to select
      var self = this;
         self.shops = ko.observableArray([
          { title: 'Port City Java' },
          { title: 'Starbucks' },
          { title: 'Folks on Fourth' },
          { title: '24 South Coffee House' },
          { title: 'Karen\'s Cafe' },
          { title: 'Luna Caffè' },
          { title: 'Folks Cafe' },
          { title: 'Zola Coffee & Tea' },
          { title: 'Grinders Caffè' },
          { title: 'Daily Grind' },
          { title: 'Addicted to the Bean' },
          { title: 'Bitty & Beau\'s Coffee' },
          { title: 'Lucky Joe Craft Coffee' },
          { title: 'Java Dog Coffee House' },
          { title: 'Morning Glory Coffeehouse' },
          { title: 'Bespoke Coffee & Dry Goods' },
          { title: 'Brick + Mortar Coffee and Supply' }
        ]);

      var locations = [
        {title: 'Port City Java', location: {lat: 34.235912, lng: -77.948826}},
        {title: 'Port City Java', location: {lat: 34.238930, lng: -77.949028}},
        {title: 'Port City Java', location: {lat: 34.237872, lng: -77.921174}},
        {title: 'Port City Java', location: {lat: 34.201974, lng: -77.922590}},
        {title: 'Port City Java', location: {lat: 34.242096, lng: -77.863673}},
        {title: 'Port City Java', location: {lat: 34.194293, lng: -77.910822}},
        {title: 'Starbucks', location: {lat: 34.216803, lng: -77.906956}},
        {title: 'Starbucks', location: {lat: 34.242066, lng: -77.828570}},
        {title: 'Starbucks', location: {lat: 34.196443, lng: -77.890236}},
        {title: 'Bespoke Coffee & Dry Goods', location: {lat: 34.236453, lng: -77.947403}},
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
        
var map;
var markers = [];

    function initMap() {

       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 34.2257, lng: -77.9447},
         zoom: 13,
         styles: styles,
         mapTypeConrtol: false
       });  

       for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          map: map,
          id: i
        })
        markers.push(marker)
       }



  }
   window.initMap = initMap
   }
  ko.applyBindings(new AppViewModel());