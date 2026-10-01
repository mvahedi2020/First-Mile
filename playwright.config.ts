import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:4186/First-Mile/', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4186/First-Mile/', reuseExistingServer: false },
})
