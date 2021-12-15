import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
// import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import MarkdownItPrism from 'markdown-it-prism'
// @ts-expect-error missing types
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
// @ts-expect-error missing types
import MarkdownItHeaderSections from 'markdown-it-header-sections'
import markdownRules from './build/rules'
import MarkdownIt from 'markdown-it'
import fs from 'fs'
// @ts-expect-error missing types
import parseMD from 'parse-md'

const resolve = (file: string) => path.resolve(__dirname, file)

const configureMarkdown = (md: MarkdownIt) => {
  md.use(MarkdownItPrism)
    .use(MarkdownItLinkAttributes, {
      pattern: /^https?:\/\//,
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
    .use(MarkdownItAttrs)
    .use(MarkdownItAnchor, {
      permalink: MarkdownItAnchor.permalink.headerLink(),
      slugify: (str: unknown) => {
        let slug = String(str)
          .trim()
          .toLowerCase()
          .replace(/[\s,.[\]{}()/]+/g, '-')
          .replace(/[^a-z0-9 -]/g, c => c.charCodeAt(0).toString(16))
          .replace(/-{2,}/g, '-')
          .replace(/^-*|-*$/g, '')

        if (slug.charAt(0).match(/[^a-z]/g)) {
          slug = 'section-' + slug
        }

        return encodeURIComponent(slug)
      },
    })
    .use(MarkdownItHeaderSections)

  markdownRules.forEach(rule => rule(md))

  return md
}

const md = configureMarkdown(new MarkdownIt())

const ssrTransformCustomDirective = () => {
  return {
    props: [],
    needRuntime: true,
  }
}

const generateToc = (content: string) => {
  const headings = []
  const tokens = md.parse(content, {})
  const length = tokens.length

  for (let i = 0; i < length; i++) {
    const token = tokens[i]

    if (token.type !== 'heading_open') continue

    // heading level by hash length '###' === h3
    const level = token.markup.length

    if (level <= 1) continue

    const next = tokens[i + 1]
    const link = next.children?.find(child => child.type === 'link_open')
    const text = next.children?.filter(child => !!child.content).map(child => child.content).join('')
    const anchor = link?.attrs?.find(([attr]) => attr === 'href')
    const [, to] = anchor ?? []

    headings.push({
      text,
      to,
      level,
    })
  }

  return headings
}

const parseMarkdown = (componentPath: string) => {
  const str = fs.readFileSync(path.resolve(componentPath.slice(1)), { encoding: 'utf-8' })
  const { metadata, content } = parseMD(str)
  const { meta, ...rest } = metadata

  return {
    ...rest,
    ...meta,
    toc: generateToc(content),
  }
}

export default defineConfig({
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
        if (['index', 'all'].includes(route.name as string)) {
          return route
        }

        const currentPath = route.path.split('/')
        const layout = currentPath.length === 2 ? 'home' : 'default'
        const meta = parseMarkdown(route.component)
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
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
