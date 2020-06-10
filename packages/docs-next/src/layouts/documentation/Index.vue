<template>
  <v-app>
    <documentation-bar />

    <documentation-drawer />

    <documentation-view />

    <documentation-toc />
  </v-app>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'
  import { kebabCase } from 'lodash'

  // Data
  import nav from '@/data/nav'

  export default {
    name: 'DocumentationLayout',

    components: {
      DocumentationBar: () => import('./AppBar'),
      DocumentationDrawer: () => import('./Drawer'),
      DocumentationToc: () => import('./Toc'),
      DocumentationView: () => import('./View'),
    },

    computed: {
      ...sync('i18n', [
        'pages',
        'tocs',
      ]),
      nav: sync('app/nav'),
    },

    watch: {
      '$route.params.locale': {
        immediate: true,
        handler (val) {
          !!val && this.init(val)
        },
      },
    },

    methods: {
      async init (val) {
        const locale = this.$route.params.locale
        const pending = [
          import(
            /* webpackChunkName: "api-items" */
            `@docs/${locale}/api/pages`
          ),
          import(
            /* webpackChunkName: "nav-items" */
            `@docs/${locale}/pages`
          ),
          import(
            /* webpackChunkName: "headings" */
            `@docs/${locale}/headings`
          ),
        ]

        const [
          api,
          pages,
          toc,
        ] = [...await Promise.all(pending)]

        this.pages = { ...pages.default, ...api.default }
        // Map provided nav groups using
        // the provided language, val
        this.nav = nav.map(item => {
          // Build group string used
          // for list groups
          // e.g. /en/
          const group = `/${val}/`

          return this.genItem(item, group)
        })
        this.tocs = toc.default
      },
      findItems (group) {
        const pages = []

        // Iterate through the imported pages and
        // map keys to the generated page routes
        // e.g. /en/components/chip-groups/
        for (const key in this.pages) {
          // Skip if the key doesn't match
          // e.g. !'/en/components/alerts'.startsWith('/en/')
          if (!key.startsWith(group)) continue

          // Create a new inferred page route
          // using the key/value from pages
          pages.push({
            href: undefined,
            icon: undefined,
            items: undefined,
            title: this.pages[key],
            to: key,
          })
        }

        return pages.length ? pages : undefined
      },
      genItems (item, ...args) {
        const foundItems = this.findItems(...args)

        if (!item.items) return foundItems

        const keys = []
        const items = []

        // Generate explicitly provided
        // items and their keys from src/data/nav.json
        for (const child of item.items) {
          keys.push(child.title)
          items.push(this.genItem(child, ...args))
        }

        for (const found of foundItems) {
          const title = kebabCase(found.title)

          // Don't include found item
          // if already provided
          if (keys.includes(title)) continue

          keys.push(title)
          items.push(found)
        }

        return items.length ? items : undefined
      },
      genItem (item, group) {
        const path = kebabCase(item.to || item.title)
        const to = `${group}${path}/`
        const title = this.pages[to] || (
          this.$i18n.te(item.title)
            ? this.$i18n.t(item.title)
            : item.title
        )

        return {
          href: item.href || undefined,
          icon: item.icon || undefined,
          items: this.genItems(item, to),
          title,
          to,
        }
      },
    },
  }
</script>
