import path from 'node:path'
import fs, { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import fg from 'fast-glob'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { warmup } from 'vite-plugin-warmup'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (file: string) => path.resolve(__dirname, file)

const vuetifyPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const index = readFileSync(resolve('src/components/index.ts'), { encoding: 'utf8' })
const block = Array.from(index.matchAll(/^\/\/ export \* from '\.\/(.*)'$/gm), m => m[1])
const files = fg.sync(['src/components/**/index.ts', 'src/labs/**/index.ts'], { cwd: __dirname })
const components = files.filter(file => file.startsWith('src/labs') || !block.some(name => file.includes(`/${name}/`)))
const map = new Map(components.flatMap(file => {
  const src = readFileSync(file, { encoding: 'utf8' })
  const matches = src.matchAll(/export const (V\w+)|export { (V\w+) }/gm)
  return Array.from(matches, m => [m[1] || m[2], file.replace('src/', '@/').replace('.ts', '')])
}))

const viteSSR = process.env.TEST ? () => null : (await import('vite-ssr/plugin.js').then(m => m.default))

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    root: resolve('dev'),
    server: {
      host: process.env.HOST,
      port: process.env.TEST ? undefined : Number(process.env.PORT ?? 8090),
      strictPort: !!process.env.PORT && !process.env.TEST,
    },
    preview: {
      host: process.env.HOST,
      port: Number(process.env.PORT ?? 8090),
      strictPort: !!process.env.PORT,
    },
    resolve: {
      alias: [
        { find: /^vuetify$/, replacement: resolve('./src/framework.ts') },
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
        resolvers: [
          name => {
            if (map.has(name)) {
              return { name, from: map.get(name)! }
            }
            return undefined
          },
        ],
      }),
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
