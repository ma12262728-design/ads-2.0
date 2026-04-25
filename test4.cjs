const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.status() === 406) {
      console.log('406 URL:', response.url());
    }
  });
  
  await page.goto('http://localhost:3000');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  await browser.close();
})();
