export const updateUIWithForecast = (data) => {
  const { start, end, length, weatherData, imgData } = data;
  document.getElementById('forecast-info').removeAttribute('hidden');

  // console.log(start, end, length, weatherData);

  const startDateForApi = `${start.split('/')[2]}-${start.split('/')[1]}-${start.split('/')[0]}`;
  const today = new Date();
  const todayForConverter = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  if (imgData) {
    document.getElementById('destination-img').src = imgData.webformatURL;
    document.getElementById('destination-img').alt = `${imgData.tags} image`;
  } else {
    document.getElementById('destination-img').src =
      'https://pixabay.com/get/57e7d0454855a814f1dc84609629317d143dd7ed544c704c7d2779dc934fcc59_640.jpg';
    document.getElementById('destination-img').alt = 'image of earth';
  }

  document.getElementById('start-date').innerHTML = start;
  document.getElementById('end-date').innerHTML = end;
  document.getElementById('destination').innerHTML = `${weatherData['city_name']}, ${weatherData['country_code']}`;
  document.getElementById('trip-length').innerHTML = `${length} ${length <= 1 ? 'day' : 'days'}`;

  if (Client.differenceBetweenDates(todayForConverter, start) <= 16) {
    for (let i = 0; i < weatherData.data.length; i++) {
      if (weatherData.data[i].datetime === startDateForApi) {
        document.getElementById('forecast').innerHTML = `${weatherData.data[i].temp}°C`;
        document.getElementById('weather-icon').src = `http://localhost:8080/icons/${weatherData.data[i].weather.icon}.png`;
        document.getElementById('weather-icon').alt = `${weatherData.data[i].weather.description} icon`;
        break;
      }
    }
  } else {
    document.getElementById('forecast').innerHTML = 'Sorry, no forecast for this far in the future.';
  }
};
