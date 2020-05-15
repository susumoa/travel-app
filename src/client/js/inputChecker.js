// Check if date entered as DD/MM/YYYY
export const dateChecker = (date) => {

  if (date === '') {
    return false;
  } else {
    return true;
  }
};

// Check if end date is later or same day as start day
export const checkIfEndDateIsLater = (diff) => {
  if (diff >= 0) {
    return true;
  } else {
    return false;
  }
};

// Return the difference between start and end dates
export const differenceBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return difference;
};
