import { test, expect, Locator } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";
const contactDetailsURL = `${TESTING_URL}/catalog`;
test("test 1", async ({ page }) => {
  // Check if the accessToken is present in localStorage
  //   const accessToken = await page.evaluate(() =>
  //     localStorage.getItem("accessToken")
  //   );
  let accessToken = "123";
  if (!accessToken) {
    // If token is not present, navigate to the login page
    await page.goto(`${TESTING_URL}/splash`);

    // Add assertions to ensure that the login page is loaded
    const loginTitle = await page.textContent('h1:has-text("Login")');
    expect(loginTitle).toContain("Login");

    // You can add more assertions for elements on the login page if needed
  } else {
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
  }
});
