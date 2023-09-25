import { test, expect, Locator, Page } from '@playwright/test';

test.describe('Drag & Drop Sliders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.seleniumeasy.com/drag-drop-range-sliders-demo.html');
  });

  const defaultValueTestData = [
    {
      outputId: 'range',
      sliderId: 'slider1',
    },
    {
      outputId: 'rangePrimary',
      sliderId: 'slider2',
    },
    {
      outputId: 'rangeSuccess',
      sliderId: 'slider3',
    },
    {
      outputId: 'rangeInfo',
      sliderId: 'slider4',
    },
    {
      outputId: 'rangeWarning',
      sliderId: 'slider5',
    },
    {
      outputId: 'rangeDanger',
      sliderId: 'slider6',
    },
  ];
  
  for (const { outputId, sliderId } of defaultValueTestData) {
    test(`test default value for ${outputId}`, async ({ page }) => {
      const output = await page.locator(`#${outputId}`);
      const defaultValueHeader = await page.locator(`#${sliderId} > h4`);
      
      const outputText = await output.textContent() as string;
      await expect(defaultValueHeader).toContainText(outputText);
    });
  }

  const sliderTestData = [
    {
      outputId: 'range',
      sliderId: 'slider1',
      expectedValue: 70,
    },
    {
      outputId: 'rangePrimary',
      sliderId: 'slider2',
      expectedValue: 1,
    },
    {
      outputId: 'rangeSuccess',
      sliderId: 'slider3',
      expectedValue: 100,
    },
    {
      outputId: 'rangeInfo',
      sliderId: 'slider4',
      expectedValue: 65,
    },
    {
      outputId: 'rangeWarning',
      sliderId: 'slider5',
      expectedValue: 13,
    },
    {
      outputId: 'rangeDanger',
      sliderId: 'slider6',
      expectedValue: 99,
    },
  ];

  for(const { outputId, expectedValue, sliderId } of sliderTestData) {
    test(`test slide value for ${outputId} to ${expectedValue}`, async ({ page }) => {
      const output = await page.locator(`#${outputId}`);
      const sliderInput = await page.locator(`#${sliderId} > div > input[type=range]`);
  
      const boundingBox = await sliderInput.boundingBox();
      const maxValue = 100;
      const minValue = 1;
      const desiredProcentage = (expectedValue - minValue) / maxValue;
      if (!boundingBox) return;
      
      let desiredPosition = desiredProcentage * boundingBox.width;
      await sliderInput.dragTo(sliderInput, { targetPosition: { x: desiredPosition, y: boundingBox.height / 2 } });

      let outputValue = parseInt(await output.textContent() as string, 10);
      while (outputValue < expectedValue) {
        desiredPosition += 2;
        await sliderInput.dragTo(sliderInput, { targetPosition: { x: desiredPosition, y: boundingBox.height / 2 } });
        outputValue = parseInt(await output.textContent() as string, 10);
      }
      while (outputValue > expectedValue) {
        desiredPosition -= 2;
        await sliderInput.dragTo(sliderInput, { targetPosition: { x: desiredPosition, y: boundingBox.height / 2 } });
        outputValue = parseInt(await output.textContent() as string, 10);
      }

      await expect(output).toHaveText(expectedValue.toString());
    });
  }
});
