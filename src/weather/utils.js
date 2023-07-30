const axios = require("axios");
const { of, throwError } = require("rxjs");

const access_key_dark_sky = "f28c575ca288ee4a5b7268543e6d2a51";
const access_key_mapbox =
  "pk.eyJ1IjoiYWxleGFuZGVyYnJhdW4xMjMiLCJhIjoiY2xrb2c5d2dkMHJ4dTNlazRqMGVoMm93biJ9.sfzrgl5PeUezaoQ0mgl76w";

const getCoordsFromPlace = (place) => {
  return axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      place
    )}.json`,
    {
      params: {
        access_token: access_key_mapbox,
      },
    }
  );
};

const getWeatherForCoords = (latitude, longitude) => {
  return axios.get("http://api.weatherstack.com/current", {
    params: {
      access_key: access_key_dark_sky,
      query: `${latitude},${longitude}`,
    },
  });
};

const extractCoordsFromResponse = (res) => {
  if (!res.data.features.length) {
    return throwError(() => new Error("Invalid search!"));
  }
  const longitude = res.data.features[0].center[0];
  const latitude = res.data.features[0].center[1];
  return of([latitude, longitude]);
};

module.exports = {
  extractCoordsFromResponse,
  getWeatherForCoords,
  getCoordsFromPlace,
};
