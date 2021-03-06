// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.4867, lng: -74.4444},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
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
      $("#placeInfo").empty();
    });
    markers = [];

    $("#introMsg").remove()
    $("#placeInfo").empty()

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {

      console.log(place)
      if (place.rating == undefined) {
        place.rating = "NA"
      };
      var rating = $("<div>").addClass("pull-right").append("Rating: "+ place.rating + "/5")
      var createPanels = $("<div>").addClass("panel panel-default").append(addPanelBody)
      var addPanelBody = $("<div>").addClass("panel-body").addClass("col-md-6").append(place.name).append("<br>"+place.formatted_address).append(rating);
      var placeInfo = $("#placeInfo").append(addPanelBody);
      console.log(place.place_id)

// $.ajax({
//    type: 'GET',
//     url: url,
//     async: false,
//     jsonpCallback: 'jsonCallback',
//     contentType: "application/json",
//     dataType: 'jsonp',
//     success: function(json) {
//       var data = $.parseJSON(json)
//        console.dir(json);
//     },
//     error: function(jqXHR, textstatus, errorThrown) {
//           console.log(jqXHR);
//           console.log(textstatus);
//           console.log(errorThrown);
//     }
// });
      // $.ajax({
      //   type: "GET",
      //   url: "https://maps.googleapis.com/maps/api/place/details/json?placeid="+place.place_id+"&key=AIzaSyAmytpwQ4urhmqmCOUSSMyJwogoAdgQrDM",
      //   success: function(data) {
      //     console.log("ajax success!")
      //   },
      //   error: function(jqXHR, textstatus, errorThrown) {
      //     console.log(jqXHR);
      //     console.log(textstatus);
      //     console.log(errorThrown);
      //   }
      // });

var request = {
  placeId: place.place_id
};

service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);
              
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
    //map.fitBounds(bounds);
  });
}




