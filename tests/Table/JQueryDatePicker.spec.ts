import {test, expect, Locator} from '@playwright/test';

// Date format is: Month/Day/Year
test.describe('JQuery Date Picker', () => {
  const expectedFromDay = '12';
  const expectedToDay = '14';
  let fromDateInput : Locator;
  let toDateInput : Locator;
  let expectedFromDate : string;
  let expectedToDate : string;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/jquery-date-picker-demo.html');

    fromDateInput = await page.getByLabel('From');
    toDateInput = await page.getByLabel('To');

    const now = new Date(Date.now());
    const expectedYearString = now.getFullYear().toString();

    expectedFromDate = `/${expectedFromDay}/${expectedYearString}`;
    expectedToDate = `/${expectedToDay}/${expectedYearString}`;
  });

  test('valid dates', async ({ page }) => {
    await fromDateInput.click();
    await page.getByRole('link', { name: expectedFromDay }).click();
    await toDateInput.click();
    await page.getByRole('link', { name: expectedToDay }).click();
    
    const fromValue = await fromDateInput.inputValue();
    await expect(fromValue).toContain(expectedFromDate);
    const toValue = await toDateInput.inputValue();
    await expect(toValue).toContain(expectedToDate);
  });

  test('change From date to later date than To date', async ({ page }) => {
    await fromDateInput.click();
    await page.getByRole('link', { name: expectedFromDay }).click();
    await toDateInput.click();
    await page.getByRole('link', { name: expectedToDay }).click();

    await fromDateInput.click();
    await page.getByText('15').click();
    
    const fromValue = await fromDateInput.inputValue();
    expect(fromValue).toContain(expectedFromDate);
    const toValue = await toDateInput.inputValue();
    await expect(toValue).toContain(expectedToDate);
  });

  test('change To date to earlier date than From date', async ({ page }) => {
    await fromDateInput.click();
    await page.getByRole('link', { name: expectedFromDay }).click();
    await toDateInput.click();
    await page.getByRole('link', { name: expectedToDay }).click();

    await toDateInput.click();
    await page.getByText('11').click();
    
    const fromValue = await fromDateInput.inputValue();
    await expect(fromValue).toContain(expectedFromDate);
    const toValue = await toDateInput.inputValue();
    await expect(toValue).toContain(expectedToDate);
  });
});
