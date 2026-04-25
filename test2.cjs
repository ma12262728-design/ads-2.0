const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  await new Promise(resolve => setTimeout(resolve, 3500));
  
  const content = await page.content();
  console.log(content.slice(0, 500)); // just output some of it
  console.log("WAIT Let us see if root has any children:", await page.$eval('#root', el => el.innerHTML.slice(0, 500)));
  
  await browser.close();
})();
