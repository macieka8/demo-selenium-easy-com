import { test, expect } from '@playwright/test';

// inputing date by typing allows sunday to be picked
test.describe('Bootstrap Date Pickers', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-date-picker-demo.html');
  });

  test("Date Example - Select Date", async ({ page }) => {
    await page.locator('#sandbox-container1 i').click();
    await page.getByRole('cell', { name: '«' }).click();
    await page.getByRole('cell', { name: '«' }).click();
    await page.getByRole('cell', { name: '20', exact: true }).click();

    const inputElement = await page.locator('#sandbox-container1 > div > input');

    const expectedDate = new Date(Date.now());
    expectedDate.setMonth(expectedDate.getMonth() - 2);
    expectedDate.setDate(20);
    
    const expectedMonth = expectedDate.getMonth() + 1;
    const expectedMonthString = expectedMonth > 9 ? expectedMonth.toString() : `0${expectedMonth}`;
    const expectedDayString = expectedDate.getDate() > 9 ? expectedDate.getDate().toString() : `0${expectedDate.getDate()}`;
    const expectedString = `${expectedDayString}/${expectedMonthString}/${expectedDate.getFullYear()}`

    await expect(inputElement).toHaveValue(expectedString);
  });

  test("Date Example - Click on Today", async ({ page }) => {
    await page.locator('#sandbox-container1 i').click();
    await page.getByRole('cell', { name: 'Today' }).click();

    const inputElement = await page.locator('#sandbox-container1 > div > input');
    
    const expectedDate = new Date(Date.now());

    const expectedMonth = expectedDate.getMonth() + 1;
    const expectedMonthString = expectedMonth > 9 ? expectedMonth.toString() : `0${expectedMonth}`;
    const expectedDayString = expectedDate.getDate() > 9 ? expectedDate.getDate().toString() : `0${expectedDate.getDate()}`;
    const expectedDateString = `${expectedDayString}/${expectedMonthString}/${expectedDate.getFullYear()}`;
    
    await expect(inputElement).toHaveValue(expectedDateString);
  });

  test("Date Example - Click on Clear", async ({ page }) => {
    await page.locator('#sandbox-container1 i').click();
    await page.getByRole('cell', { name: 'Today' }).click();
    await page.locator('#sandbox-container1 i').click();
    await page.getByRole('cell', { name: 'Clear' }).click();

    const inputElement = await page.locator('#sandbox-container1 > div > input');
    const inputValue = await inputElement.inputValue();

    await expect(inputElement).toHaveValue('');
  });

  test('Date Range Example', async ({ page }) => {
    const startDateInput = await page.getByPlaceholder('Start date');
    const endDateInput = await page.getByPlaceholder('End date');

    const startDate = '11/05/2020';
    const endDate = '19/05/2020';

    await startDateInput.fill(startDate);
    await endDateInput.fill(endDate);

    await expect(startDateInput).toHaveValue(startDate);
    await expect(endDateInput).toHaveValue(endDate);
  });

  test('Date Range Example - end date before start date', async ({ page }) => {
    const startDateInput = await page.getByPlaceholder('Start date');
    const endDateInput = await page.getByPlaceholder('End date');

    const expectedDate = '11/05/2020';
    const expectedMonthYear = 'May 2020';
    const startDay = '19';
    const endDay = '11';

    // start date setup
    await startDateInput.click();
    let backwardElement = await page.getByRole('cell', { name: '«' });
    let dateElement = await page.locator('body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > thead > tr:nth-child(2) > th.datepicker-switch');

    let currentMonthYear = await dateElement.textContent();
    while (currentMonthYear !== expectedMonthYear) {
      await backwardElement.click();
      currentMonthYear = await dateElement.textContent();
    }
    await page.getByRole('cell', { name: startDay }).click();
    
    // end date setup
    await endDateInput.click();
    backwardElement = await page.getByRole('cell', { name: '«' });
    dateElement = await page.locator('body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > thead > tr:nth-child(2) > th.datepicker-switch');
    
    currentMonthYear = await dateElement.textContent();
    while (currentMonthYear !== expectedMonthYear) {
      await backwardElement.click();
      currentMonthYear = await dateElement.textContent();
    }
    await page.getByRole('cell', { name: endDay }).click();

    // check dates
    await expect(endDateInput).toHaveValue(expectedDate);
    await expect(startDateInput).toHaveValue(expectedDate);
  });
});
