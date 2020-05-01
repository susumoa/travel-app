export const createCityList = (data) => {
  const cityList = data.geonames;

  document.querySelector('ul').innerHTML = '';
  // uses a DocumentFragment
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cityList.length; i++) {
    const anchor = document.createElement('a');
    const newElement = document.createElement('li');

    const city = data.geonames[i].name;
    const country = data.geonames[i].countryCode;
    const id = data.geonames[i].geonameId;

    anchor.appendChild(newElement);
    newElement.innerText = `${city}, ${country}`;
    newElement.setAttribute('id', `${id}`);

    fragment.appendChild(anchor);
  }
  // reflow and repaint here
  document.getElementById('city-list').appendChild(fragment);
  document.getElementById('choose-city').removeAttribute('hidden');
};
