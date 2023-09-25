import { test, expect } from '@playwright/test';

test.describe('Bootstrap Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-modal-demo.html');
  });

  test('Single Modal Example - modal visible', async ({ page }) => {
    const modal = await page.locator('#myModal0');
    
    await expect(modal).toBeHidden();
    await page.getByRole('link', { name: 'Launch modal' }).first().click();
    await expect(modal).toBeVisible();
  });

  test('Single Modal Example close button', async ({ page }) => {
    const modal = await page.locator('#myModal0');
    
    await page.getByRole('link', { name: 'Launch modal' }).first().click();
    await page.getByRole('link', { name: 'Close' }).click();
    await expect(modal).toBeHidden();
  });

  test('Single Modal Example - X button', async ({ page }) => {
    const modal = await page.locator('#myModal0');

    await page.getByRole('link', { name: 'Launch modal' }).first().click();
    await page.getByText('×').first().click();
    await expect(modal).toBeHidden();
  });

  test('Multiple Modal Example - modals visible', async ({ page }) => {
    const fristModal = await page.locator('#myModal');
    const modal2 = await page.locator('#myModal2');

    await expect(fristModal).toBeHidden();
    await expect(modal2).toBeHidden();
    await page.getByRole('link', { name: 'Launch modal' }).nth(1).click();
    await expect(fristModal).toBeVisible();
    await fristModal.getByRole('link', { name: 'Launch modal' }).click();
    await expect(fristModal).toBeVisible();
  });

  test('Multiple Modal Example - madal2 close', async ({ page }) => {
    const fristModal = await page.locator('#myModal');
    const modal2 = await page.locator('#myModal2');

    await page.getByRole('link', { name: 'Launch modal' }).nth(1).click();
    await fristModal.getByRole('link', { name: 'Launch modal' }).click();

    await modal2.getByRole('link', { name: 'Close' }).click();
    await expect(modal2).toBeHidden();
    await expect(fristModal).toBeVisible();
  });

  test('Multiple Modal Example - madal2 X', async ({ page }) => {
    const fristModal = await page.locator('#myModal');
    const modal2 = await page.locator('#myModal2');

    await page.getByRole('link', { name: 'Launch modal' }).nth(1).click();
    await fristModal.getByRole('link', { name: 'Launch modal' }).click();

    await modal2.getByText('×').click();
    await expect(modal2).toBeHidden();
    await expect(fristModal).toBeVisible();
  });
});
