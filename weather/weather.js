const request = require('request');

var getWeather = (lat, lng, callback)=> {
  request({
    url: 'https://api.darksky.net/forecast/aa7e394a72165f74a52b9f2204f78bd0/'+ lat + ','+ lng,
    json: true
  }, (error,response,body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;