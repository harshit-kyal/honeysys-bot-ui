import { test, expect, Locator } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";
const contactDetailsURL = `${TESTING_URL}/catalog`;
test("test 1", async ({ page }) => {
  // Check if the accessToken is present in localStorage
  //   const accessToken = await page.evaluate(() =>
  //     localStorage.getItem("accessToken")
  //   );

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
    await page.goto(contactDetailsURL);
    await page.getByText(
      "Welcome!!Our intuitive platform ensures that you find exactly what you're looking for, making your shopping experience delightful and efficient"
    );
    await page.getByText("Categories");

    await page.getByRole("dialog", { name: "View all" }).click();
    // locator('span').filter({ hasText: 'View all' })
    expect(page.goto(`${TESTING_URL}/categories/home`));
    await page.getByText("You May Like");
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
