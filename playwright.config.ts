import { defineConfig, devices } from '@playwright/test';
import path from 'path';

process.loadEnvFile(path.resolve(__dirname, '.env'));

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://200.141.14.53:9090/login',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});