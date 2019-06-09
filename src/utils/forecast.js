const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/42a44d34d369948f6fa2c95c482a0e42/${lat}, ${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach weather services!", undefined);
    } else if (body.error) {
      callback("Unable find weather. Please try again!", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees outside. There is a ${
          body.currently.precipProbability
        } chance of rain. The high for the day is ${
          body.daily.data[0].temperatureHigh
        } degrees, The low for the day is ${
          body.daily.data[0].temperatureLow
        } degrees.`
      );
    }
  });
};

module.exports = forecast;
