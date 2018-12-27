const puppeteer = require('puppeteer');
const { username, password } = require('./credentials.json');
const pageUrls = require('./constants.js')

const classId = process.argv[2];

if(!classId || classId.search(/(slot)\d\w+/i) !== 0) {
  console.log('Please enter a class Id eg slot000000');
  return;
}

(async() => {
  console.log(`Attempting to book ${classId}`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrls.login);

  await page.waitFor('input[name="login.Email"]');

  console.log('Entering login details');

  await page.$eval('input[name="login.Email"]', (el, username) => el.value = username, username);
  await page.$eval('input[name="login.Password"]', (el, password) => el.value = password, password);

  console.log('Submitting login details');

  await page.click('input[type="submit"]');

  try {
    await page.waitForResponse(pageUrls.home);
  } catch(err) {
    console.log('Homepage did not load. Manually navigating to homepage');
    await page.goto(pageUrls.home);
  }

  console.log('Logged in. Navigating to timetable');

  try {
    await page.goto(pageUrls.timetable);
    await page.waitFor('table#MemberTimetable');
  } catch(err) {
    console.log('Could not load timetable');
    return;
  }

  console.log(`Adding ${classId} to basket`);

  try {
    await page.click(`a#${classId}`);
  } catch(err) {
    console.log(`Could not find class ${classId}`, err);
    return;
  }

  try {
    console.log('Waiting for basket');
    await page.waitFor('div.basketButtonWrapper', { timeout: 10000 });
  } catch(err) {
    console.log('Basket page not loaded', err);
    return;
  }

  await page.click('a#btnPayNow');

  await page.goto(pageUrls.paymentConfirmed);

  console.log('Class booked!');

  await browser.close();
})();
