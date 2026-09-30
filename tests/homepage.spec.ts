import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';        // ← add this
import { HomePage } from '../pages/homePage';          // ← if you have one
import loginData from '../testdata/loginData.json';

const validUser = loginData.find((data) => data.expectSuccess)!;

test('login and go to Home', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Home' }).click();
});