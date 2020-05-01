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

const getCityInfo = async (url) => {
  const res = await fetch(url);

  try {
    const data = await res.json();
    // console.log('data: ', data);
    if (data.totalResultsCount === 0) {
      alert('Please enter an existing city');
    } else {
      // console.log('getCityInfo data: ', data);
      return data;
    }
  } catch (err) {
    console.log('Error in getCityInfo: ', err);
  }
};

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
    // console.log('postData newData: ', newData);
    return newData;
  } catch (err) {
    console.log('Error in postData: ', err);
  }
};

const updateUIWithCityData = async () => {
  const req = await fetch('http://localhost:8080/all');
  try {
    const allData = await req.json();
    // console.log('all data: ', allData);
    Client.createCityList(allData);
  } catch (error) {
    console.log('error in updateUIWithCityData', error);
  }
};

// Allow user to choose the destination from the fetched list
export const chooseDestinationCity = (e) => {
  e.preventDefault();

  const startDateInput = document.getElementById('start-date-input').value;
  const endDateInput = document.getElementById('end-date-input').value;
  const daysBetweenDates = Client.differenceBetweenDates(startDateInput, endDateInput);
  const destinationId = event.target.id;
  let weatherData;
  let imgData;

  document.getElementById('choose-city').setAttribute('hidden', '');
  document.querySelector('ul').innerHTML = '';

  if (destinationId !== 'city-list') {
    // console.log(destinationId);
    postWeatherData(destinationId)
      .then((data) => {
        weatherData = data;
      })
      .then(() => {
        return postImageInfo(destinationId);
      })
      .then((imgInfo) => {
        // console.log(imgInfo);
        imgData = imgInfo;
      })
      .then(() => {
        return Client.updateUIWithForecast({
          start: startDateInput,
          end: endDateInput,
          length: daysBetweenDates,
          weatherData: weatherData,
          imgData: imgData.hits[0],
        });
      });
  }
};

// Fetch weather data from Weatherbit
export const postWeatherData = async function (destinationId) {
  const apiUrl = `http://localhost:8080/weather/${destinationId}`;
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (err) {
    console.log('Error in post weather data: ', err);
  }
};

// Fetch image from Pixabay
export const postImageInfo = async function (destinationId) {
  const apiUrl = `http://localhost:8080/image/${destinationId}`;
  const response = await fetch(apiUrl);
  try {
    const imgInfo = await response.json();
    // console.log('Post img info: ', imgInfo);
    return imgInfo;
  } catch (err) {
    console.log('Error in post img info: ', err);
  }
};
