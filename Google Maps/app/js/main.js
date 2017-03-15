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
            infowindow.setContent(this.title);
            infowindow.open(map, this);
          })
        })
      }
      map.fitBounds(bounds);
      console.log(self.shops());
    }
  });

  this.search = ko.observable("");

  this.searchFunction = ko.computed(function() {
    var filterInput = self.search().toLowerCase();

    self.shops().forEach(function(shop) {
      if (shop.title.toLowerCase().indexOf(filterInput) !== -1) {
        // show the location
        shop.showListing(true);
        // show the location's markers
      } else {
        // hide the location
        shop.showListing(false);
        // hide the location's markers
        
      }
    });
  });

  this.listItemClick = function(location) {
    self.shops().marker.setAnimation(google.maps.Animation.BOUNCE);
    console.log(location);
  }


  var map;
  var bounds;
  var markers = [];
  var infowindow = [];

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



  }
  window.initMap = initMap
}
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);