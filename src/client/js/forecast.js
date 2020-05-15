export const updateUIWithForecast = (data) => {
  document.getElementById('forecast-info').removeAttribute('hidden');

  const { start, end, length, weatherData, destination, imgData } = data;
  const today = new Date();

  // check if image is available
  if (imgData) {
    document.getElementById('destination-img').src = imgData.webformatURL;
    document.getElementById('destination-img').alt = `${imgData.tags} image`;
  } else {
    document.getElementById('destination-img').src = 'https://cdn.pixabay.com/photo/2016/10/20/18/35/sunrise-1756274_960_720.jpg';
    document.getElementById('destination-img').alt = 'image of earth';
  }

  document.getElementById('start-date').innerHTML = start;
  document.getElementById('end-date').innerHTML = end;
  document.getElementById('destination').innerHTML = `${destination}`;
  document.getElementById('trip-length').innerHTML = `${length} ${length <= 1 ? 'day' : 'days'}`;
  // create link to airbnb with journey information
  document.getElementById('airbnb-link').href = `https://www.airbnb.co.uk/s/${
    destination.split(',')[0]
  }/homes?tab_id=all_tab&refinement_paths%5B%5D=%2Fhomes&checkin=${start}&checkout=${end}&source=structured_search_input_header&search_type=search_query`;
  document.getElementById('forecast-day').innerHTML = `${start}`;

  // check if journey starts later than 16 days, due to Weatherbit API limitations, the forecast can only work for the next 16 days
  if (Client.differenceBetweenDates(today, start) <= 16) {
    for (let i = 0; i < weatherData.data.length; i++) {
      if (weatherData.data[i].datetime === start) {
        document.getElementById('forecast').innerHTML = `${weatherData.data[i].temp}°C`;
        document.getElementById('weather-icon').src = `http://localhost:8080/icons/${weatherData.data[i].weather.icon}.png`;
        document.getElementById('weather-icon').alt = `${weatherData.data[i].weather.description} icon`;
        break;
      }
    }
  } else {
    document.getElementById('weather-icon').src = 'http://localhost:8080/icons/nodata.png';
    document.getElementById('weather-icon').alt = 'nodata icon';
    document.getElementById('forecast').innerHTML = 'Sorry, no forecast for this far in the future.';
  }
};
