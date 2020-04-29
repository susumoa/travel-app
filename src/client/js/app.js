const username = 'susumoa';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Add event listener to button
// document.getElementById('sumbit').addEventListener('click', handleSubmit);

export const handleSubmit = (e) => {
  e.preventDefault();

  const startDateInput = document.getElementById('start-date-input').value;
  const endDateInput = document.getElementById('end-date-input').value;
  const destinationInput = document.getElementById('destination-input').value;

  getCityInfo(`http://api.geonames.org/searchJSON?q=${destinationInput}&maxRows=10&username=${username}`)
    .then((cities) => {
      postData(cities);
    })
    .then(() => firstUIUpdate());
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
    console.log('Error in getWeatherInfo: ', err);
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
    createCityList(allData);
    // const lastEntry = allData.length - 1;
    // document.getElementById('date').innerHTML = `Date: ${allData[lastEntry].date}`;
    // document.getElementById('temp').innerHTML = `Temperature: ${allData[lastEntry].temperature}ºF`;
    // document.getElementById('content').innerHTML = `Feelings: ${allData[lastEntry].userResponse}`;
  } catch (error) {
    console.log('error in updating UI', error);
  }
};

const createCityList = (data) => {
  const cityList = data.geonames;

  const fragment = document.createDocumentFragment(); // ← uses a DocumentFragment

  for (let i = 0; i < cityList.length; i++) {
    const newElement = document.createElement('li');
    const city = data.geonames[i].name;
    const country = data.geonames[i].countryName;
    newElement.innerText = `${city}, ${country}`;

    fragment.appendChild(newElement);
  }
  document.getElementById('city-list').appendChild(fragment); // reflow and repaint here -- once!
};
