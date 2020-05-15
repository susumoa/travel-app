const { dateChecker, checkIfEndDateIsLater, dateConverter, differenceBetweenDates } = require('./inputChecker');

// dateChecker tests:
describe('dateChecker tests', () => {
  test('empty string returns false', () => {
    expect(dateChecker('')).toBeFalsy();
  });

  test('whitespace returns false', () => {
    expect(dateChecker('   ')).toBeFalsy();
  });

  test('DD/MM/YYYY returns true', () => {
    expect(dateChecker('01/05/2020')).toBeTruthy();
  });

  test('invalid date returns false', () => {
    expect(dateChecker('30/13/2020')).toBeFalsy();
  });

  test('in leap year 29/02 returns true', () => {
    expect(dateChecker('29/02/2020')).toBeTruthy();
  });
});

describe('checkIfEndDateIsLater tests', () => {
  test('0 returns true', () => {
    expect(checkIfEndDateIsLater(0)).toBeTruthy();
  });

  test('15 returns true', () => {
    expect(checkIfEndDateIsLater(15)).toBeTruthy();
  });

  test('-1 returns true', () => {
    expect(checkIfEndDateIsLater(-1)).toBeFalsy();
  });
});

describe('differenceBetweenDates tests', () => {
  test('01/05/2020 start and 03/05/2020 end returns 2', () => {
    expect(differenceBetweenDates('01/05/2020', '03/05/2020')).toBe(2);
  });

  test('03/05/2020 start and 01/05/2020 end returns -2', () => {
    expect(differenceBetweenDates('03/05/2020', '01/05/2020')).toBe(-2);
  });
});
