var ko = require("knockout")

var styles = require('./styles').styles

function AppViewModel() {
  this.header = ko.observable("Wilmington Coffee Shops");

  // List of coffee shops to select
  var self = this;
  self.shops = ko.observableArray([{
      title: 'Port City Java',
      locations: [{
          location: {
            lat: 34.235912,
            lng: -77.948826
          }
        },
        {
          location: {
            lat: 34.238930,
            lng: -77.921174
          }
        },
        {
          location: {
            lat: 34.237872,
            lng: -77.921174
          }
        },
        {
          location: {
            lat: 34.201974,
            lng: -77.922590
          },
          foursquareId: '4b5666daf964a520e30e28e3'
        },
        {
          location: {
            lat: 34.241756,
            lng: -77.864541
          }
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
            lat: 34.216803,
            lng: -77.906956
          }
        },
        {
          location: {
            lat: 34.242066,
            lng: -77.828570
          }
        },
      ],
      showListing: ko.observable(true)
    },
    {
      title: 'Folks on Fourth',
      locations: [{
        location: {
          lat: 34.243700,
          lng: -77.945501
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: '24 South Coffee House',
      locations: [{
        location: {
          lat: 34.234496,
          lng: -77.948725
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Karen\'s Cafe',
      locations: [{
        location: {
          lat: 34.238730,
          lng: -77.948981
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Luna Caffè',
      locations: [{
        location: {
          lat: 34.228263,
          lng: -77.940812
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Folks Cafe',
      locations: [{
        location: {
          lat: 34.237704,
          lng: -77.934188
        },
        foursquareId: '4b8b2b0af964a520de9532e3'
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Café Zola',
      locations: [{
        location: {
          lat: 34.213169,
          lng: -77.887781
        }
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
      title: 'Daily Grind',
      locations: [{
        location: {
          lat: 34.241911,
          lng: -77.867955
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Addicted to the Bean',
      locations: [{
        location: {
          lat: 34.213678,
          lng: -77.886954
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Bitty & Beau\'s Coffee',
      locations: [{
        location: {
          lat: 34.242041,
          lng: -77.877485
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Lucky Joe Craft Coffee',
      locations: [{
        location: {
          lat: 34.266057,
          lng: -77.837758
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Java Dog Coffee House',
      locations: [{
        location: {
          lat: 34.239104,
          lng: -77.949228
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Morning Glory Coffeehouse',
      locations: [{
        location: {
          lat: 34.225831,
          lng: -77.929120
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Bespoke Coffee & Dry Goods',
      locations: [{
        location: {
          lat: 34.236453,
          lng: -77.947403
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Brick + Mortar Coffee and Supply',
      locations: [{
        location: {
          lat: 34.247251,
          lng: -77.946280
        }
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
        //var infowindow = new google.maps.InfoWindow();
        var shop = self.shops()[i];
        shop.locations.forEach(function(location) {
          var marker = new google.maps.Marker({
            position: location.location,
            title: shop.title,
            animation: google.maps.Animation.DROP,
            map: map,
            id: i
          })
          location.marker = marker;
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

  //Makes the shop list names clickable
  this.listItemClick = function(place) {
    google.maps.event.trigger(marker.position, 'click')
    console.log(place);
  };

  //Reset button
  document.getElementById('reset').addEventListener('click', resetMap);
  function resetMap() {
    location.reload();
  }

  var map, largeInfowindow;
  var bounds;
  var markers = [];

  function initMap() {

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
        console.log(shop);
        if (shop.title.toLowerCase().indexOf(filterInput) !== -1) {
          // show the location
          shop.showListing(true);
          // show the location's markers
          // if (typeof location.marker === 'object') {
          //   location.marker.visible(match);
          //   return match;
          // }
        } else {
          // hide the location
          shop.showListing(false);
          // hide the location's markers
        }
      });
    });

    //Setting up Foursquare for infowindow
    var CLIENT_ID = '4TGGE0PWAWXOLLGK4LWQF4C1ZO3UPPR4IIK5U24QOCG0ISIQ';
    var CLIENT_SECRET = 'ZNHCHPVS0NEE0Q1X1LQA5PNE2ERHRMTAF04X2RCP1CAXRJTB';
    var VERSION = '20170101';

    //Populate the infowindow with Foursquare
    this.populateInfoWindow = function(marker, infowindow) {
      var url = 'https://api.foursquare.com/v2/venues/search';
      //https://foursquare.com/v/ + id
      var latlng = marker.position.lat() + ', ' + marker.position.lng();
      var infowindow = new google.maps.InfoWindow();

      $.ajax({
        url: url,
        dataType: 'json',
        data: {
          //limit: '1',
          ll: latlng,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          query: "coffee",
          //name: 'name',
          v: VERSION,
          async: true
        },
        success: function(data) {
          infowindow.setContent('<div>' + '<b>' + data.response.venues[0].name + '</b>' + '</div>' + data.response.venues[0].location.formattedAddress + data.response.venues[0].formattedPhone + data.response.venues[0].hours + data.response.venues[0].url);
          infowindow.open(map, marker)
          console.log(data);
        }
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

  }
  window.initMap = initMap;
}
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);