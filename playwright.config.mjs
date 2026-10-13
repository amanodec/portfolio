import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/gallery.smoke.spec.mjs',
  workers: 2,
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4180',
    colorScheme: 'light',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'npm run dev -- --port 4180',
    url: 'http://127.0.0.1:4180',
    reuseExistingServer: true,
    timeout: 30_000
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { browserName: 'chromium', ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } }
  ]
});
