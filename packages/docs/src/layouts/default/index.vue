<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-fab-to-top />

    <default-view />

    <default-toc />

    <default-snackbar />

    <default-pwa-snackbar />

    <default-settings />
  </v-app>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  // Components
  import DefaultBar from './AppBar'
  import DefaultDrawer from './Drawer'
  import DefaultFabToTop from './FabToTop'
  import DefaultPwaSnackbar from './PwaSnackbar'
  import DefaultSettings from './settings/Settings'
  import DefaultSnackbar from './Snackbar'
  import DefaultToc from './Toc'
  import DefaultView from './View'

  // Data
  import nav from '@/data/nav'
  import modified from '@/data/modified'
  import { localeLookup } from '@/i18n/util'

  export default {
    name: 'DefaultLayout',

    beforeRouteEnter (to, from, next) {
      next(vm => vm.init())
    },

    components: {
      DefaultBar,
      DefaultDrawer,
      DefaultFabToTop,
      DefaultPwaSnackbar,
      DefaultSettings,
      DefaultSnackbar,
      DefaultToc,
      DefaultView,
    },

    data: () => ({ unassigned: [] }),

    computed: {
      ...sync('app', [
        'nav',
      ]),
      pages: sync('pages/pages'),
      locale: get('route/params@locale'),
    },

    watch: {
      locale () {
        this.$nextTick(() => this.getPages())
      },
    },

    methods: {
      async init () {
        this.getPages()
        this.$load(['https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'])
      },
      async getPages () {
        const locale = localeLookup(this.locale)
        const [{ default: api }, { default: pages }] = await Promise.all([
          import(
            /* webpackChunkName: "api-pages-[request]" */
            `@/api/${locale}/pages.json`
          ),
          import(
            /* webpackChunkName: "locale-pages-[request]" */
            `@docs/${locale}/pages`
          ),
        ])

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
        const parent = !!item.items || item.group
        const items = parent && this.genItems(item.items, group)
        const page = to || (!items && item.title)

        if (!item.href) {
          const url = [
            this.locale,
            group,
            page,
          ].filter(v => v)

          // to = this.$router.resolve(`/${url.join('/')}/`).resolved.path
          to = `/${url.join('/')}/`
        }
        const path = item.title || item.heading
        const title = (
          this.pages[to] ||
          (this.$te(path) && this.$t(path)) ||
          path ||
          ''
        )
        const created = {
          ...item,
          ...(modified[`/${group}/${page}/`] || {}),
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
