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
  import { get, sync } from 'vuex-pathify'
  import { kebabCase } from 'lodash'

  // Data
  import nav from '@/data/nav'

  export default {
    name: 'DocumentationLayout',

    beforeRouteEnter (to, from, next) {
      next(vm => vm.init())
    },

    components: {
      DocumentationBar: () => import('./AppBar'),
      DocumentationDrawer: () => import('./Drawer'),
      DocumentationToc: () => import('./Toc'),
      DocumentationView: () => import('./View'),
    },

    data: () => ({ unassigned: [] }),

    computed: {
      ...sync('app', [
        'nav',
        'modified',
      ]),
      ...sync('i18n', [
        'pages',
        'tocs',
      ]),
      locale: get('route/params@locale'),
    },

    methods: {
      async getHeadings () {
        const { default: headings } = await import(
          /* webpackChunkName: "headings" */
          `@docs/${this.locale}/headings`
        )

        this.tocs = headings
      },
      async init () {
        this.getHeadings()
        this.getModified()
        this.getPages()
      },
      async getModified () {
        const { default: modified } = await import(
          /* webpackChunkName: "api-pages" */
          `@docs/${this.locale}/api/pages`
        )

        this.modified = modified
      },
      async getPages () {
        const { default: api } = await import(
          /* webpackChunkName: "api-pages" */
          `@docs/${this.locale}/api/pages`
        )
        const { default: pages } = await import(
          /* webpackChunkName: "pages" */
          `@docs/${this.locale}/pages`
        )

        this.pages = { ...pages, ...api }
        this.unassigned = Object.keys(this.pages)

        this.genNav()
      },
      assign (child, group, items) {
        const path = `${group}${kebabCase(child.title)}/`
        const index = this.unassigned.indexOf(path)

        if (index < 0) return

        items.push(this.genChild(child, group))

        this.remove(path)

        return items
      },
      findChildren (group) {
        const pages = []
        // Iterate through the imported pages and
        // map keys to the generated page route
        for (const orphan of this.unassigned) {
          // Skip if key doesn't match
          if (!orphan.startsWith(group)) continue

          // Create a new inferred page route
          // using the key/value from pages
          pages.push({
            title: this.pages[orphan],
            to: orphan,
          })
        }

        return pages.length ? pages : undefined
      },
      genChild (item, group) {
        const isGroup = item.group
        const items = isGroup ? this.getChildren(item, group) : undefined
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
      genNav () {
        // Map provided nav groups using
        // the provided language, val
        this.nav = nav.map(item => {
          // Build group string used
          // for list groups
          const group = `/${this.locale}/${item.title}/`

          return this.genChild(item, group)
        })
      },
      getChildren (item, group) {
        const found = this.findChildren(group)

        if (!item.items) return found

        const children = []

        // Generate explicitly provided
        // items and their keys from src/data/nav.json
        for (const child of item.items) {
          this.assign(child, group, children)
        }

        for (const child of found) {
          this.assign(child, group, children)
        }

        return children.length ? children : undefined
      },
      remove (child) {
        this.$delete(
          this.unassigned,
          this.unassigned.indexOf(child),
        )
      },
    },
  }
</script>
