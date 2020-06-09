<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-view />

    <default-toc />
  </v-app>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'
  import { kebabCase } from 'lodash'

  // Data
  import nav from '@/data/nav'

  async function loadHeadings (locale) {
    return import(
      /* webpackChunkName: "headings" */
      `@docs/${locale}/headings`
    )
  }

  async function loadPages (locale) {
    return import(
      /* webpackChunkName: "nav-items" */
      `@docs/${locale}/pages`
    )
  }

  async function loadApi (locale) {
    return import(
      /* webpackChunkName: "api-items" */
      `@docs/${locale}/api/pages`
    )
  }

  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import('./AppBar'),
      DefaultDrawer: () => import('./Drawer'),
      DefaultToc: () => import('./Toc'),
      DefaultView: () => import('./View'),
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
          if (!val) return

          this.init(val)
        },
      },
    },

    methods: {
      async init (val) {
        const locale = this.$route.params.locale
        const api = await loadApi(locale)
        const pages = await loadPages(locale)
        const toc = await loadHeadings(locale)

        this.pages = { ...pages.default, ...api.default }
        this.nav = nav.map(item => this.genItem(item, `/${val}/`))
        this.tocs = toc.default
      },
      findItems (group) {
        const pages = []

        for (const key in this.pages) {
          if (!key.startsWith(group) || group === key) continue

          pages.push({
            title: this.pages[key],
            to: key,
          })
        }

        return pages.length > 0 ? pages : undefined
      },
      genItems (item, ...args) {
        return item.items
          ? item.items.map(i => this.genItem(i, ...args))
          : this.findItems(...args)
      },
      genItem (item, parent) {
        const path = kebabCase(item.to || item.title)
        const to = `${parent}${path}/`
        let title = this.pages[to]

        if (!title) {
          title = this.$i18n.te(item.title)
            ? this.$i18n.t(item.title)
            : item.title
        }

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
