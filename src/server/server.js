require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Global variables
let cityData;
const weatherAPIKey = process.env.WEATHER_API_KEY;
const imgAPIKey = process.env.IMG_API_KEY;

// Start up an instance of app
const app = express();

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8080;
app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});

// GET route
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// POST route, save city data
app.post('/add', (req, res) => {
  // console.log('cityData in /add: ', req.body);
  cityData = req.body;
  res.send(cityData);
});

// GET route for city data
app.get('/all', (req, res) => {
  // console.log('cityData in /all: ', cityData);
  res.send(cityData);
});

// GET route for weather forecast for 16 days
app.get('/weather/:destinationId', async (req, res) => {
  const id = parseInt(req.params.destinationId);
  let lat;
  let lng;
  const geonamesData = cityData.geonames;

  for (let i = 0; i < geonamesData.length; i++) {
    // console.log(`i: `, i);
    if (geonamesData[i].geonameId === id) {
      lat = geonamesData[i].lat;
      lng = geonamesData[i].lng;
      break;
    }
  }

  const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherAPIKey}`;

  const response = await fetch(apiUrl);
  try {
    const json = await response.json();
    // console.log('Response: ', json);
    res.json(json);
  } catch (err) {
    console.log('Error: ', err);
  }
});

// GET route for pixabay image
app.get('/image/:destinationId', async (req, res) => {
  const id = parseInt(req.params.destinationId);
  let destination = '';
  const geonamesData = cityData.geonames;

  for (let i = 0; i < geonamesData.length; i++) {
    // console.log(`i: `, i);
    if (geonamesData[i].geonameId === id) {
      destination = geonamesData[i].name;
      //console.log(destination);
      break;
    }
  }

  const apiUrl = `https://pixabay.com/api/?key=${imgAPIKey}&q=${destination}&image_type=photo`;

  const response = await fetch(apiUrl);
  try {
    const imgInfo = await response.json();
    // console.log('Response in get img: ', imgInfo);
    res.json(imgInfo);
  } catch (err) {
    console.log('Error: ', err);
    res.json({ total: 0, totalHits: 0, hits: [] });
  }
});
