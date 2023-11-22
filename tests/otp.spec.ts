import { test, expect } from "@playwright/test";
import { render, screen } from "@testing-library/react";
import { TESTING_URL } from "../src/utils/constant";
import { request } from "http";

test("test 1 - empty or not", async ({ page }) => {
  await page.goto(`${TESTING_URL}/otp`);
  await page.getByRole("button", { name: "Verify & Continue" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Please enter OTP$/ })
    .nth(2)
    .click();
});
test("test 2 - working or not", async ({ page }) => {
  await page.goto(`${TESTING_URL}/otp`);
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().fill("5");
  await page.getByRole("textbox").nth(1).fill("5");
  await page.getByRole("textbox").nth(2).fill("5");
  await page.getByRole("textbox").nth(3).fill("5");
  await page.getByRole("button", { name: "Verify & Continue" }).click();
  // const response = await page.post("http://localhost:3000/botApi", {
  //   loginId: 82000813061,
  //   otp: 123333,
  //   action: "genrateAccessToken",
  //   clientName: "honeySys",
  // });
});
