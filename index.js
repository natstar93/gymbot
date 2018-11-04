const puppeteer = require('puppeteer');
const { username, password} = require('./credentials.json');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://gymbox.legendonlineservices.co.uk/enterprise/account/login');
  console.log(await browser.version());
  await page.waitFor('input[name="login.Email"]');

  await page.$eval('input[name="login.Email"]', (el, username) => el.value = username, username);
  await page.$eval('input[name="login.Password"]', (el, password) => el.value = password, password);

  await page.click('input[type="submit"]');

  await page.waitForResponse('https://gymbox.legendonlineservices.co.uk/enterprise/account/home');

  await browser.close();
})();
