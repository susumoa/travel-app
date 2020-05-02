# Travel App Project

## Overview

This is the last project for Udacity's Front End Developer Nanodegree Program, a Travel App.

## To get started

- clone project with `https://github.com/susumoa/travel-app.git`
- `cd` into the new `travel-app` folder
- run `npm install`
- run `touch .env`
- add your API ID and API KEY to the `.env` file like this:
  ```
  WEATHER_API_KEY=="*************************"
  IMG_API_KEY="*************************"
  ```
- run `npm run build-prod`
- start the server with `npm run start`
- open `localhost:8080` in your browser or run `npm run build-dev`

## How to use

### Input field

![input](./screenshots/input.png)

On mobile:

![input_mobile](./screenshots/input_mobile.png)

Enter your travel destination, start and end date and click the Give me a forecast button. The date input fields only allow the format DD/MM/YYYY. Giving invalid input in the date or destination field invokes an alert.

If your start date is today, you can click the Today button next to the start date input field, instead of typing.

#### In the background

When clicking the submit buttont the dateChecker function checks if the date is valid. It can take leap years in account.
Then an API call to Geonames fetches an object that contains a 10 items long list of the corresponding destinations and posts it in the servers `cityData` variable. `cityData` is overwritten in every call to prevent multiplying items.
If the returned object's totalResultsCount is 0, an alert asks for an existing destination.
After the API call, a get request returns the destination list and the UI is updated with it.

### City list

![city_list](./screenshots/city_list.png)

On mobile:

![city_list_mobile](./screenshots/city_list_mobile.png)

The UI renders the found destinations. You can choose the one you are travelling to by clicking on the destination.

#### In the background

All list element has an id, that is the destinations geonameId.
Clicking on a destination fires an API call to Weatherbit with the destination's latitude and longitude. The request gets the latitude and longitude data from the `cityData` object by searching for the geonameId that is passed to the server. The returned data is saved in a variable in `app.js`.
Then an API call to Pixabay fetches images that has the name of the destination as a tag. The images are in order of popularity. There are no other search parameters because this is the most likely case to the call to return any image. The request gets the destination data from the `cityData` object by searching for the geonameId that is passed to the server. The returned data is saved in a variable in `app.js`.
