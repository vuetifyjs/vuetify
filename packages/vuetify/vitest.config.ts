import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { vizzlyPlugin } from '@vizzly-testing/vitest'
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
        vizzlyPlugin(),
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
      define: {
        'process.env.TEST_TDD_ONLY': process.env.TEST_TDD_ONLY,
      },
      test: {
        watch: false,
        slowTestThreshold: Infinity,
        setupFiles: ['../test/setup/to-have-been-warned.ts'],
        reporters: process.env.GITHUB_ACTIONS
          ? [['default', { summary: false }], 'github-actions']
          : [IS_RUN ? 'dot' : ['default', { summary: false }]],
        attachmentsDir: '../test/__attachments__',
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
                provider: playwright({
                  actionTimeout: 5000,
                  contextOptions: {
                    reducedMotion: 'reduce',
                    permissions: ['clipboard-write', 'clipboard-read'],
                  },
                  launchOptions: {
                    ignoreDefaultArgs: ['--hide-scrollbars'],
                    args: [
                      '--start-maximized',
                      '--disable-infobars',
                      process.env.TEST_BAIL && '--auto-open-devtools-for-tabs',
                    ].filter(v => v != null),
                  },
                }),
                ui: false,
                headless: !process.env.TEST_BAIL,
                screenshotDirectory: '../test/__screenshots__',
                commands,
                instances: [{
                  browser: 'chromium',
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
