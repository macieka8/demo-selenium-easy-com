import { test, expect } from '@playwright/test';

test.describe('JQuery UI Progress bar - Download Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/jquery-download-progress-bar-demo.html');
  });

  test('download success', async ({ page }) => {
    const downloadButton = await page.locator('#downloadButton');
    const progressLabel = await page.locator('.progress-label');
    const downloadInfoDiv = await page.locator('body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable');
    
    await downloadButton.click();
    
    await expect(downloadInfoDiv).toBeVisible();
    await expect(progressLabel).toHaveText('Complete!', { timeout: 20000});

    const closeButton = await page.getByRole('button', { name: 'Close' });
    await closeButton.click();

    await expect(downloadInfoDiv).toBeHidden();
  });

  test('download cancel', async ({ page }) => {
    const downloadButton = await page.locator('#downloadButton');
    const downloadInfoDiv = await page.locator('body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable');

    await downloadButton.click();

    await expect(downloadInfoDiv).toBeVisible();
    
    const cancelButon = await page.getByRole('button', { name: 'Cancel Download' });
    await cancelButon.click();

    await expect(downloadInfoDiv).toBeHidden();
  });
});
