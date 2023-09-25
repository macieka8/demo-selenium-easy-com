import { test, expect } from '@playwright/test';

// Tasks Table filter button does nothing
// Listed Users Table only uses one filter at a time
test.describe('Table Data Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/table-search-filter-demo.html');
  });

  test.describe('Tasks Table', () => {
    test('filter by task', async ({ page }) =>{
      const searchBar = await page.getByPlaceholder('Filter by Task / Assignee / Status ');
      const searchFilter = 'browser issues';

      await searchBar.fill(searchFilter);
      await page.keyboard.press('Enter');

      const visibleRows = await page.locator('//*[@id="task-table"]/tbody/tr[not(contains(@style, "display: none"))]/td[2]').all();
      await expect(visibleRows[0]).toContainText(searchFilter, { ignoreCase: true });
    });
    
    test('filter by assignee', async ({ page }) => {
      const searchBar = await page.getByPlaceholder('Filter by Task / Assignee / Status ');
      const searchFilter = 'holden';

      await searchBar.fill(searchFilter);
      await page.keyboard.press('Enter');

      const visibleRows = await page.locator('//*[@id="task-table"]/tbody/tr[not(contains(@style, "display: none"))]/td[3]').all();
      await expect(visibleRows[0]).toContainText(searchFilter, { ignoreCase: true });
      
    });

    test('filter by status', async ({ page }) => {
      const searchBar = await page.getByPlaceholder('Filter by Task / Assignee / Status ');
      const searchFilter = 'in progress';

      await searchBar.fill(searchFilter);
      await page.keyboard.press('Enter');

      const visibleRows = await page.locator('//*[@id="task-table"]/tbody/tr[not(contains(@style, "display: none"))]/td[4]').all();
      await expect(visibleRows).toHaveLength(3);
      for (const row of visibleRows) {
        await expect(row).toContainText(searchFilter, { ignoreCase: true });
      }
    });

    test('search for 3', async ({ page }) => {
      const searchBar = await page.getByPlaceholder('Filter by Task / Assignee / Status ');
      const searchFilter = '3';

      await searchBar.fill(searchFilter);
      await page.keyboard.press('Enter');

      const visibleRows = await page.locator('//*[@id="task-table"]/tbody/tr[not(contains(@style, "display: none"))]').all();
      await expect(visibleRows[0]).toContainText(searchFilter, { ignoreCase: true });
      await expect(visibleRows[0]).toContainText(searchFilter, { ignoreCase: true });
    });
  });

  test.describe('Listed Users', () => {
    const xpathForVisibleRows = '//*/body/div[2]/div/div[2]/div[2]/div/table/tbody/tr[not(contains(@style, "display: none"))]';
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: ' Filter' }).click();
    });

    test('filter by Id', async({ page }) => {
      const filterBar = await page.getByPlaceholder('#');
      const filterContent = '3';

      await filterBar.click();
      await filterBar.fill(filterContent);
      await page.keyboard.press('Enter');
      
      const visibleRows = await page.locator(xpathForVisibleRows).all();

      await expect(visibleRows).toHaveLength(1);
      for (const row of visibleRows) {
        await expect(row).toContainText(filterContent, { ignoreCase: true });
      }
    });

    test('filter by Username', async({ page }) => {
      const filterBar = await page.getByPlaceholder('Username');
      const filterContent = 'jacobs';

      await filterBar.click();
      await filterBar.fill(filterContent);
      await page.keyboard.press('Enter');
      
      const visibleRows = await page.locator(xpathForVisibleRows).all();

      await expect(visibleRows).toHaveLength(1);
      for (const row of visibleRows) {
        await expect(row).toContainText(filterContent, { ignoreCase: true });
      }
    });

    test('filter by First Name', async({ page }) => {
      const filterBar = await page.getByPlaceholder('First Name');
      const filterContent = 'rajano';

      await filterBar.click();
      await filterBar.fill(filterContent);
      await page.keyboard.press('Enter');
      
      const visibleRows = await page.locator(xpathForVisibleRows).all();

      await expect(visibleRows).toHaveLength(1);
      for (const row of visibleRows) {
        await expect(row).toContainText(filterContent, { ignoreCase: true });
      }
    });
    
    test('filter by Last Name', async({ page }) => {
      const filterBar = await page.getByPlaceholder('Last Name');
      const filterContent = 'ka';

      await filterBar.click();
      await filterBar.fill(filterContent);
      await page.keyboard.press('Enter');
      
      const visibleRows = await page.locator(xpathForVisibleRows).all();

      await expect(visibleRows).toHaveLength(2);
      await expect(visibleRows[0]).toContainText('Karano', { ignoreCase: true });
      await expect(visibleRows[1]).toContainText('Kathaniko', { ignoreCase: true });
    });
  });
});
