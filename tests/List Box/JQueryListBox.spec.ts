import { test, expect } from '@playwright/test';

test.describe('Bootstrap List Box', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/jquery-dual-list-box-demo.html');
  });

  test('add one item', async ({ page }) => {
    const expectedleftList = [
      'Isis',
      'Alice',
      'Isabella',
      'Manuela',
      'Laura',
      'Luiza',
      'Valentina',
      'Giovanna',
      'Maria Eduarda',
      'Helena',
      'Beatriz',
      'Maria Luiza',
      'Lara',
      'Julia',
    ];

    await page.getByRole('option', { name: 'Sophia'}).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const leftList = await page.getByRole('listbox').first().locator('option').all();
    for (let i = 0; i < expectedleftList.length; i++) {
      await expect(leftList[i]).toHaveText(expectedleftList[i]);
    }
    await expect(page.getByRole('listbox').nth(1).locator('option').first()).toHaveText('Sophia');
  });

  test('add multiple items', async ({ page }) => {
    const expectedleftList = [
      'Isis',
      'Alice',
      'Isabella',
      'Manuela',
      'Laura',
      'Valentina',
      'Giovanna',
      'Maria Eduarda',
      'Beatriz',
      'Maria Luiza',
      'Lara',
      'Julia',
    ];

    const expectedRightList = [
      'Sophia',
      'Luiza',
      'Helena',
    ];

    await page.keyboard.down('Control');
    await page.getByRole('option', { name: 'Sophia'}).click();
    await page.getByRole('option', { name: 'Luiza', exact: true }).click();
    await page.getByRole('option', { name: 'Helena'}).click();
    await page.keyboard.up('Control');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const leftList = await page.getByRole('listbox').first().locator('option').all();
    for (let i = 0; i < expectedleftList.length; i++) {
      await expect(leftList[i]).toHaveText(expectedleftList[i]);
    }
    const rightList = await page.getByRole('listbox').nth(1).locator('option').all();
    for (let i = 0; i < expectedRightList.length; i++) {
      await expect(rightList[i]).toHaveText(expectedRightList[i]);
    }
  });

  test('add all items', async ({ page }) => {
    const expectedRightList = [
      'Isis',
      'Sophia',
      'Alice',
      'Isabella',
      'Manuela',
      'Laura',
      'Luiza',
      'Valentina',
      'Giovanna',
      'Maria Eduarda',
      'Helena',
      'Beatriz',
      'Maria Luiza',
      'Lara',
      'Julia',
    ];

    await page.getByRole('button', { name: 'Add All', exact: true }).click();

    const leftList = await page.getByRole('listbox').first().locator('option').all();
    expect(leftList).toHaveLength(0);
    const rightList = await page.getByRole('listbox').nth(1).locator('option').all();
    for (let i = 0; i < expectedRightList.length; i++) {
      await expect(rightList[i]).toHaveText(expectedRightList[i]);
    }
  });
});
