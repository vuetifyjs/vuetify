<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-fab-to-top />

    <default-view />

    <default-toc />

    <default-snackbar />
  </v-app>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  // Data
  import nav from '@/data/nav'

  export default {
    name: 'DefaultLayout',

    beforeRouteEnter (to, from, next) {
      next(vm => vm.init())
    },

    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
      DefaultDrawer: () => import(
        /* webpackChunkName: "default-drawer" */
        './Drawer'
      ),
      DefaultFabToTop: () => import(
        /* webpackChunkName: "default-app-fab-to-top" */
        './FabToTop'
      ),
      DefaultSnackbar: () => import(
        /* webpackChunkName: "default-snackbar" */
        './Snackbar'
      ),
      DefaultToc: () => import(
        /* webpackChunkName: "default-toc" */
        './Toc'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
    },

    data: () => ({ unassigned: [] }),

    computed: {
      ...sync('app', [
        'modified',
        'nav',
      ]),
      pages: sync('pages/pages'),
      locale: get('route/params@locale'),
    },

    methods: {
      async init () {
        this.getModified()
        this.getPages()
      },
      async getModified () {
        const { default: modified } = await import(
          /* webpackChunkName: "modified-[request]" */
          `@docs/${this.locale}/modified`
        )

        this.modified = modified
      },
      async getPages () {
        const { default: api } = await import(
          /* webpackChunkName: "api-pages-[request]" */
          `@/api/${this.locale}/pages.json`
        )
        const { default: pages } = await import(
          /* webpackChunkName: "local-pages-[request]" */
          `@docs/${this.locale}/pages`
        )

        this.pages = { ...pages, ...api }
        this.genNav()
      },
      findItems (group) {
        const path = `/${this.locale}/${group}/`

        return Object.keys(this.pages).reduce((acc, cur) => {
          if (cur.startsWith(path)) {
            acc.push({
              title: this.pages[cur],
              to: cur,
            })
          }

          return acc
        }, [])
      },
      genItem (item, group) {
        let to = item.to
        const parent = (item.items || item.group)
        const items = parent && this.genItems(item.items, group)

        if (!to) {
          const page = !items && item.title
          const url = [
            this.locale,
            group,
            page,
          ].filter(v => v)

          to = `/${url.join('/')}/`
        }

        const title = this.$i18n.te(item.title)
          ? this.$i18n.t(item.title)
          : this.pages[to] || item.title

        const created = {
          ...item,
          group: parent && group,
          items,
          title,
          to,
        }

        for (const key in created) {
          if (created[key]) continue

          delete created[key]
        }

        return created
      },
      genItems (items, group) {
        if (!items) return this.findItems(group)

        return items.map(item => {
          return this.genItem(
            Object(item) === item
              ? item
              : { title: item },
            group,
          )
        })
      },
      genNav () {
        const items = []

        for (const item of nav) {
          items.push(this.genItem(item, item.group || (item.items && item.title)))
        }

        this.nav = items
      },
    },
  }
</script>
