import { test, expect } from '@playwright/test';

test.describe('Progress Bar Modal', () => {
  let dialog;
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-progress-bar-dialog-demo.html');
    dialog = await page.locator('body > div.modal.fade');
  });

  test('Simple dialog - Autoclose after 2 seconds', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Show Dialog' }).first();

    await button.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveText('Loading');
    await expect(dialog).toBeHidden({ timeout: 4000 });
  });

  test('Dialog with custom message - Autoclose after 3 seconds', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Show Dialog' }).nth(1);

    await button.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveText('Custom message');
    await expect(dialog).toBeHidden({ timeout: 5000 });
  });

  // autocloses after 5s instead of 3s
  test('Dialog with custom settings - Autoclose after 3 seconds', async ({ page }) => {
    const button = await page.getByRole('button', { name: 'Show Dialog' }).nth(2);

    await button.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveText('Hello Mr. Alert !');
    await expect(dialog).toBeHidden({ timeout: 7000 });
  });
});