export const dateChecker = (date) => {
  const date = date.trim();
  const expression = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const regex = new RegExp(expression);

  if (date === '') {
    return false;
  } else {
    return date.match(regex);
  }
};

export const dateConverter = (date) => {
  const day = parseInt(date.split('/')[0]);
  const month = parseInt(date.split('/')[1]);
  const year = parseInt(date.split('/')[2]);
  const newDate = new Date(year, month, day);
  console.log(newDate);
};
