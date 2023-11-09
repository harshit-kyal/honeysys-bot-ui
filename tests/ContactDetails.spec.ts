import { test, expect } from "@playwright/test";
import { TESTING_URL } from "../src/utils/constant";

test("test", async ({ page }) => {
  await page.goto(`${TESTING_URL}/contactDetails`);
  const allFrame = page.frames();
  await page.fill("input[name='mobileNumber']", "1234567893");
  await page.waitForTimeout(3000);
    await page.getByText("Provide Address");
    await page.getByPlaceholder("Enter your name");
    await page.getByPlaceholder("Enter your name").fill("poojan");
    await page.getByPlaceholder("Enter your address");
});

// import { test, expect } from "@playwright/test";
// import { TESTING_URL } from "../src/utils/constant";

// // Define the URL of the ContactDetails page
// const contactDetailsURL = `${TESTING_URL}/contactDetails`;
// test.use({ storageState: { cookies: [], origins: [] } });
// test("Navigate to splash if token is not present in local storage", async ({
//   page,
// }) => {
//   // Check if the accessToken is present in localStorage
//   //   const accessToken = await page.evaluate(() =>
//   //     localStorage.getItem("accessToken")
//   //   );
//   let accessToken = "123";
//   if (!accessToken) {
//     // If token is not present, navigate to the login page
//     await page.goto(`${TESTING_URL}/splash`);

//     // Add assertions to ensure that the login page is loaded
//     const loginTitle = await page.textContent('h1:has-text("Login")');
//     expect(loginTitle).toContain("Login");

//     // You can add more assertions for elements on the login page if needed
//   } else {
//     // Token is present, navigate to the ContactDetails page
//     await page.goto(contactDetailsURL);

//     // Fill in the form fields with valid data
//     await page.fill('input[name="name"]', "John Doe");
//     await page.fill('input[name="address"]', "123 Main St");
//     await page.fill('input[name="landmark"]', "Park");
//     await page.fill('input[name="city"]', "New York");
//     await page.fill('input[name="state"]', "NY");

//     // Click the "Save & Send Address" button
//     await page.click('button:has-text("Save & Send Address")');

//     // Wait for the success page or any other expected behavior after submitting the form
//     // Replace "your-expected-element" with the actual selector of the element you expect to see
//     await page.waitForSelector("your-expected-element");

//     // You can add assertions to verify that the form submission was successful
//     // For example, check for a success message or a redirected page
//     const successMessage = await page.textContent(
//       "your-success-message-selector"
//     );
//     expect(successMessage).toContain("Address saved successfully");
//   }
// });

// test("Validation for empty fields", async ({ page }) => {
//   // Navigate to the ContactDetails page
//   //   await page.evaluate(() => localStorage.setItem("accessToken", "123"));
//   //   const accessToken = await page.evaluate(() =>
//   //     localStorage.getItem("accessToken")
//   //   );
//   await page.getByText("Congratulations!");
// //   let accessToken = "123";
// //   if (accessToken) {
// //     await page.goto(contactDetailsURL);

// //     // Click the "Save & Send Address" button without filling in any fields
// //     await page.click('button:has-text("Save & Send Address")');

// //     // Wait for validation error messages to appear
// //     await page.waitForSelector(".text-[red]"); // Replace with the actual selector for validation error messages

// //     // Check that error messages are displayed for each field
// //     const nameError = await page.textContent(
// //       'input[name="name"] + .text-[red]'
// //     );
// //     const addressError = await page.textContent(
// //       'input[name="address"] + .text-[red]'
// //     );
// //     const landmarkError = await page.textContent(
// //       'input[name="landmark"] + .text-[red]'
// //     );

// //     expect(nameError).toContain("Please enter name");
// //     expect(addressError).toContain("Please enter address");
// //     expect(landmarkError).toContain("Please enter landmark");
// //   }
// });

// // You can add more test cases for specific scenarios or edge cases as needed
