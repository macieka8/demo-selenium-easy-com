import { test, expect } from '@playwright/test';
import { Readable } from 'stream';

test('File download', async ({ page, browser }) => {
  const expectedFileContent = 'Content of downloaded File';
  const textBox = await page.locator('#textbox');
  const generateButton = await page.locator('#create');
  const downloadPromise = page.waitForEvent('download');
  
  await page.goto('https://demo.seleniumeasy.com/generate-file-to-download-demo.html');
  await textBox.fill(expectedFileContent);
  await page.keyboard.press('Escape');
  await generateButton.click();
  await page.getByRole('link', { name: 'Download' }).click();
  const download = await downloadPromise;

  await expect(download.suggestedFilename()).toBe('easyinfo.txt');
  const readStream = await download.createReadStream() as Readable;
  let result = '';
  for await (const chunk of readStream) {
    result += chunk;
  }

  expect(result).toBe(expectedFileContent);
});