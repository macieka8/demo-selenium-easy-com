import { test, expect } from '@playwright/test';

// `Table has total 15 records` -> only 13
test.describe('Table Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/table-pagination-demo.html');
  });

  test('check rows visibility on pages', async ({ page }) => {
    const pageCount = 3;
    for (let pageId = 1; pageId <= pageCount; pageId++) {
      for (let rowId = 1; rowId <= 13; rowId++) {
        if (rowId > 13) continue;
        const rowIdElement = await page.locator(`//*[@id="myTable"]/tr[${rowId}]/td[1]`);
        const minVisibleId = (pageId - 1) * 5 + 1;
        const maxVisibleId = (pageId - 1) * 5 + 5;
        const shouldBeVisible = rowId <= maxVisibleId && rowId >= minVisibleId;
        await expect(rowIdElement).toBeVisible({ visible: shouldBeVisible});
      }
      if (pageId >= pageCount) break;
      await page.getByRole('link', { name: '»' }).click();
    }
  });

  test('navigation buttons first page', async ({ page }) => {
    const nextButton = await page.getByRole('link', { name: '»' });
    const prevButton = await page.getByRole('link', { name: '«' });
    const activePage = await page.locator('#myPager > li.active');

    await expect(activePage).toContainText('1');
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeHidden();
  });

  test('navigation buttons middle page', async ({ page }) => {
    const nextButton = await page.getByRole('link', { name: '»' });
    const prevButton = await page.getByRole('link', { name: '«' });

    page.getByRole('link', { name: '2' }).click();
    const activePage = await page.locator('#myPager > li.active');

    await expect(activePage).toContainText('2');
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();
  });

  test('navigation buttons last page', async ({ page }) => {
    const nextButton = await page.getByRole('link', { name: '»' });
    const prevButton = await page.getByRole('link', { name: '«' });

    page.getByRole('link', { name: '3', exact: true }).click();
    const activePage = await page.locator('#myPager > li.active');

    await expect(activePage).toContainText('3');
    await expect(nextButton).toBeHidden();
    await expect(prevButton).toBeVisible();
  });
});