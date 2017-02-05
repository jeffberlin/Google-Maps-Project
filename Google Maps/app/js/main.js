require('knockout')

var styles = require('./styles').styles

 //function AppViewModel() {

      var map;

      var markers = [];

      function initMap() {

        //var wilm = {lat: 34.2257, lng: -77.9447};

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.2257, lng: -77.9447},
          zoom: 10,
          styles: styles,
          //mapTypeConrtol: false
        });

        //model
      //   var Location = function(data) {
      //     var self = this;
      //     self.title = data.title;
      //     self.location = data.location;
      //     self.id = data.id;
      //     self.show = ko.observable(true);
      //   };
      

//view model
        
}
window.initMap = initMap