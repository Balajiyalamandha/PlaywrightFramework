import { test, expect } from '../fixtures/baseFixture'; 
import loginData from '../testdata/loginData.json';
//import { sleep } from '../utils/common';

const validUser = loginData.find((data) => data.expectSuccess)!;
const invalidUser = loginData.find((data) => !data.expectSuccess)!;

test.describe('Authentication Tests', () => {
 test('User can login with valid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL(/post-login/);
    
   
    });
      
    });
 test('User sees error with invalid credentials', async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(invalidUser.username, invalidUser.password);

        await expect(page.getByText('Invalid email or password')).toBeVisible();
        });


       /*test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
   
    });*/
