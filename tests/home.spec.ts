import { test, expect } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";

test("test", async ({ page }) => {
  await page.goto(`${TESTING_URL}`);
  await page
    .locator("div")
    .filter({ hasText: "BotcyBot Powered E-commerce Platform" })
    .nth(2);
  await page.getByPlaceholder('Try searching "Laptops & Electronics"');
  page.on("dialog", async (alert) => {
    const text = alert.defaultValue();
    console.log(text);
    await alert.accept();
  });
});
const { chromium } = require("playwright");

(async () => {
  // const browser = await chromium.launch({ headless: false});
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.grantPermissions(["geolocation"], { origin: `${TESTING_URL}` });
  const page = await context.newPage();
  await page.goto(`${TESTING_URL}`);
  browser.close();
})();
