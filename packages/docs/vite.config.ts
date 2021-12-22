import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
// import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'

import { configureMarkdown, parseMeta } from './build/markdown-it'
import Api from './build/api-plugin'
import { Examples } from './build/examples-plugin'

const resolve = (file: string) => path.resolve(__dirname, file)

const ssrTransformCustomDirective = () => {
  return {
    props: [],
    needRuntime: true,
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    logLevel: 'info',
    resolve: {
      alias: {
        '@/': `${resolve('src')}/`,
      },
    },
    define: {
      'process.env': {}, // This is so that 3rd party packages don't crap out
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
        layoutsDir: 'src/layouts',
      }),

      // https://github.com/antfu/vite-plugin-md
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto',
        headEnabled: true,
        markdownItSetup: configureMarkdown,
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
        pagesDir: [
          { dir: 'src/pages', baseRoute: '' },
          { dir: 'src/api', baseRoute: 'api' },
        ],
        extendRoute (route) {
          if (['index', 'all'].includes(route.name)) {
            return route
          }

          const currentPath = route.path.split('/')
          const layout = currentPath.length === 2 ? 'home' : 'default'
          const meta = parseMeta(route.component)
          let path = route.path

          if (path.startsWith('/api')) {
            const parts = path.split('/')
            path = ['', parts[2], parts[1], parts.slice(3)].join('/')
          }

          return {
            ...route,
            path,
            meta: {
              ...meta,
              layout,
            },
          }
        },
      }),

      Api(),

      // https://github.com/antfu/vite-plugin-pwa
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   includeAssets: ['favicon.ico', 'robots.txt'],
      //   manifest: {
      //     name: 'Vuetify',
      //     short_name: 'Vuetify',
      //     theme_color: '#094A7F',
      //     icons: [],
      //   },
      // }),

      Vue({
        include: [/\.vue$/, /\.md$/],
        // https://github.com/vuejs/vue-next/issues/3298
        template: {
          ssr: true,
          compilerOptions: {
            directiveTransforms: {
              ripple: ssrTransformCustomDirective,
            },
          },
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        compositionOnly: true,
        include: [resolve('src/i18n/messages/**')],
      }),

      Examples(),

      {
        name: 'vuetify:codepen-blocks',
        transform (code, id) {
          const type = id.includes('vue&type=codepen-additional') ? 'codepenAdditional'
            : id.includes('vue&type=codepen-resources') ? 'codepenResources'
            : null
          if (!type) return

          return `export default Comp => Comp['${type}'] = \`${code.replace(/`/g, '\\`')}\``
        },
      },

      Inspect(),
    ],

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: false,
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

    server: {
      port: +(process.env.PORT ?? 8080),
    },

    preview: {
      https: process.env.HTTPS === 'true',
    },
  }
})
