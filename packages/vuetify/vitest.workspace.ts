import { defineWorkspace } from 'vitest/config'
import { commands } from './test/setup/browser-commands'
import { fileURLToPath } from 'node:url'

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    resolve: {
      alias: {
        // Vite logs a warning for this even if we just re-export it without using anything
        '@vitest/browser/context': fileURLToPath(new URL('test/contextStub.ts', import.meta.url)),
      },
    },
    test: {
      name: 'unit',
      include: ['**/*.spec.{ts,tsx}'],
      setupFiles: ['../test/setup/unit-setup.ts'],
      environment: 'jsdom',
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      name: 'browser',
      include: ['**/*.spec.browser.{ts,tsx}'],
      setupFiles: ['../test/setup/browser-setup.ts'],
      bail: process.env.TEST_BAIL ? 1 : undefined,
      browser: {
        enabled: true,
        provider: 'webdriverio',
        ui: false,
        headless: !process.env.TEST_BAIL,
        screenshotDirectory: '../test/__screenshots__',
        commands,
        instances: [{
          browser: 'chrome',
          capabilities: {
            browserVersion: '136',
            'goog:chromeOptions': {
              args: [
                '--start-maximized',
                process.env.TEST_BAIL && '--auto-open-devtools-for-tabs',
                // I have no idea why this is needed, it throws "WebDriverError: session
                // not created: probably user data directory is already in use" without it
                process.env.CI && '--no-sandbox',
              ].filter(v => !!v) as string[],
            },
          },
        }],
        viewport: {
          width: 1280,
          height: 800,
        },
      },
    },
  },
])
