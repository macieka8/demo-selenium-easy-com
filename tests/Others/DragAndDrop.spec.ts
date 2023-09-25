import { test, expect } from '@playwright/test';

test.describe('Drag And Drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/drag-and-drop-demo.html');
  });

  test('Drag&Drop one', async ({ page }) => {
    const dropzone = await page.locator('#mydropzone');
    const draggable = await page.getByText('Draggable 1');
    
    await draggable.dragTo(dropzone);
    
    const droppedElement = await page.locator('#droppedlist').locator('span');
    await expect(droppedElement).toBeDefined();
    await expect(droppedElement).toHaveText('Draggable 1');

    const draggables = await page.locator('#todrag').locator('span').all();
    const expected = [ 'Draggable 2', 'Draggable 3', 'Draggable 4' ];
    for (let i = 0; i < expected.length; i++) {
      await expect(draggables[i]).toBeDefined();
      await expect(draggables[i]).toHaveText(expected[i]);
    }
  });

  test('Drag&Drop all', async ({ page }) => {
    const expectedStrings = [
      'Draggable 1',
      'Draggable 2',
      'Draggable 3',
      'Draggable 4',
    ];
    const dropzone = await page.locator('#mydropzone');
    const draggables = await page.locator('#todrag').locator('span').all();
    
    for (let i = 0; i < 4; i++) {
      const draggable = draggables[0];
      await draggable.dragTo(dropzone);
    }
    
    await expect(page.locator('#todrag').locator('span')).toHaveCount(0);
    const droppedElements = await page.locator('#droppedlist').locator('span').all();
    for (let i = 0; i < expectedStrings.length; i++) {
      await expect(droppedElements[i]).toBeDefined();
      await expect(droppedElements[i]).toHaveText(expectedStrings[i]);
    }
  });
});
