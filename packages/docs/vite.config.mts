import path from 'upath'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Vue, { parseVueRequest } from '@vitejs/plugin-vue'
import ViteFonts from 'unplugin-fonts/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import Vuetify from 'vite-plugin-vuetify'
import basicSsl from '@vitejs/plugin-basic-ssl'

import { configureMarkdown, parseMeta } from './build/markdown-it'
import Api from './build/api-plugin'
import { Examples } from './build/examples-plugin'
import { genAppMetaInfo } from './src/utils/metadata'

const resolve = (file: string) => fileURLToPath(new URL(file, import.meta.url))

const ssrTransformCustomDirective = () => {
  return {
    props: [],
    needRuntime: true,
  }
}

export default defineConfig(({ command, mode, ssrBuild }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  let allRoutes: any[]

  return {
    logLevel: 'info',
    resolve: {
      alias: [
        { find: '@', replacement: `${resolve('src')}/` },
        { find: 'node-fetch', replacement: 'isomorphic-fetch' },
        { find: /^vue$/, replacement: ssrBuild ? 'vue' : 'vue/dist/vue.esm-bundler.js' },
        { find: /^pinia$/, replacement: 'pinia/dist/pinia.mjs' },
      ],
    },
    define: {
      'process.env.NODE_ENV': mode === 'production' || ssrBuild ? '"production"' : '"development"',
      __INTLIFY_PROD_DEVTOOLS__: 'false',
    },
    build: {
      sourcemap: mode === 'development',
      modulePreload: false,
      cssCodeSplit: false,
      minify: false,
      rollupOptions: {
        output: ssrBuild ? { inlineDynamicImports: true } : {
          // TODO: these options currently cause a request cascade
          // experimentalMinChunkSize: 20 * 1024,
          // manualChunks (id) {
          //   if (
          //     ['vue/', '@vue/', 'vue-', 'pinia', '@vueuse/'].some(part => id.includes('node_modules/' + part)) ||
          //     id === '\0plugin-vue:export-helper'
          //   ) return 'vendor'
          //   if (id.includes('packages/vuetify/')) return 'vuetify'
          //   if (id.includes('packages/docs/src/api')) return 'api-pages'
          // }
        },
      },
    },
    plugins: [
      // https://github.com/unplugin/unplugin-auto-import
      AutoImport({
        dirs: [
          './src/composables/**',
          './src/stores/**',
          './src/utils/**',
        ],
        imports: [
          {
            '@vuetify/one': [
              'createOne',
              'useAuthStore',
              'useHttpStore',
              'useOneStore',
              'useUserStore',
              'useSettingsStore',
              'useProductsStore',
            ],
            'lodash-es': ['camelCase', 'kebabCase', 'upperFirst'],
            pinia: ['defineStore', 'storeToRefs'],
            vue: [
              'camelize', 'computed', 'h', 'mergeProps', 'nextTick',
              'onBeforeMount', 'onBeforeUnmount', 'onMounted', 'onScopeDispose', 'onServerPrefetch',
              'ref', 'shallowRef', 'useAttrs', 'watch', 'watchEffect'
            ],
            vuetify: ['useDate', 'useDisplay', 'useGoTo', 'useRtl', 'useTheme'],
            'vue-gtag-next': ['useGtag'],
            'vue-i18n': ['useI18n'],
            'vue-router': ['onBeforeRouteLeave', 'onBeforeRouteUpdate', 'useRoute', 'useRouter'],
          }
        ],
        vueTemplate: true,
      }),

      // https://github.com/stafyniaksacha/vite-plugin-fonts
      ViteFonts({
        google: {
          families: [{
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          }],
        },
      }),

      Api(),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        directoryAsNamespace: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDirs: 'src/layouts',
        importMode (name) {
          return name === 'home' ? 'sync' : 'async'
        }
      }),

      // https://github.com/antfu/vite-plugin-md
      Markdown({
        wrapperComponent: 'unwrap-markdown',
        wrapperClasses: '',
        headEnabled: true,
        markdownItSetup: configureMarkdown,
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
        dirs: [
          { dir: 'src/pages', baseRoute: '' },
          { dir: 'node_modules/.cache/api-pages', baseRoute: '' },
        ],
        extendRoute (route) {
          let [locale, category, ...rest] = route.path.split('/').slice(1)

          const idx = route.component.toLowerCase().indexOf(locale)
          locale = ~idx ? route.component.slice(idx, idx + locale.length) : locale

          const meta = {
            layout: 'default',
            ...parseMeta(route.component, locale),
          }

          if (meta.disabled) {
            return { disabled: true }
          }

          return {
            ...route,
            path: '/' + [locale, category, ...rest].filter(Boolean).join('/') + '/',
            // name: [`${category ?? meta.layout}`, ...rest].join('-'),
            meta: {
              ...meta,
              category,
              page: rest.join('-'),
              locale,
            },
          }
        },
        onRoutesGenerated (routes) {
          allRoutes = routes.filter(route => !route.disabled)
          return allRoutes
        },
        importMode (filepath) {
          return [
            '/src/pages/en/getting-started/installation.md',
            '/src/pages/en/index.md'
          ].includes(filepath) ? 'sync' : 'async'
        }
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        srcDir: 'src',
        filename: 'service-worker.js',
        strategies: 'injectManifest',
        includeAssets: ['favicon.ico'],
        injectManifest: {
          globIgnores: ['**/*.html'],
          additionalManifestEntries: [
            { url: '/_fallback.html', revision: Date.now().toString(16) },
          ],
          dontCacheBustURLsMatching: /assets\/.+[A-Za-z0-9]{8}\.(js|css)$/,
          maximumFileSizeToCacheInBytes: 24 * 1024 ** 2,
        },
        manifest: {
          name: 'Vuetify',
          description: 'Vuetify UI Library Documentation',
          short_name: 'Vuetify',
          theme_color: '#1867C0',
          icons: [
            {
              src: 'img/icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'img/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),

      {
        // Remove options block from examples
        name: 'vuetify:example-setup',
        transform (code, id) {
          const { filename, query } = parseVueRequest(id)
          if (query.raw || query.url) return
          if (filename.includes('packages/docs/src/examples')) {
            const composition = /(<script setup>[\w\W]*?<\/script>)/g.exec(code)
            const options = /(<script>[\w\W]*?<\/script>)/g.exec(code)

            if (composition && options) {
              return code.slice(0, options.index) + code.slice(options.index + options[0].length + 1)
            }
          }
        }
      },

      Vue({
        include: [/\.vue$/, /\.md$/],
        // https://github.com/vuejs/vue-next/issues/3298
        template: {
          compilerOptions: {
            directiveTransforms: {
              ripple: ssrTransformCustomDirective,
            },
          },
        },
      }),

      Vuetify({
        autoImport: false,
        styles: command === 'serve' || mode === 'development' ? 'sass' : true,
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        compositionOnly: true,
        include: [resolve('src/i18n/messages/**')],
      }),

      Examples(),

      {
        name: 'vuetify:example-blocks',
        transform (code, id) {
          const type = id.includes('vue&type=playground-resources') ? 'playgroundResources'
            : id.includes('vue&type=playground-setup') ? 'playgroundSetup'
            : null
          if (!type) return

          return {
            code: `export default Comp => Comp['${type}'] = \`${code.replace(/`/g, '\\`')}\``,
            map: null,
          }
        },
      },

      {
        // lightweight head-only ssg
        name: 'vuetify:ssg',
        enforce: 'post',
        async transformIndexHtml (html) {
          if (mode !== 'production') return html

          await fs.mkdir('dist', { recursive: true })
          await fs.writeFile(path.join('dist/_fallback.html'), html)

          const routes = allRoutes.filter(({ path: route }) => {
            return route !== '/' &&
              !['/eo-UY/', '/api/', '/user/', ':', '*'].some(v => route.includes(v))
          }).map(route => {
            const meta = genAppMetaInfo({
              title: `${route.meta.title}${route.path === '/en/' ? '' : ' — Vuetify'}`,
              description: route.meta.description,
              keywords: route.meta.keywords,
            })
            const metaContent = [
              `<title>${meta.title}</title>`,
              ...meta.meta.map((v: any) => {
                const attrs = Object.keys(v).filter(k => k !== 'key').map(k => `${k}="${v[k]}"`).join(' ')
                return `<meta ${attrs}>`
              }),
              ...meta.link.map((v: any) => {
                const attrs = Object.keys(v).map(k => `${k}="${v[k]}"`).join(' ')
                return `<link ${attrs}>`
              }),
            ].join('\n    ')
            const content = html.replace('<!-- @inject-meta -->', metaContent)
            return {
              path: route.path,
              content
            }
          })

          for (const route of routes) {
            const filename = path.join('dist', route.path, 'index.html')
            await fs.mkdir(path.dirname(filename), { recursive: true })
            await fs.writeFile(filename, route.content)
          }

          return routes.find(r => r.path === '/en/')?.content
        },
      },

      Inspect(),

      process.env.HTTPS === 'true' ? basicSsl() : undefined,
    ],

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
      ],
      exclude: [
        'vue-demi',
      ],
    },

    ssr: {
      noExternal: ['vue-i18n', '@vuelidate/core', 'pinia'],
    },

    server: {
      port: +(process.env.PORT ?? 8095),
    },

    preview: {
      https: process.env.HTTPS === 'true',
    },
  }
})
