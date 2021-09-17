import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Prism from 'markdown-it-prism'
// @ts-expect-error missing types
import LinkAttributes from 'markdown-it-link-attributes'

const resolve = (file: string) => path.resolve(__dirname, file)

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve('src')}/`,
      // 'vuetify/lib/': `${resolve('../vuetify/lib')}/`,
    },
  },
  plugins: [
    // https://github.com/antfu/unplugin-vue-components
    Components({
      deep: true,
      dirs: ['src/components-v3'],
      directoryAsNamespace: true,
      dts: true,
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDir: 'src/layouts-v3',
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup (md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: [
        { dir: 'src/pages-v3', baseRoute: '' },
      ],
      extendRoute (route) {
        if (['index', 'all'].includes(route.name as string)) {
          return route
        }

        const currentPath = route.path.split('/')
        const layout = currentPath.length === 2 ? 'home' : 'default'

        return {
          ...route,
          // path,
          meta: {
            layout,
          },
        }
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Vuetify',
        short_name: 'Vuetify',
        theme_color: '#094A7F',
        icons: [],
      },
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      compositionOnly: true,
      include: [resolve('src/i18n-v3/**')],
    }),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
