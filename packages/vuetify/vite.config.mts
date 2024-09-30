import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { warmup } from 'vite-plugin-warmup'
import { VuetifyComponentResolver, VuetifyDirectiveResolver } from './src/unplugin/components'
import Inspect from 'vite-plugin-inspect'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (file: string) => path.resolve(__dirname, file)

const vuetifyPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const viteSSR = process.env.TEST ? () => null : (await import('vite-ssr/plugin.js').then(m => m.default))

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    root: resolve('dev'),
    server: {
      host: process.env.HOST,
      port: process.env.TEST ? undefined : +(process.env.PORT ?? 8090),
      strictPort: !!process.env.PORT && !process.env.TEST,
    },
    preview: {
      host: process.env.HOST,
      port: +(process.env.PORT ?? 8090),
      strictPort: !!process.env.PORT,
    },
    resolve: {
      alias: [
        { find: /^vuetify$/, replacement: resolve('./src/framework.ts') },
        { find: /^vuetify\/directives$/, replacement: resolve('./src/directives/index.ts') },
        { find: /^vuetify\/(.*)/, replacement: resolve('./$1') },
        { find: /^@\/(.*)/, replacement: resolve('./src/$1') },
      ],
    },
    plugins: [
      vue(),
      vueJsx({ optimize: false, enableObjectSlots: false }),
      viteSSR(),
      Components({
        dts: !process.env.TEST,
        directives: true,
        resolvers: [
          VuetifyComponentResolver({ labs: true, paths: [__dirname] }),
          VuetifyDirectiveResolver({ paths: [__dirname] }),
        ],
      }),
      Inspect(),
      warmup({
        clientFiles: process.env.TEST ? [] : ['./dev/index.html'],
      }),
    ],
    define: {
      __VUETIFY_VERSION__: JSON.stringify(vuetifyPackage.version),
      'process.env.BABEL_TYPES_8_BREAKING': 'false',
      'process.env.VITE_SSR': process.env.VITE_SSR,
    },
    build: {
      minify: false,
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
        },
      },
    },
  }
})
