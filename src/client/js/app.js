const username = 'susumoa';

// Add event listeners
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('sumbit').addEventListener('click', handleSubmit);
  document.getElementById('city-list').addEventListener('click', chooseDestinationCity);
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
    // Geonames:
    // http://api.geonames.org/searchJSON?q=london&maxRows=10&username=susumoa

    getCityInfo(`http://api.geonames.org/searchJSON?q=${destinationInput}&maxRows=10&username=${username}`)
      .then((cities) => {
        postData(cities);
      })
      .then(() => firstUIUpdate());
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
    // console.log('newData: ', newData);
    return newData;
  } catch (err) {
    console.log('Error in postData: ', err);
  }
};

const firstUIUpdate = async () => {
  const req = await fetch('http://localhost:8080/all');
  try {
    const allData = await req.json();
    // console.log('all data: ', allData);
    Client.createCityList(allData);
  } catch (error) {
    console.log('error in firstUIUpdate', error);
  }
};

export const chooseDestinationCity = (e) => {
  e.preventDefault();
  const startDateInput = document.getElementById('start-date-input').value;
  const endDateInput = document.getElementById('end-date-input').value;
  const daysBetweenDates = Client.differenceBetweenDates(startDateInput, endDateInput);
  const destinationId = event.target.id;
  if (destinationId !== 'city-list') {
    console.log(destinationId);
    postWeatherData(destinationId);
  }
};

export const postWeatherData = async function (destinationId) {
  const apiUrl = `http://localhost:8080/weather/${destinationId}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  console.log(json);
};
