import { test, expect } from '@playwright/test';

test.describe('Javascript Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/javascript-alert-box-demo.html');
  });

  test('Javascript Alert Box', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');

    page.getByRole('button', { name: 'Click me!' }).first().click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe('I am an alert box!');
    await dialog.accept();
  });

  test('Javascript Confirm Box', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');

    page.getByRole('button', { name: 'Click me!' }).nth(1).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe('Press a button!');
    await dialog.accept();
  });

  test('Javascript Prompt Box', async ({ page }) => {
    const promptOutput = await page.locator('#prompt-demo');
    const dialogPromise = page.waitForEvent('dialog');

    page.getByRole('button', { name: 'Click for Prompt Box' }).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe('Please enter your name');
    await dialog.accept('Bob Test');
    await expect(promptOutput).toHaveText('You have entered \'Bob Test\' !');
  });
});
