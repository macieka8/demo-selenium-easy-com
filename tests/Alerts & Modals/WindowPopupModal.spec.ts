import { test, expect } from '@playwright/test';

test.describe('Window Popup Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/window-popup-modal-demo.html');
  });

  test('Follow on twitter pop-up appear', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    page.getByRole('link', { name: 'Follow On Twitter' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('https://twitter.com/');
  });

  test('Like us on facebook pop-up appear', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    page.getByRole('link', { name: 'Like us On Facebook' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toBe('https://www.facebook.com/seleniumeasy');
  });

  test('Follow twitter & facebook appears', async ({ page, context }) => {
    const button = await page.getByText('Follow Twitter & Facebook'); // getByRole doesn't work
    let pageCount = 0;
    context.on('page', async page => {
      pageCount++;
      expect(page.url()).toMatch(/https:\/\/twitter\.com|https:\/\/www\.facebook\.com\/seleniumeasy/);
    });

    button.click();
    await context.waitForEvent('page');
    await context.waitForEvent('page');
    expect(pageCount).toBe(2);
  });

  test('Follow all (facebook, twitter & google plus)', async ({ page, context }) => {
    let popupsCount = 0;
    context.on('page', async page => {
      popupsCount++;
      expect(page.url()).toMatch(/https:\/\/twitter\.com|https:\/\/www\.facebook\.com\/seleniumeasy|https:\/\/workspaceupdates\.googleblog\.com/);
    });

    page.getByText('Follow All').click(); // getByRole('link', { name: 'Follow All' }) doesn't work
    await context.waitForEvent('page');
    await context.waitForEvent('page');
    await context.waitForEvent('page');
    expect(popupsCount).toBe(3);
  });
});
