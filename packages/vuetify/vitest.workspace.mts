import { defineWorkspace } from 'vitest/config'
import { commands } from './test/setup/browser-commands'
import { fileURLToPath } from 'url'

export default defineWorkspace([
  {
    extends: './vitest.config.mts',
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
    extends: './vitest.config.mts',
    test: {
      name: 'browser',
      include: ['**/*.spec.browser.{ts,tsx}'],
      setupFiles: ['../test/setup/browser-setup.ts'],
      bail: process.env.TEST_BAIL ? 1 : undefined,
      slowTestThreshold: Infinity,
      browser: {
        enabled: true,
        provider: 'webdriverio',
        ui: false,
        headless: !process.env.TEST_BAIL,
        commands,
        instances: [{
          browser: 'chrome',
          capabilities: {
            'goog:chromeOptions': {
              // @ts-ignore
              args: ['--start-maximized', process.env.TEST_BAIL && '--auto-open-devtools-for-tabs'].filter(v => !!v),
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
