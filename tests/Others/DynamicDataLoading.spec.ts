import { test, expect } from '@playwright/test';

test('Load data', async ({ page }) => {
  await page.goto('https://demo.seleniumeasy.com/dynamic-data-loading-demo.html');
  await page.getByRole('button', { name: 'Get New User'}).click();

  const loaded = await page.locator('#loading');

  await expect(loaded).toContainText('First Name :');
  await expect(loaded).toContainText('Last Name :');
  await expect(loaded.locator('img')).toBeDefined();
});
