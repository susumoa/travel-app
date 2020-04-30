require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let cityData = {};
const weatherAPI = process.env.API_KEY;

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
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

// POST route
app.post('/add', (req, res) => {
  let newEntry = req.body;
  // console.log('newEntry: ', newEntry);
  cityData = newEntry;
});

// GET route
app.get('/all', (req, res) => {
  // console.log(cityData);
  res.send(cityData);
});

// Geonames:
// http://api.geonames.org/searchJSON?q=london&maxRows=10&username=susumoa
// extracting the info:
// const lat = data.geonames[0].lat
// const lng = data.geonames[0].lng
// const city = data.geonames[0].name
// const countryName = data.geonames[0].countryName
// return data:
// const data = {
//   "totalResultsCount": 7820,
//   "geonames": [
//     {
//       "adminCode1": "ENG",
//       "lng": "-0.12574",
//       "geonameId": 2643743,
//       "toponymName": "London",
//       "countryId": "2635167",
//       "fcl": "P",
//       "population": 7556900,
//       "countryCode": "GB",
//       "name": "London",
//       "fclName": "city, village,...",
//       "adminCodes1": {
//         "ISO3166_2": "ENG"
//       },
//       "countryName": "United Kingdom",
//       "fcodeName": "capital of a political entity",
//       "adminName1": "England",
//       "lat": "51.50853",
//       "fcode": "PPLC"
//     },
//     {
//       "adminCode1": "08",
//       "lng": "-81.23304",
//       "geonameId": 6058560,
//       "toponymName": "London",
//       "countryId": "6251999",
//       "fcl": "P",
//       "population": 346765,
//       "countryCode": "CA",
//       "name": "London",
//       "fclName": "city, village,...",
//       "adminCodes1": {
//         "ISO3166_2": "ON"
//       },
//       "countryName": "Canada",
//       "fcodeName": "populated place",
//       "adminName1": "Ontario",
//       "lat": "42.98339",
//       "fcode": "PPL"
//     },
//     {
//       "adminCode1": "CT",
//       "lng": "-72.09952",
//       "geonameId": 4839416,
//       "toponymName": "New London",
//       "countryId": "6252001",
//       "fcl": "P",
//       "population": 27179,
//       "countryCode": "US",
//       "name": "New London",
//       "fclName": "city, village,...",
//       "adminCodes1": {
//         "ISO3166_2": "CT"
//       },
//       "countryName": "United States",
//       "fcodeName": "populated place",
//       "adminName1": "Connecticut",
//       "lat": "41.35565",
//       "fcode": "PPL"
//     },
//     {
//       "adminCode1": "05",
//       "lng": "27.91162",
//       "geonameId": 1006984,
//       "toponymName": "East London",
//       "countryId": "953987",
//       "fcl": "P",
//       "population": 478676,
//       "countryCode": "ZA",
//       "name": "East London",
//       "fclName": "city, village,...",
//       "adminCodes1": {
//         "ISO3166_2": "EC"
//       },
//       "countryName": "South Africa",
//       "fcodeName": "seat of a second-order administrative division",
//       "adminName1": "Eastern Cape",
//       "lat": "-33.01529",
//       "fcode": "PPLA2"
//     },
//     {
//       "adminCode1": "ENG",
//       "lng": "-0.13611",
//       "geonameId": 12042156,
//       "toponymName": "Inner London",
//       "countryId": "2635167",
//       "fcl": "L",
//       "population": 3200000,
//       "countryCode": "GB",
//       "name": "Inner London",
//       "fclName": "parks,area, ...",
//       "adminCodes1": {
//         "ISO3166_2": "ENG"
//       },
//       "countryName": "United Kingdom",
//       "fcodeName": "region",
//       "adminName1": "England",
//       "lat": "51.51451",
//       "fcode": "RGN"
//     }
//   ]
// }
