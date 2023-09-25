import { test, expect } from '@playwright/test';

// clicking download multiple times speeds up download progress
test.describe('Bootstrap Progress bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-download-progress-demo.html');
  })

  const procentageToReach = 50;
  test(`progress bar reached ${procentageToReach}%`, async ({ page }) => {
    const downloadButton = await page.getByRole('button', { name: 'Download size: 20480kb' });
    const procentageText = await page.locator('.percenttext');

    await downloadButton.click();
    await page.waitForFunction((procentage) => {
      const element = document.getElementsByClassName('percenttext');
      if (!element) return false;
      const text = element[0].textContent;
      if (!text) return false;
      const progressNumber = parseInt(text, 10);
      return progressNumber >= procentage;
    }, procentageToReach);
    
    const text = await procentageText.textContent() as string;
    const procentage = parseInt(text, 10);
    await expect(procentage).toBeGreaterThanOrEqual(procentageToReach);
  });
});
