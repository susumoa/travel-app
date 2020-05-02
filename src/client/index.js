import { handleSubmit, chooseDestinationCity, addTodayDate } from './js/app';
import { createCityList } from './js/cityList';
import { dateChecker, checkIfEndDateIsLater, differenceBetweenDates } from './js/inputChecker';
import { updateUIWithForecast } from './js/forecast';
import { addListener } from './js/eventListener';

import './styles/style.scss';

export {
  handleSubmit,
  createCityList,
  chooseDestinationCity,
  dateChecker,
  checkIfEndDateIsLater,
  differenceBetweenDates,
  updateUIWithForecast,
  addListener,
  addTodayDate,
};
