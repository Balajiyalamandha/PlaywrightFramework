import { test, expect } from '../fixtures/baseFixture';
import loginData from '../testdata/loginData.json';
//import { sleep } from '../utils/common';

const validUser = loginData.find((data) => data.expectSuccess)!;
const invalidUser = loginData.find((data) => !data.expectSuccess)!;

test.describe('Authentication Tests', () => {

    test('User sees error with invalid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(invalidUser.username, invalidUser.password);

        await expect(page.getByText('Invalid email or password')).toBeVisible();
        await page.pause(); // opens Playwright Inspector and halts here — window won't close
   
    });

     test('User can login with valid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);

        await expect(page).toHaveURL(/post-login/);
       //await expect(page.locator('#dashboard-widget')).toBeVisible(); // waits only as long as needed
        await page.pause(); // opens Playwright Inspector and halts here — window won't close 
    });
});
