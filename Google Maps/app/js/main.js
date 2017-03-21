var ko = require("knockout")

var styles = require('./styles').styles

function AppViewModel() {
  this.header = ko.observable("Wilmington Coffee Shops");

  var map,
    largeInfowindow;
  var bounds;
  var markers = [];
  var infowindow = [];

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
          }
        },
        {
          location: {
            lat: 34.242096,
            lng: -77.863673
          }
        },
        {
          location: {
            lat: 34.194293,
            lng: -77.910822
          }
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
        {
          location: {
            lat: 34.196443,
            lng: -77.890236
          }
        }
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
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Zola Coffee & Tea',
      locations: [{
        location: {
          lat: 34.213228,
          lng: -77.887951
        }
      }],
      showListing: ko.observable(true)
    },
    {
      title: 'Grinders Caffè',
      locations: [{
        location: {
          lat: 34.212560,
          lng: -77.871677
        }
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
        var infowindow = new google.maps.InfoWindow();
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
            infowindow.open(map, this);
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
    console.log(place);
  };

  //Reset button
  document.getElementById('reset').addEventListener('click', resetMap);
  function resetMap() {
    location.reload();
  }

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
    var VERSION = '&v=20170101';

    //Populate the infowindow with Foursquare
    this.populateInfoWindow = function(marker, infowindow) {
      var url = 'https://api.foursquare.com/v2/venues/' + CLIENT_ID + CLIENT_SECRET + VERSION;

      $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        async: true,
        success: function(data) {
          var infoWindow = new google.maps.InfoWindow({
            content: contentString({
              title: '<div>' + '<b>' + data.response.venue.name + '</b>' + '</div>',
              address: data.response.venue.address,
              city: data.response.venue.city + data.response.venue.state + data.response.venue.zip,
              hours: data.response.venue.hours,
              phone: data.response.venue.phone
            })
          });
        }
      })
    }

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