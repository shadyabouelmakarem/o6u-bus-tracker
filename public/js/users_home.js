// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-xyrWqgKry9NJuHmZBt557-T5tmxgZbc",
  authDomain: "bus-tracking-13c12.firebaseapp.com",
  databaseURL: "https://bus-tracking-13c12.firebaseio.com",
  storageBucket: "bus-tracking-13c12.appspot.com",
  messagingSenderId: "148373778365"
};
firebase.initializeApp(config);
var database = firebase.database();
var ref = firebase.database().ref();
// Google Map
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    maxZoom: 19,
    minZoom: 10,
  });
  ref.on("value", function(snapshot) {
    var latitude = snapshot.val().gps.latitude;
    var longitude = snapshot.val().gps.longitude;
    var start = {lat: latitude,lng: longitude};//
    // var waypts = [
    //   {location: {lat: 29.994600,lng: 31.160874}},
    //   {location: {lat: 29.971552,lng: 31.099567}}
    // ];
    var end = {lat:29.9760137,lng:30.9476715};
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
  directionsService.route({
    origin: start,
    destination: end,
    //waypoints: waypts
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var eta = response.routes[0].legs[0].duration.text;
      var distance = response.routes[0].legs[0].distance.text;
      $('#arrival').text(distance +" ("+ eta+")");
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}