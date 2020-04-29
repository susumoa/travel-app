const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  let newData = req.body;
  let newEntry = {
    date: newData.date,
    temperature: newData.temperature,
    userResponse: newData.userResponse,
  };
  console.log('newEntry: ', newEntry);
});
