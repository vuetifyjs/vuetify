import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'url'

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
        setupFiles: ['../test/setup/to-have-been-warned.ts'],
        reporters: process.env.GITHUB_ACTIONS
          ? [['default', { summary: false }], 'github-actions']
          : [IS_RUN ? 'dot' : ['default', { summary: false }]],
        coverage: {
          provider: 'v8',
          reporter: ['html'],
          clean: true,
        },
      },
    })
  )
})
