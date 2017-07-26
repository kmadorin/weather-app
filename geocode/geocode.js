const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address, callback);

  request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Unable to connect to google service');
    } else if (body.status === "ZERO_RESULTS") {
      callback('Unable to find the address');
    } else if (body.status === "OK") {
      var results = {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      }
      callback(undefined, results);
    }
  });

}

module.exports.geocodeAddress = geocodeAddress;