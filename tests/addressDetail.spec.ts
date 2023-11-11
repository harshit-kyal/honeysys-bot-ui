import { test, expect } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";
const contactDetailsURL = `${TESTING_URL}/addressDetails`;
test("test 1", async ({
    page,
  }) => {
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
  
    //   await page.getByText('Add New Address');
    //   await page.click('text:has-text("Add New Address")');
    //   expect(page.goto(`${TESTING_URL}/address`));
      // Click the "Save & Send Address" button
      await page.click('button:has-text("Save")');
  
      expect(page.goto(`${TESTING_URL}`));
    }
  });