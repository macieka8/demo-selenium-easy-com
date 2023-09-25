import { test, expect } from '@playwright/test';

test.describe('Table Filter Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/table-records-filter-demo.html');
  });

  test('green filter', async ({ page }) => {
    await page.getByRole('button', { name: 'Green' }).click();
    const visibleRows = await page.locator('//*/table/tbody/tr[not(contains(@style, "display: none"))]').all();
    
    await expect(visibleRows).toHaveLength(2);
    for (const row of visibleRows) {
      await expect(row).toHaveAttribute('data-status', 'pagado');
    }
  });

  test('orange filter', async ({ page }) => {
    await page.getByRole('button', { name: 'Orange' }).click();
    const visibleRows = await page.locator('//*/table/tbody/tr[not(contains(@style, "display: none"))]').all();
    
    await expect(visibleRows).toHaveLength(2);
    for (const row of visibleRows) {
      await expect(row).toHaveAttribute('data-status', 'pendiente');
    }
  });

  test('red filter', async ({ page }) => {
    await page.getByRole('button', { name: 'Red' }).click();
    const visibleRows = await page.locator('//*/table/tbody/tr[not(contains(@style, "display: none"))]').all();
    
    await expect(visibleRows).toHaveLength(1);
    for (const row of visibleRows) {
      await expect(row).toHaveAttribute('data-status', 'cancelado');
    }
  });
});
