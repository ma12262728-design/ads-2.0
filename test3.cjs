const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const rootHTML = await page.$eval('#root', el => el.innerHTML);
  fs.writeFileSync('root-dump.html', rootHTML);
  
  await browser.close();
})();
