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

    data: () => ({ orphans: [] }),

    computed: {
      ...sync('app', [
        'nav',
        'modified',
      ]),
      ...sync('i18n', [
        'pages',
        'tocs',
      ]),
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
      async importDocsFor (locale) {
        const pending = [
          import(
            /* webpackChunkName: "api-pages" */
            `@docs/${locale}/api/pages`
          ),
          import(
            /* webpackChunkName: "modified" */
            `@docs/${locale}/modified`
          ),
          import(
            /* webpackChunkName: "pages" */
            `@docs/${locale}/pages`
          ),
          import(
            /* webpackChunkName: "headings" */
            `@docs/${locale}/headings`
          ),
        ]

        return Promise.resolve([...await Promise.all(pending)])
      },
      async init (locale) {
        const [
          api,
          modified,
          pages,
          headings,
        ] = await this.importDocsFor(locale)

        this.modified = modified.default
        this.pages = { ...pages.default, ...api.default }
        this.orphans = Object.keys(this.pages)
        this.tocs = headings.default
        // Map provided nav groups using
        // the provided language, val
        this.nav = nav.map(item => {
          // Build group string used
          // for list groups
          const group = `/${locale}/${item.title}/`

          return this.genItem(item, group)
        })
      },
      findItems (group) {
        const pages = []
        // Iterate through the imported pages and
        // map keys to the generated page route
        for (const key in this.pages) {
          // Skip if key doesn't match
          if (!key.startsWith(group)) continue

          // Create a new inferred page route
          // using the key/value from pages
          pages.push({
            title: this.pages[key],
            to: key,
          })

          this.removeOrphan(key)
        }

        return pages.length ? pages : undefined
      },
      genItem (item, group) {
        const isGroup = !!item.icon || item.items
        const items = isGroup ? this.genItems(item, group) : undefined
        const { href, icon, title: path } = item
        const page = `${group}${path}/`
        const to = isGroup ? group : page

        // Use language file if path exists
        // Otherwise use the default page
        const title = this.$i18n.te(path)
          ? this.$i18n.t(path)
          : this.pages[page] || path

        return {
          href,
          icon,
          items,
          title,
          to,
        }
      },
      genItems (item, group) {
        const foundItems = this.findItems(group)

        if (!item.items) return foundItems

        const items = []

        // Generate explicitly provided
        // items and their keys from src/data/nav.json
        for (const child of item.items) {
          items.push(this.genItem(child, group))

          this.removeOrphan(`${group}${child.title}/`)
        }

        for (const found of foundItems) {
          const path = `${group}${kebabCase(found.title)}/`
          const index = this.orphans.indexOf(path)

          // Don't include found item
          // if it already exists
          if (index < 0) continue

          items.push(this.genItem(found, group))
        }

        return items.length ? items : undefined
      },
      removeOrphan (child) {
        this.$delete(this.orphans, this.orphans.indexOf(child))
      },
    },
  }
</script>
