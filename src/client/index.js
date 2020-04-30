import { handleSubmit, chooseDestinationCity } from './js/app';
import { createCityList } from './js/cityList';
import { dateChecker, checkIfEndDateIsLater, differenceBetweenDates } from './js/inputChecker';
import { updateUIWithForecast } from './js/forecast';

import './styles/style.scss';

export { handleSubmit, createCityList, chooseDestinationCity, dateChecker, checkIfEndDateIsLater, differenceBetweenDates, updateUIWithForecast };
