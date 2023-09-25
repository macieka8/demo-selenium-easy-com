import { test, expect } from '@playwright/test';

test.describe('Bootstrap Alert messages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-alert-messages-demo.html');
  });

  const normalMessageTestData = [
    {
      buttonName: 'Normal success message',
      messageCloseButtonSelector: '.alert-normal-success',
    },
    {
      buttonName: 'Normal warning message',
      messageCloseButtonSelector: '.alert-normal-warning',
    },
    {
      buttonName: 'Normal danger message',
      messageCloseButtonSelector: '.alert-normal-danger',
    },
    {
      buttonName: 'Normal info message',
      messageCloseButtonSelector: '.alert-normal-info',
    },
  ];

  for (const { buttonName, messageCloseButtonSelector } of normalMessageTestData) {
    test(`Close ${buttonName}`, async ({ page }) => {
      const messageButton = await page.getByRole('button', { name: buttonName });
      const alertMessage = await page.locator(messageCloseButtonSelector);
      const closeMessageButton = await page.locator(`${messageCloseButtonSelector} > button`);
  
      await messageButton.click();
      await expect(alertMessage).toBeVisible();
      await closeMessageButton.click();
      await expect(alertMessage).toBeHidden();
    });
  }
  
  const autocloseableMessageTestData = [
    {
      buttonName: 'Autocloseable success message',
      messageSelector: '.alert-autocloseable-success',
      timeToMessageDisapperInMilliseconds: 5000 + 2000,
    },
    {
      buttonName: 'Autocloseable warning message',
      messageSelector: '.alert-autocloseable-warning',
      timeToMessageDisapperInMilliseconds: 3000 + 2000,
    },
    {
      buttonName: 'Autocloseable danger message',
      messageSelector: '.alert-autocloseable-danger',
      timeToMessageDisapperInMilliseconds: 5000 + 2000,
    },
    {
      buttonName: 'Autocloseable info message',
      messageSelector: '.alert-autocloseable-info',
      timeToMessageDisapperInMilliseconds: 6000 + 2000,
    },
  ];

  for (const { buttonName, messageSelector, timeToMessageDisapperInMilliseconds } of autocloseableMessageTestData) {
    test(`${buttonName}`, async ({ page }) => {
      const messageButton = await page.getByRole('button', { name: buttonName });
      const alertMessage = await page.locator(messageSelector);
  
      await messageButton.click();
      await expect(alertMessage).toBeVisible();
      await expect(alertMessage).toBeHidden({ timeout: timeToMessageDisapperInMilliseconds });
    });
  }
});