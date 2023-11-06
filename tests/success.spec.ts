import { test, expect } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";

test("test", async ({ page }) => {
  await page.goto(`${TESTING_URL}/success`);
  await page.getByRole("img", { name: "happy_sun_image" });
  await page.getByText("Congratulations!");
  await page.getByRole("button", { name: "Let's Go right" }).click();
});
