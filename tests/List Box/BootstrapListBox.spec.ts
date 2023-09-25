import { test, expect } from '@playwright/test';
import * as PageHelper from '../../Pages/BootstrapListBoxPage';

// moving elemnts does not update search result
test.describe('Bootstrap List Box', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/bootstrap-dual-list-box-demo.html');
  });

  test('move one from left to right', async ({ page }) => {
    const expectedLeftListStrings = [
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
    ];
    const expectedRightListStrings = [
      'Cras justo odio',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
      'bootstrap-duallist ',
    ];
    const leftList = await PageHelper.getLeftList(page);
    const moveToRightButton = await PageHelper.getMoveToRightButton(page);

    await leftList[0].click();
    await moveToRightButton.click();

    const leftListAfterChange = await PageHelper.getLeftList(page);
    for (let i = 0; i < expectedLeftListStrings.length; i++) {
      await expect(leftListAfterChange[i]).toHaveText(expectedLeftListStrings[i]);
    }
    const rightListAfterChange = await PageHelper.getRightList(page);
    for (let i = 0; i < expectedRightListStrings.length; i++) {
      await expect(rightListAfterChange[i]).toHaveText(expectedRightListStrings[i]);
    }
  });

  test('move one from right to left', async ({ page }) => {
    const expectedLeftListStrings = [
      'bootstrap-duallist ',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
      'Cras justo odio',
    ];
    const expectedRightListStrings = [
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
    ];
    const rightList = await PageHelper.getRightList(page);
    const moveToLeftButton = await PageHelper.getMoveToLeftButton(page);

    await rightList[0].click();
    await moveToLeftButton.click();

    const leftListAfterChange = await PageHelper.getLeftList(page);
    for (let i = 0; i < expectedLeftListStrings.length; i++) {
      await expect(leftListAfterChange[i]).toHaveText(expectedLeftListStrings[i]);
    }
    const rightListAfterChange = await PageHelper.getRightList(page);
    for (let i = 0; i < expectedRightListStrings.length; i++) {
      await expect(rightListAfterChange[i]).toHaveText(expectedRightListStrings[i]);
    }
  });

  test('select all on left and move to right', async ({ page }) => {
    const expectedRightListStrings = [
      'Cras justo odio',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
      'bootstrap-duallist ',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
  ];
    const selectAll = await PageHelper.getSelectAllLeftButton(page);
    const moveToRightButton = await PageHelper.getMoveToRightButton(page);
    
    await selectAll.click();
    await moveToRightButton.click();

    const leftList = await PageHelper.getLeftList(page);
    expect(leftList).toHaveLength(0);
    const rightList = await PageHelper.getRightList(page);
    for (let i = 0; i < expectedRightListStrings.length; i++) {
      await expect(rightList[i]).toHaveText(expectedRightListStrings[i]);
    }
  });

  test('select all on right and move to left', async ({ page }) => {
    const expectedLeftListStrings = [
      'bootstrap-duallist ',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
      'Cras justo odio',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros',
  ];
    const selectAll = await PageHelper.getSelectAllRightButton(page);
    const moveToLeftButton = await PageHelper.getMoveToLeftButton(page);
    
    await selectAll.click();
    await moveToLeftButton.click();

    const rightList = await PageHelper.getRightList(page);
    expect(rightList).toHaveLength(0);
    const leftList = await PageHelper.getLeftList(page);
    for (let i = 0; i < expectedLeftListStrings.length; i++) {
      await expect(leftList[i]).toHaveText(expectedLeftListStrings[i]);
    }
  });
});
