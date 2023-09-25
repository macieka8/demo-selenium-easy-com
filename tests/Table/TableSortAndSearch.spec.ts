import { test, expect } from '@playwright/test';

test.describe('Table Sort And Search Demo', () => {
  const maxEntries = 32;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/table-sort-search-demo.html');
  });

  const searchTestData = [
    {
      searchBy: 'Name',
      searchQuery:'wilder',
    },
    {
      searchBy: 'Position',
      searchQuery: 'software engineer',
    },
    {
      searchBy: 'Office',
      searchQuery: 'new york',
    },
    {
      searchBy: 'Age',
      searchQuery: '66',
    },
    {
      searchBy: 'Start date',
      searchQuery: 'Wed 22nd Dec 10',
    },
    {
      searchBy: 'Salary',
      searchQuery: '$90,560/y',
    },
  ];

  for (const {searchBy, searchQuery} of searchTestData)
  {
    test(`search by ${searchBy}`, async ({ page }) => {
      const searchBar = await page.getByLabel('Search:');

      await searchBar.fill(searchQuery);

      const tableRows = await page.locator('//*/table/tbody/tr').all();
      for (const row of tableRows) {
        await expect(row).toContainText(searchQuery, { ignoreCase: true });
      }
    });
  }

  const countEntriesTestData = [
    {
      entriesPerPage: 10,
    },
    {
      entriesPerPage: 25,
    },
    {
      entriesPerPage: 50,
    },
    {
      entriesPerPage: 100,
    },
  ];

  for (const { entriesPerPage } of countEntriesTestData) {
    test(`${entriesPerPage} entries per page`, async ({ page }) => {
    const showEntriesSelect = await page.getByLabel('Show 102550100 entries');
    const rowCountInfo = await page.locator('#example_info');

    await showEntriesSelect.selectOption(entriesPerPage.toString());

    const tableRows = await page.locator('//*/table/tbody/tr');
    const expectedCount = entriesPerPage > maxEntries ? maxEntries : entriesPerPage;
    await expect(tableRows).toHaveCount(expectedCount);
    await expect(rowCountInfo).toHaveText(`Showing 1 to ${expectedCount} of ${maxEntries} entries`);
    });
  }

  const defaultOrderName = 'Name';
  const orderTestData = [
    {
      orderByName: 'Name',
      expectedResult: ['A. Cox', 'A. Ramos', 'A. Satou'],
      isAscending: true,
    },
    {
      orderByName: 'Name',
      expectedResult: ['Y. Berry', 'T. Nixon', 'T. Fitzpatrick'],
      isAscending: false,
    },
    {
      orderByName: 'Position',
      expectedResult: ['Accountant', 'Accountant', 'Chief Executive Officer (CEO)', 'Chief Financial Officer (CFO)'],
      isAscending: true,
    },
    {
      orderByName: 'Position',
      expectedResult: ['Systems Administrator	', 'System Architect', 'Support Lead', 'Software Engineer'],
      isAscending: false,
    },
    {
      orderByName: 'Office',
      expectedResult: ['Edinburgh', 'Edinburgh', 'Edinburgh', 'Edinburgh', 'Edinburgh', 'Edinburgh', 'London'],
      isAscending: true,
    },
    {
      orderByName: 'Office',
      expectedResult: ['Tokyo', 'Tokyo', 'Tokyo', 'Tokyo', 'Singapore'],
      isAscending: false,
    },
    {
      orderByName: 'Age',
      expectedResult: ['T. Fitzpatrick', 'S. Itou', 'C. Vance'],
      isAscending: true,
    },
    {
      orderByName: 'Age',
      expectedResult: ['A. Cox', 'M. Silva', 'P. Byrd'],
      isAscending: false,
    },
    {
      orderByName: 'Start date',
      expectedResult: ['Thu 16th Oct 08', 'Fri 28th Nov 08', 'Sat 13th Dec 08'],
      isAscending: true,
    },
    {
      orderByName: 'Start date',
      expectedResult: ['Sun 3rd Mar 13', 'Tue 18th Dec 12', 'Sun 2nd Dec 12'],
      isAscending: false,
    },
    {
      orderByName: 'Salary',
      expectedResult: ['$85,600/y', '$86,000/y', '$90,560/y'],
      isAscending: true,
    },
    {
      orderByName: 'Salary',
      expectedResult: ['$1,200,000/y', '$850,000/y', '$725,000/y'],
      isAscending: false,
    },
  ];

  for (const { orderByName, expectedResult, isAscending } of orderTestData) {
    test(`order by ${orderByName}, ${isAscending ? 'Ascending 🔼' : 'Descending ⬇️'}`, async ({ page }) => {
      const sortBy = await page.getByText(orderByName, { exact: true });
  
      if (orderByName !== defaultOrderName) await sortBy.click();
      if (!isAscending) await sortBy.click();
      
      const tableRows = await page.locator('//*/table/tbody/tr').all();
      for (let i = 0; i < expectedResult.length; i++) {
        await expect(tableRows[i]).toContainText(expectedResult[i], { ignoreCase: true });
      }
    });
  }
});
