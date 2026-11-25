import { defineConfig, devices } from '@playwright/test';
import { randomBytes } from 'node:crypto';

// Test-only key, generated in the runner and inherited by the server/workers.
// It lets browser tests exercise signed overrides without any provider account.
process.env.FLAGS_SECRET ??= randomBytes(32).toString('base64');

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:3500', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3500/docs',
    reuseExistingServer: false,
    env: { FLAGS: '', VERCEL_OIDC_TOKEN: '' },
  },
});
