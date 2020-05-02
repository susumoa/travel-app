const { addTodayDate } = require('./app');

describe("add today's date tests", () => {
  document.body.innerHTML =
    '<div class="holder start-date-input">' +
    '  <label for="start-date-input">Enter start date: </label>' +
    '  <input type="text" id="start-date-input" placeholder="DD/MM/YYYY" />' +
    '  <button id="add-today" type="button" onclick=" return addTodayDate(event)">Today</button>' +
    '</div>';

  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  test('input field is not empty after click', () => {
    addTodayDate(evt);

    expect(document.getElementById('start-date-input').value).toBeDefined;
    expect(document.getElementById('start-date-input').value).not.toBe('');
  });

  test("enter today's (in May) date to input field", () => {
    addTodayDate(evt);

    const dayOnTestWriting = new Date('05/02/2020');
    const dayOfTest = new Date();
    const diff = Math.floor((dayOfTest.getTime() - dayOnTestWriting.getTime()) / (1000 * 60 * 60 * 24));
    // only works in May:
    const testDay = `${2 + diff < 10 ? `0${2 + diff}` : 2 + diff}/05/2020`;

    expect(document.getElementById('start-date-input').value).toBe(testDay);
  });

  // Comment out and add todayDate to test on any date
  // test("today's date is entered on button click", () => {
  //   addTodayDate(evt);

  //   const todayDate = '' /* Add today's date in DD/MM/YYYY format */

  //   expect(document.getElementById('start-date-input').value).toBe(todayDate);
  // });
});
