const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject)=>{

    encodedAddress = encodeURIComponent(address);

    request({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject('Unable to connect to google service');
      } else if (body.status === "ZERO_RESULTS") {
        reject('Unable to find the address');
      } else if (body.status === "OK") {
        var results = {
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        }
        resolve(results);
      }
    });
  });
};

geocodeAddress('19146').then((location)=>{
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=>{
  console.log(errorMessage);
});