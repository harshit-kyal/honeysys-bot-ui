import { test, expect } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";
const addressDetailsURL = `${TESTING_URL}/addressDetails`;
test("test 1", async ({ page }) => {
  await page.goto(`${TESTING_URL}/otp`);
  await page.route("**/api/otp", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 200,
        data: {
          access_token: "123", // Replace with the actual access token
        },
      }),
    });
  });
  // let accessToken = "123";
  // Check if the access token is present in the localStorage
  const accessToken = await page.evaluate(() =>
    localStorage.getItem("accessToken")
  );
  if (accessToken === "123") {
    // Token is present, navigate to the ContactDetails page
    await page.goto(addressDetailsURL);

    //   await page.getByText('Add New Address');
    //   await page.click('text:has-text("Add New Address")');
    //   expect(page.goto(`${TESTING_URL}/address`));
    // Click the "Save & Send Address" button
    await page.click('button:has-text("Save")');

    expect(page.goto(`${TESTING_URL}`));
  } else {
    // If token is not present, navigate to the login page
    await page.goto(`${TESTING_URL}/splash`);
    await page.getByRole("img", { name: "logo" });
    await page.getByText(
      "Unleash the Future with Our Bot Powered Ecommerce Platform!"
    );
    await page.getByRole("img", { name: "landingimage" });
    await page.getByText(
      "Introducing the cutting-edge Bot Powered Ecommerce Platform – the next evolution"
    );
    // You can add more assertions for elements on the login page if needed
  }
});
