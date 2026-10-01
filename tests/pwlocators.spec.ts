import { test, expect } from "@playwright/test";

test("Verify Page Locators", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/");

  // Logo is visible
  const logo = page.getByAltText("practicetestautomation");
  await expect(logo).toBeVisible();

  // Welcome text is visible
  await expect(page.getByText("Hello")).toBeVisible();

  // Navigate to Register page
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

  // Fill the form
  await page.getByLabel("First name", { exact: true }).fill("Balaji");
  await page.getByLabel("Last name", { exact: true }).fill("Y");
  await page.getByLabel("Email", { exact: true }).fill("balaji@gmail.com");

  // Verify the values were entered
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue("Balaji");
  await expect(page.getByLabel("Last name", { exact: true })).toHaveValue("Y");
  await expect(page.getByLabel("Email", { exact: true })).toHaveValue("balaji@gmail.com");
});