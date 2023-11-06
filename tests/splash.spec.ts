import { test, expect } from '@playwright/test';
import { TESTING_URL } from '../src/utils/constant';

test('test', async ({ page }) => {
  await page.goto(`${TESTING_URL}/splash`);
  await page.getByRole('img', { name: 'logo' });
  await page.getByText('Unleash the Future with Our Bot Powered Ecommerce Platform!');
  await page.getByRole('img', { name: 'landingimage' });
  await page.getByText('Introducing the cutting-edge Bot Powered Ecommerce Platform – the next evolution');
  await page.getByRole('button', { name: 'Get Started right' }).click();
});
