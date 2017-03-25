var ko = require("knockout")

var styles = require('./styles').styles

function AppViewModel() {
  this.header = ko.observable("Wilmington's Top Coffee Shops");

  // List of coffee shops to select
  var self = this;
  self.shops = ko.observableArray([{
      title: 'Port City Java',
      locations: [{
          location: {
            lat: 34.235833,
            lng: -77.94879074
          },
          foursquareId: '4b49080ff964a520d76226e3'
        },
        {
          location: {
            lat: 34.23786579468198,
            lng: -77.9210390200545
          },
          foursquareId: '4b448576f964a520f3f525e3'
        },
        {
          location: {
            lat: 34.202138,
            lng: -77.922557
          },
          foursquareId: '4b5666daf964a520e30e28e3'
        },
        {
          location: {
            lat: 34.241756,
            lng: -77.864541
          },
          foursquareId: '4dc43a00091a070849ef35ce'
        },
        {
          location: {
            lat: 34.194293,
            lng: -77.910822
          },
          foursquareId: '4b44d599f964a52097fd25e3'
        }
      ],
      showListing: ko.observable(true)
    },
    {
      title: 'Starbucks',
      locations: [{
          location: {
            lat: 34.216882,
            lng: -77.907073
          },
          foursquareId: '5831a6cd5d6ec6451e670ea4'
        },
        {
          location: {
            lat: 34.242121,
            lng: -77.828527
          },
          foursquareId: '4b4b75cdf964a520989c26e3'
        },
      ],
      showListing: ko.observable(true)
    },
    {
      title: 'Folks Cafe',
      locations: [{
        location: {
          lat: 34.23759258899041,
          lng: -77.93404361312263
        },
        foursquareId: '4b8b2b0af964a520de9532e3'
      },
      {
        location: {
          lat: 34.24387096219762,
          lng: -77.94567445744798
        },
        foursquareId: '54a896ea498e43a77f97ab37'
      }],
      showListing: ko.observable(true)
    },
    {
      title: '24 South Coffee House',
      locations: [{
        location: {
          lat: 34.234456599111056,
          lng: -77.94852480007482
        },
        foursquareId: '53fa55f3498ed31bb942100a'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Karen\'s Cafe',
      locations: [{
        location: {
          lat: 34.238785509641104,
          lng: -77.949138366954
        },
        foursquareId: '4f3f1635e4b0545d1625d191'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Luna Caffè',
      locations: [{
        location: {
          lat: 34.22825,
          lng: -77.94081
        },
        foursquareId: '523e0915498ef6fde2f97750'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Holy Grounds',
      locations: [{
        location: {
          lat: 34.18645398918267,
          lng: -77.9310255259374
        },
        foursquareId: '4b5f4006f964a52000b029e3'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Café Zola',
       locations: [{
        location: {
          lat: 34.213169032735244,
          lng: -77.88778124872474
        },
        foursquareId: '56af9467498e98f310f07eb8'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Grinders Cafè',
      locations: [{
        location: {
          lat: 34.212560,
          lng: -77.871677
        },
        foursquareId: '4df39287d4c01ff6b2ecac4d'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Addicted to the Bean',
      locations: [{
        location: {
           lat: 34.21370682100642,
           lng: -77.88689944479914
        },
        foursquareId: '545e3fbe498ed0dddfc678d0'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Lucky Joe Craft Coffee',
      locations: [{
        location: {
          lat: 34.266057,
          lng: -77.837758
        },
        foursquareId: '558ea6c2498e1196c0dde706'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Java Dog Coffee House',
      locations: [{
        location: {
          lat: 34.23904245713525,
          lng: -77.94922761275593
        },
        foursquareId: '4b533f58f964a520fb9327e3'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Bespoke Coffee & Dry Goods',
      locations: [{
        location: {
          lat: 34.236501,
          lng: -77.947438
        },
        foursquareId: '584d8c2c94c690146a6a4882'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Bitty & Beau\'s Coffee',
      locations: [{
        location: {
          lat: 34.242016,
          lng: -77.877714
        },
        foursquareId: '5787b9a1498eaca60c912293'
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
          })
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
  
  this.search = ko.observable("");

  //Makes the shops list clickable
  this.listItemClick = function(shop) {
    google.maps.event.trigger(shop.marker, 'click')
    console.log(shop);
  }

  //Reset button
  document.getElementById('reset').addEventListener('click', resetMap);
  function resetMap() {
    location.reload();
  }

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
      zoom: 13,
      styles: styles,
      mapTypeConrtol: false
    });

    appViewModel.google(true);

    //Keep the map centered on window resizing
    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });

    this.searchFunction = ko.computed(function() {
      var filterInput = self.search().toLowerCase();
      self.shops().forEach(function(shop) {
        if (shop.title.toLowerCase().indexOf(filterInput) !== -1) {
          // show the location
          shop.showListing(true);
          // show the location's markers
          shop.locations.forEach(function(shopLocation) {
            shopLocation.marker.setVisible(true)
            return true;
          })
          
        } else {
          // hide the location
          shop.showListing(false);
          // hide the location's markers
          shop.locations.forEach(function(shopLocation) {
            shopLocation.marker.setVisible(false)
            return false;
          })
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
          self.infowindow.open(map, marker)
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
        }, 1200);
      }
    }

    function googleError() {
      alert("Google Maps Could Not Be Loaded");
    }

  }
  window.initMap = initMap;
}
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

