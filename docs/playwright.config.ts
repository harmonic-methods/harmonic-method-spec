import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:3500', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3500/docs',
    reuseExistingServer: !process.env.CI,
  },
});
