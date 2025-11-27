import { defineConfig, mergeConfig } from 'vitest/config'
import { webdriverio } from '@vitest/browser-webdriverio'
import viteConfig from './vite.config'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'node:url'
import { commands } from './test/setup/browser-commands'

const IS_RUN = process.argv.slice(2).some(v => v === 'run')

export default defineConfig(configEnv => {
  return mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      root: './src',
      resolve: {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          '@test': fileURLToPath(new URL('test/index.ts', import.meta.url)),
        },
      },
      optimizeDeps: {
        exclude: ['@vue/test-utils'],
      },
      plugins: [
        AutoImport({
          include: '**/*.spec.?(browser.)@(ts|tsx)',
          imports: {
            vitest: [
              'describe',
              'it',
              'expect',
              'assert',
              'vi',
              'beforeAll',
              'afterAll',
              'beforeEach',
              'afterEach',
            ],
          },
          dts: true,
        }),
      ],
      server: {
        hmr: false,
        preTransformRequests: false,
      },
      clearScreen: !IS_RUN,
      test: {
        watch: false,
        slowTestThreshold: Infinity,
        setupFiles: ['../test/setup/to-have-been-warned.ts'],
        reporters: process.env.GITHUB_ACTIONS
          ? [['default', { summary: false }], 'github-actions']
          : [IS_RUN ? 'dot' : ['default', { summary: false }]],
        coverage: {
          provider: 'istanbul',
          reporter: ['html', 'text-summary'],
          clean: true,
          reportsDirectory: '../coverage',
        },
        projects: [
          {
            extends: true,
            resolve: {
              alias: {
                // Vite logs a warning for this even if we just re-export it without using anything
                'vitest/browser': fileURLToPath(new URL('test/contextStub.ts', import.meta.url)),
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
            extends: true,
            test: {
              name: 'browser',
              include: ['**/*.spec.browser.{ts,tsx}'],
              setupFiles: ['../test/setup/browser-setup.ts'],
              bail: process.env.TEST_BAIL ? 1 : undefined,
              browser: {
                enabled: true,
                provider: webdriverio({
                  capabilities: {
                    browserVersion: '142',
                    'goog:chromeOptions': {
                      args: [
                        '--start-maximized',
                        '--disable-infobars',
                        process.env.TEST_BAIL && '--auto-open-devtools-for-tabs',
                        // I have no idea why this is needed, it throws "WebDriverError: session
                        // not created: Chrome instance exited" without it
                        process.env.CI && '--no-sandbox',
                      ].filter(v => !!v) as string[],
                    },
                  },
                }),
                ui: false,
                headless: !process.env.TEST_BAIL,
                screenshotDirectory: '../test/__screenshots__',
                commands,
                instances: [{
                  browser: 'chrome',
                }],
                viewport: {
                  width: 1280,
                  height: 800,
                },
              },
            },
          },
        ],
      },
    })
  )
})
