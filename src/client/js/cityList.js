export const createCityList = (data) => {
  const cityList = data.geonames;
  // uses a DocumentFragment
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cityList.length; i++) {
    const newElement = document.createElement('li');
    const city = data.geonames[i].name;
    const country = data.geonames[i].countryName;
    const id = data.geonames[i].geonameId;
    newElement.innerText = `${city}, ${country}`;
    newElement.setAttribute('id', `${id}`);

    fragment.appendChild(newElement);
  }
  // reflow and repaint here
  document.getElementById('city-list').appendChild(fragment);
};
