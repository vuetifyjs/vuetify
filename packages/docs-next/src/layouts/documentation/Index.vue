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
