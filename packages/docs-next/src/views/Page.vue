<template>
  <v-container
    class="px-4 px-sm-8 px-md-12"
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

      <keep-alive max="3">
        <component :is="component" />
      </keep-alive>
    </v-responsive>
  </v-container>
</template>

<script>
  // Utilities
  import { genMetaData } from '@/util/metadata'
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'PageView',

    async beforeRouteUpdate (to, _, next) {
      // Avoid turning on the loader immediately
      const timeout = setTimeout(this.reset, 50)

      await this.update()

      clearTimeout(timeout)

      next()
    },

    metaInfo () {
      // Check it fm exists
      if (!this.frontmatter) return {}

      // Check if meta exists
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

    data: () => ({ component: undefined }),

    computed: {
      ...sync('pages', [
        'frontmatter',
        'toc',
      ]),
      ...get('route', [
        'params@category',
        'params@locale',
        'params@page',
      ]),
    },

    watch: { '$route.params.locale': 'update' },

    beforeMount () {
      this.update(this.$route)
    },

    methods: {
      async load () {
        const isApi = this.category === 'api'
        const namespace = isApi ? 'api' : 'pages'
        const path = [namespace, this.locale]

        if (!isApi) path.push(this.category)

        path.push(this.page)

        return import(
          /* webpackChunkName: "pages-[request]" */
          `@/${path.join('/')}.md`
        )
      },
      async update () {
        try {
          const {
            attributes = {},
            toc = [],
            vue = {},
          } = await this.load()

          vue.component.name = this.page

          this.frontmatter = attributes
          this.toc = toc
          this.component = vue.component
        } catch (e) {
          this.component = (await import(
            /* webpackChunkName: "404" */
            './404'
          )).default
        }
      },
      async reset () {
        this.component = undefined
      },
    },
  }
</script>
