import { defineWorkspace } from 'vitest/config'
import { commands } from './test/setup/browser-commands.ts'

export default defineWorkspace([
  {
    extends: './vitest.config.mts',
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
      browser: {
        enabled: true,
        provider: 'webdriverio',
        name: 'chrome',
        ui: false,
        headless: !process.env.TEST_BAIL,
        commands,
        viewport: {
          width: 1280,
          height: 800,
        },
        providerOptions: {
          capabilities: {
            'goog:chromeOptions': {
              args: ['--start-maximized', process.env.BAIL && '--auto-open-devtools-for-tabs'].filter(v => !!v),
            },
          },
        },
      },
    },
  },
])
