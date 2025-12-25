import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// Import dotenv from 'dotenv';
// Import path from 'path';
// Dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },

        /* Test against mobile viewports. */
        // {
        //   Name: 'Mobile Chrome',
        //   Use: { ...devices['Pixel 5'] },
        // },
        // {
        //   Name: 'Mobile Safari',
        //   Use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   Name: 'Microsoft Edge',
        //   Use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   Name: 'Google Chrome',
        //   Use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    testDir: "./tests",

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // BaseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Run your local dev server before starting the tests */
    // WebServer: {
    //   Command: 'npm run start',
    //   Url: 'http://localhost:3000',
    //   ReuseExistingServer: !process.env.CI,
    // },
});
