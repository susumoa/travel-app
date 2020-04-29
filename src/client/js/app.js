// TODO: secure API KEY
const apiKEY = '6ea07127874f269c4d510bfca0c2bab4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Add event listener to button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const userFeel = document.getElementById('feelings').value;
  if (zip === '') {
    alert('Please provide a zip code');
  } else if (userFeel === '') {
    alert('Please provide your feelings');
  } else {
    getWeatherInfo(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKEY}`)
      .then((data) => {
        const temp = Math.round(data.main.temp);
        postData('/add', { temperature: temp, date: newDate, userResponse: userFeel });
      })
      .then(() => updateUI());
  }
}

const getWeatherInfo = async (url) => {
  const res = await fetch(url);

  try {
    const data = await res.json();
    // console.log('weather data: ', data);
    if (data.message === 'city not found') {
      alert('Please provide an existing US zip code');
    } else {
      return data;
    }
  } catch (err) {
    console.log('Error in getWeatherInfo: ', err);
  }
};

const postData = async (url = '', data) => {
  const res = await fetch(url, {
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

const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    // console.log('all data: ', allData);
    const lastEntry = allData.length - 1;
    document.getElementById('date').innerHTML = `Date: ${allData[lastEntry].date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData[lastEntry].temperature}ºF`;
    document.getElementById('content').innerHTML = `Feelings: ${allData[lastEntry].userResponse}`;
  } catch (error) {
    console.log('error in updating UI', error);
  }
};
