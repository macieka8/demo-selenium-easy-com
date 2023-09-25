import { Locator, Page } from '@playwright/test';

export async function getLeftList(page: Page): Promise<Locator[]> {
  const leftList = await page.locator('.list-group').first();
  return leftList.locator('li').all();
}

export async function getRightList(page: Page): Promise<Locator[]> {
  const leftList = await page.locator('.list-group').nth(1);
  return leftList.locator('li').all();
}

export async function getLeftSearchBar(page: Page): Promise<Locator> {
    return page.getByPlaceholder('search').first();
}

export async function getRightSearchBar(page: Page): Promise<Locator> {
  return page.getByPlaceholder('search').first();
}

export async function getMoveToLeftButton(page: Page): Promise<Locator> {
  return page.getByRole('button', { name: '' });
}

export async function getMoveToRightButton(page: Page): Promise<Locator> {
  return page.getByRole('button', { name: '' });
}

export async function getSelectAllLeftButton(page: Page): Promise<Locator> {
  return page.locator('.btn-group').first();
}

export async function getSelectAllRightButton(page: Page): Promise<Locator> {
  return page.locator('.btn-group').nth(1);
}