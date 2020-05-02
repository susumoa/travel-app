export const addListener = () => {
  document.getElementById('sumbit').addEventListener('click', Client.handleSubmit);
  document.getElementById('add-today').addEventListener('click', Client.addTodayDate);
  document.getElementById('city-list').addEventListener('click', Client.chooseDestinationCity);
};
