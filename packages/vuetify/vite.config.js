import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSSR from 'vite-ssr/plugin'
import { loadEnv, defineConfig } from 'vite'

const resolve = file => path.resolve(__dirname, file)

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    root: path.resolve(__dirname, 'dev'),
    server: {
      port: process.env.PORT,
      strictPort: !!process.env.PORT,
    },
    resolve: {
      alias: [
        { find: /^vuetify$/, replacement: resolve('./src/entry-bundler.ts') },
        { find: /^vuetify\/(.*)/, replacement: resolve('./$1') },
        { find: /^@\/(.*)/, replacement: resolve('./src/$1')}
      ]
    },
    plugins: [
      vue(),
      vueJsx({ optimize: true, enableObjectSlots: false }),
      viteSSR()
    ],
  }
})
