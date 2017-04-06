var ko = require('knockout');

var styles = require('./styles').styles;

function AppViewModel() {
  this.header = ko.observable("Wilmington's Top Breweries");

  // List of coffee shops to select
  var self = this;
  self.shops = ko.observableArray([{
      title: "Front Street Brewery",
      locations: [{
          location: {
            lat: 34.235740679540505,
            lng: -77.94877022724364
          },
          foursquareId: '4b44d7daf964a520e3fd25e3'
        },
      ],
      showListing: ko.observable(true)
    },
    {
      title: "Wilmington Brewing Co.",
      locations: [{
          location: {
            lat: 34.22136150569059,
            lng: -77.8866036482147
          },
          foursquareId: '53cef136498edd62f5f091fd'
        },
      ],
      showListing: ko.observable(true)
    },
    {
      title: "Flytrap Brewing",
      locations: [{
        location: {
          lat: 34.24033086673391,
          lng: -77.94535875320435
        },
        foursquareId: '529e9bf311d266d68f5626c1'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Waterline Brewing Co.",
      locations: [{
        location: {
          lat: 34.22557767994479,
          lng: -77.9486084684903
        },
        foursquareId: '55f70a5f498e324dc4109320'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Broomtail Craft Brewery",
      locations: [{
        location: {
          lat: 34.25873666153001,
          lng: -77.84888581241525
        },
        foursquareId: '536e6958498ea2c77d5524d1'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Ironclad Brewery",
      locations: [{
        location: {
          lat: 34.23700035437736,
          lng: -77.94772982597351
        },
        foursquareId: '53dbd858498e33be781da324'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Prestige Brewing",
       locations: [{
        location: {
          lat: 34.2285269,
          lng: -77.94180949999998
        },
        foursquareId: '589ff18abbec664e9ec4cc33'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Bill\'s Front Porch",
      locations: [{
        location: {
          lat: 34.242523,
          lng: -77.89038
        },
        foursquareId: '57771d18498e0572191a418e'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "New Anthem Brewing",
      locations: [{
        location: {
          lat: 34.234121,
          lng: -77.947813
        },
        foursquareId: '5802c2a838fa4fc40ee7a5f2'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Wrightsville Beach Brewery",
      locations: [{
        location: {
          lat: 34.21091491606973,
          lng: -77.83721208572388
        },
        foursquareId: '587c099c469aef4ebffcb066'
      }],
      showListing: ko.observable(true)
    },
    {
      title: "Good Hops Brewing",
      locations: [{
        location: {
           lat: 34.04202182516429,
           lng: -77.9048410762307
        },
        foursquareId: '5363bcde498e17304bd2234b'
      }],
      showListing: ko.observable(true)
    }
  ]);

  // Appends the markers to the map with working infowindow
  this.google = ko.observable(false);
  this.google.subscribe(function(isLoadingFinished) {
    if (isLoadingFinished) {
      console.log("Google maps has finished loading");
      for (var i = 0; i < self.shops().length; i++) {
        var shop = self.shops()[i];
        shop.locations.forEach(function(location) {
          var marker = new google.maps.Marker({
            position: location.location,
            title: shop.title,
            animation: google.maps.Animation.DROP,
            map: map,
            id: location.foursquareId
          });
          location.marker = marker;
          shop.marker = marker;
          bounds.extend(marker.position);
          marker.addListener('click', function() {
            toggleBounce(marker);
            //Centers the map to the clicked marker
            window.setTimeout(function() {
              map.panTo(marker.getPosition());
            });
            populateInfoWindow(this, largeInfowindow);
          });
        });
      }
      map.fitBounds(bounds);
      console.log(self.shops());
    }
  });
  
  this.search = ko.observable('');

  //Makes the shops list clickable
  this.listItemClick = function(shop) {
    google.maps.event.trigger(shop.marker, 'click');
    console.log(shop);
  };

  this.resetMap = function() {
    location.reload();
  };

  var map, largeInfowindow;
  var bounds;
  var markers = [];

  function initMap() {

    self.infowindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 34.2257,
        lng: -77.9447
      },
      zoom: 12,
      styles: styles,
      mapTypeConrtol: false
    });

    appViewModel.google(true);

    //Keep the map centered on window resizing
    google.maps.event.addDomListener(window, 'resize', function() {
      map.fitBounds(bounds);
    });

    this.searchFunction = ko.computed(function() {
      var filterInput = self.search().toLowerCase();
      self.shops().forEach(function(shop) {
        if (shop.title.toLowerCase().indexOf(filterInput) !== -1) {
          // show the location
          shop.showListing(true);
          // show the location's markers
          shop.locations.forEach(function(shopLocation) {
            shopLocation.marker.setVisible(true);
            return true;
          });
        } else {
          // hide the location
          shop.showListing(false);
          // hide the location's markers
          shop.locations.forEach(function(shopLocation) {
            shopLocation.marker.setVisible(false);
            return false;
          });
        }
      });
    });

    //Setting up Foursquare for infowindow
    var CLIENT_ID = '4TGGE0PWAWXOLLGK4LWQF4C1ZO3UPPR4IIK5U24QOCG0ISIQ';
    var CLIENT_SECRET = 'ZNHCHPVS0NEE0Q1X1LQA5PNE2ERHRMTAF04X2RCP1CAXRJTB';
    var VERSION = '20170101';

    //Populate the infowindow with Foursquare
    this.populateInfoWindow = function(marker, infowindow) {
      
      var url = 'https://api.foursquare.com/v2/venues/' + marker.id;
      
        $.ajax({
          url: url,
          dataType: 'json',
          data: {
            id: location.foursquareId,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: VERSION,
            async: true
          },
          success: function(data) {
            var venue = data.response.venue.name;
            var address = data.response.venue.location.address ? data.response.venue.location.address : " ";
            var city = data.response.venue.location.city ? data.response.venue.location.city : " ";
            var state = data.response.venue.location.state ? data.response.venue.location.state : " ";
            var zipCode = data.response.venue.location.postalCode ? data.response.venue.location.postalCode : " ";
            var phone = data.response.venue.contact.formattedPhone ? data.response.venue.contact.formattedPhone : " ";

            self.infowindow.setContent('<div>' + '<b>' + venue + '</b>' + '</div>' + '<div>' + address + '</div>' + '<div>' + city + ', ' + state + ' ' + zipCode + '<div>' + phone);
            self.infowindow.open(map, marker);
            console.log(data);
          }
        }).fail(function (e) {
          self.infowindow.setContent('<div><h4>Well this is embarrassing...</h4></div>' + '<div><h4>Foursquare could not be loaded.</h4></div>');
          self.infowindow.open(map, marker);
        });
    };

    //Bounces the marker when the marker is clicked
    this.toggleBounce = function(marker) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 1400);
      }
    };

  }
  window.initMap = initMap;

}
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);