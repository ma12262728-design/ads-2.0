const { test, expect } = require('@playwright/test');
test('get console logs', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(5000);
});
