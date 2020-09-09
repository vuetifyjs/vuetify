<template>
  <v-container
    class="pa-4 pa-sm-6 pa-md-8"
    tag="section"
  >
    <v-responsive
      class="mx-auto overflow-visible"
      max-width="868"
    >
      <skeleton-loader
        v-if="!component"
        key="loader"
      />

      <keep-alive
        v-else
        max="3"
      >
        <component :is="component" />
      </keep-alive>
    </v-responsive>
  </v-container>
</template>

<script>
  // Utilities
  import { genMetaData } from '@/util/metadata'
  import { get, sync } from 'vuex-pathify'
  import { localeLookup } from '@/i18n/util'

  async function load (route) {
    const { category, page } = route.params
    const isApi = category === 'api'
    const locale = localeLookup(route.params.locale)

    const context = isApi
      ? await import(
        /* webpackChunkName: "api-[request]" */
        `@/api/${locale}.js`
      )
      : await import(
        /* webpackChunkName: "documentation-[request]" */
        `@/pages/${locale}.js`
      )

    const path = ['.']
    if (!isApi) path.push(category)
    path.push(page)

    return context.default(`${path.join('/')}.md`)
  }

  export default {
    name: 'DocumentationView',

    async asyncData ({ route, store }) {
      const md = await load(route)
      store.state.pages.md = md
    },

    metaInfo () {
      if (!this.frontmatter) return {}

      const { meta } = this.frontmatter

      if (!meta) return

      const {
        description = '',
        keywords = '',
        title = '',
      } = meta

      return genMetaData(
        title,
        description,
        keywords,
      )
    },

    data: () => ({
      component: undefined,
    }),

    computed: {
      ...sync('pages', [
        'frontmatter',
        'toc',
        'md',
      ]),
      ...get('route', [
        'hash',
        'params@page',
      ]),
    },

    created () {
      this.init(this.md)
    },

    methods: {
      init (md) {
        const {
          attributes = {},
          toc = [],
          vue = {},
        } = md
        vue.component.name = this.page
        this.frontmatter = attributes
        this.toc = toc
        this.component = vue.component
      },
    },
  }
</script>
