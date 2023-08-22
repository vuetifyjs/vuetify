import path from 'upath'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { defineConfig, loadEnv } from 'vite'
import Vue, { parseVueRequest } from '@vitejs/plugin-vue'
import ViteFonts from 'unplugin-fonts/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import Vuetify from 'vite-plugin-vuetify'
import basicSsl from '@vitejs/plugin-basic-ssl'

import { configureMarkdown, parseMeta } from './build/markdown-it'
import Api from './build/api-plugin'
import { Examples } from './build/examples-plugin'

const resolve = (file: string) => fileURLToPath(new URL(file, import.meta.url))

const ssrTransformCustomDirective = () => {
  return {
    props: [],
    needRuntime: true,
  }
}

export default defineConfig(({ command, mode, ssrBuild }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

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
      // Components({
      //   deep: true,
      //   dirs: ['src/components-v3'],
      //   directoryAsNamespace: true,
      //   globalNamespaces: ['icons'],
      //   dts: true,
      //   extensions: ['vue', 'md'],
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // }),

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
          return routes.filter(route => !route.disabled)
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
        name: 'vuetify:fallback',
        enforce: 'post',
        transformIndexHtml (html) {
          fs.mkdirSync('dist', { recursive: true })
          fs.writeFileSync(path.join('dist/_fallback.html'), html)
        },
      },

      Inspect(),

      process.env.HTTPS === 'true' ? basicSsl() : undefined,
    ],

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'sync',
      formatting: 'minify',
      crittersOptions: false,
      includedRoutes (routes: string[]) {
        return routes.filter(route => (route === '/' || route.startsWith('/en/')) &&
          ['/eo-UY/', '/api/', ':', '*'].every(v => !route.includes(v))
        )
      },
    },

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
      noExternal: ['vue-i18n', '@vuelidate/core', 'pinia', '@auth0/auth0-vue'],
    },

    server: {
      port: +(process.env.PORT ?? 8080),
      proxy: {
        '/api': process.env.PROXY ?? 'http://localhost:3005'
      }
    },

    preview: {
      https: process.env.HTTPS === 'true',
    },
  }
})
