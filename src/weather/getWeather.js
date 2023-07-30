const { from, catchError, switchMap, throwError } = require("rxjs");
const {
  getCoordsFromPlace,
  getWeatherForCoords,
  extractCoordsFromResponse,
} = require("./utils");

const getWeatherForLocation = (place) => {
  return from(getCoordsFromPlace(place)).pipe(
    catchError(() =>
      throwError(() => new Error("Unable to connect to map service!"))
    ),
    switchMap((res) => extractCoordsFromResponse(res)),
    switchMap(([latitude, longitude]) =>
      from(getWeatherForCoords(latitude, longitude)).pipe(
        catchError(() =>
          throwError(() => new Error("Unable to connect to weather service!"))
        )
      )
    )
  );
  /*
    .subscribe({
      next: (res) => {
        console.log(
          `${res.data.current.weather_descriptions[0]} in ${res.data.location.name} ${res.data.location.country}.\nIt is currently ${res.data.current.temperature} degrees out. It feels like ${res.data.current.feelslike} degrees out.`
        );
      },
      error: (e) => {
        console.error("Something went wrong :/", e.message);
      },
    });
    */
};

module.exports = {
  getWeatherForLocation,
};
