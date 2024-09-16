import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(configEnv => mergeConfig(
  viteConfig(configEnv),
  defineConfig({
    root: './src',
    plugins: [
      AutoImport({
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
    test: {
      watch: false,
      environment: 'jsdom',
      setupFiles: ['../test/index.ts'],
      reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
      coverage: {
        provider: 'v8',
        reporter: ['html'],
        clean: true,
      },
    },
  })
))
