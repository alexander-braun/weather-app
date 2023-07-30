const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { getWeatherForLocation } = require("./weather/getWeather");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirPath = path.join(__dirname, "../public");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Alex",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Alex",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Alex",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "No address",
      message: "You must provide an address",
    });
  } else {
    getWeatherForLocation(req.query.address).subscribe({
      next: (weather) => {
        res.send({
          description: weather.data.current.weather_descriptions[0],
          city: weather.data.location.name,
          country: weather.data.location.country,
          temperature: weather.data.current.temperature,
          feelsLike: weather.data.current.feelslike,
        });
      },
      error: (e) => {
        res.send({
          error: "Something went wrong :/",
          message: e.message,
        });
      },
    });
  }
});

app.get("*", (req, res) => {
  res.send("Cannot find " + req.url);
});

app.listen(port, () => {
  console.log("Server running!");
});
