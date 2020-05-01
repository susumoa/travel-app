export const addListener = () => {
  document.getElementById('sumbit').addEventListener('click', Client.handleSubmit);
  document.getElementById('city-list').addEventListener('click', Client.chooseDestinationCity);
};
