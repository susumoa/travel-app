export const updateUIWithForecast = (data) => {
  const { start, end, length, weatherData, destination, imgData } = data;
  document.getElementById('forecast-info').removeAttribute('hidden');

  const startDateForApi = `${start.split('/')[2]}-${start.split('/')[1]}-${start.split('/')[0]}`;
  const endDateForLink = `${end.split('/')[2]}-${end.split('/')[1]}-${end.split('/')[0]}`;
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
  document.getElementById('destination').innerHTML = `${destination}`;
  document.getElementById('trip-length').innerHTML = `${length} ${length <= 1 ? 'day' : 'days'}`;
  document.getElementById('airbnb-link').href = `https://www.airbnb.co.uk/s/${
    destination.split(',')[0]
  }/homes?tab_id=all_tab&refinement_paths%5B%5D=%2Fhomes&checkin=${startDateForApi}&checkout=${endDateForLink}&source=structured_search_input_header&search_type=search_query`;

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
