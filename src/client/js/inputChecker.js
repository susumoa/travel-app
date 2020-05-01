// Check if date entered as DD/MM/YYYY
export const dateChecker = (date) => {
  const newDate = date.trim();
  const expression = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const regex = new RegExp(expression);

  if (newDate === '') {
    return false;
  } else if (newDate.match(regex)) {
    return true;
  } else {
    return false;
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

export const differenceBetweenDates = (startDate, endDate) => {
  const start = dateConverter(startDate);
  const end = dateConverter(endDate);
  const difference = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return difference;
};

const dateConverter = (date) => {
  const day = date.split('/')[0];
  const month = date.split('/')[1];
  const year = date.split('/')[2];
  const newDate = new Date(`${month}/${day}/${year}`);
  return newDate;
};
