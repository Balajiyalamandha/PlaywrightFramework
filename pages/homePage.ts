// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeNavButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeNavButton = page.getByRole('button', { name: 'Home' });
    }

    async goto() {
        await this.page.goto('/home'); // or full URL
    }

    async clickHomeNav() {
        await this.homeNavButton.click();
    }
}