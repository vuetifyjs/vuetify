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
  import { sync } from 'vuex-pathify'

  // This should only be extended by other pages
  export default {
    name: 'Page',

    beforeRouteEnter (to, from, next) {
      next(vm => vm.update(to))
    },

    async beforeRouteUpdate (to, from, next) {
      // Avoid turning on the loader immediately
      const timeout = setTimeout(this.reset, 50)

      await this.update(to)

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
      frontmatter: sync('pages/frontmatter'),
      toc: sync('pages/toc'),
    },

    watch: { '$route.params.locale': 'update' },

    methods: {
      async load () {
        console.error('Missing load method for Page.vue')
      },
      async update (route) {
        try {
          const {
            attributes = {},
            toc = [],
            vue = {},
          } = await this.load(route)

          vue.component.name = route.params.page

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
