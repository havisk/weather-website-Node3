const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define Paths or Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Kool Havis"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kool Havis"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the Help Page!",
    name: "Kool Havis"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter an address"
    });
  }
  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecastData,
        address: req.query.address
      });
    });
  });
  // res.send({
  //   location: "Marietta",
  //   forecast: "it is 75 degrees outside",
  //   address: req.query.address
  // });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term!"
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    message: "help article not found",
    name: "Kool Havis"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Kool Havis"
  });
});

app.listen(port, () => {
  console.log("Up and running on port 3000.");
});
