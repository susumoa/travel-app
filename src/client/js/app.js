const username = 'susumoa';

// Add event listeners
document.addEventListener('DOMContentLoaded', (event) => {
  Client.addListener();
});

export const handleSubmit = (e) => {
  e.preventDefault();

  const startDateInput = document.getElementById('start-date-input').value;
  const endDateInput = document.getElementById('end-date-input').value;
  const daysBetweenDates = Client.differenceBetweenDates(startDateInput, endDateInput);
  const destinationInput = document.getElementById('destination-input').value;

  // check if inputs are empty
  if (!Client.dateChecker(startDateInput)) {
    alert('Please enter the start date in DD/MM/YYYY form');
  } else if (!Client.dateChecker(endDateInput)) {
    alert('Please enter the end date in DD/MM/YYYY form');
  } else if (!Client.checkIfEndDateIsLater(daysBetweenDates)) {
    alert("Your end date is sooner that your start date! Sorry, time travel function isn't available.");
  } else if (destinationInput.trim() === '') {
    alert('Please enter a city name');
  } else {
    document.getElementById('forecast-info').setAttribute('hidden', '');

    getCityInfo(`http://api.geonames.org/searchJSON?q=${destinationInput}&maxRows=10&username=${username}`)
      .then((cities) => {
        return postData(cities);
      })
      .then(() => updateUIWithCityData());
  }
};

// fetch cities from Geonames API
export const getCityInfo = async (url) => {
  const res = await fetch(url);

  try {
    const data = await res.json();
    if (data.totalResultsCount === 0) {
      alert('Please enter an existing city');
    } else {
      return data;
    }
  } catch (err) {
    console.log('Error in getCityInfo: ', err);
  }
};

// post cities to server
const postData = async (data) => {
  const res = await fetch('http://localhost:8080/add', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log('Error in postData: ', err);
  }
};

// update UI with cities info from server
const updateUIWithCityData = async () => {
  const req = await fetch('http://localhost:8080/all');
  try {
    const allData = await req.json();
    Client.createCityList(allData);
  } catch (error) {
    console.log('error in updateUIWithCityData', error);
  }
};

// allow user to choose the destination from the fetched list
export const chooseDestinationCity = (e) => {
  e.preventDefault();

  const startDateInput = document.getElementById('start-date-input').value;
  const endDateInput = document.getElementById('end-date-input').value;
  const daysBetweenDates = Client.differenceBetweenDates(startDateInput, endDateInput);
  const destinationId = event.target.id;
  const destination = event.target.innerHTML;
  let weatherData;
  let imgData;

  document.getElementById('choose-city').setAttribute('hidden', '');
  document.querySelector('ul').innerHTML = '';

  // event listener listens to city-list too, need to exclude it
  if (destinationId !== 'city-list') {
    postWeatherData(destinationId)
      .then((data) => {
        weatherData = data;
      })
      .then(() => {
        return postImageInfo(destinationId);
      })
      .then((imgInfo) => {
        imgData = imgInfo;
      })
      .then(() => {
        const randomNum = Math.floor(Math.random() * imgData.hits.length) < 10 ? Math.floor(Math.random() * imgData.hits.length) : 0;
        return Client.updateUIWithForecast({
          start: startDateInput,
          end: endDateInput,
          length: daysBetweenDates,
          weatherData: weatherData,
          destination: destination,
          imgData: imgData.hits[randomNum],
        });
      });
  }
};

// fetch weather data from Weatherbit API
export const postWeatherData = async function (destinationId) {
  const apiUrl = `http://localhost:8080/weather/${destinationId}`;
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log('Error in post weather data: ', err);
  }
};

// fetch image from Pixabay API
export const postImageInfo = async function (destinationId) {
  const apiUrl = `http://localhost:8080/image/${destinationId}`;
  const response = await fetch(apiUrl);
  try {
    const imgInfo = await response.json();
    return imgInfo;
  } catch (err) {
    console.log('Error in post img info: ', err);
  }
};
