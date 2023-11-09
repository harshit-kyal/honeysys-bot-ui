import { test, expect } from '@playwright/test';
import { TESTING_URL } from "../src/utils/constant";

test('test 1', async ({ page }) => {
  await page.goto(`${TESTING_URL}/login`);
  await page.waitForTimeout(15000); 
  await page.getByText('Log in and Embrace the Retail Revolution');
  await page.getByRole('button', { name: 'Get Started right' }).click();
  await page.getByText('Enter Mobile No').isVisible();
});
test('test 2', async ({ page }) => {
  await page.goto(`${TESTING_URL}/login`);
  await page.waitForTimeout(15000); 
  await page.getByText('Log in and Embrace the Retail Revolution');
  await page.getByPlaceholder('Enter your mobile number').fill('9825690120');
  await page.getByRole('button', { name: 'Get Started right' }).click();
  await page.getByText('Check Term and conditions').isVisible();
});
test('test 3', async ({ page }) => {
  await page.goto(`${TESTING_URL}/login`);
  await page.waitForTimeout(15000); 
  await page.getByText('Log in and Embrace the Retail Revolution');
  await page.getByPlaceholder('Enter your mobile number').fill('9825690120');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Get Started right' }).click();
  await page.getByText('Enter Varification Cdde').isVisible();
});
