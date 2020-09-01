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
  import { error } from '@/util/routes'
  import { genMetaData } from '@/util/metadata'
  import { get, sync } from 'vuex-pathify'
  import { waitForReadystate } from '@/util/helpers'
  import { localeLookup } from '@/i18n/util'

  export default {
    name: 'DocumentationView',

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
        'loading',
        'toc',
      ]),
      ...get('route', [
        'hash',
        'params@category',
        'params@locale',
        'params@page',
      ]),
      initializing: sync('app/initializing'),
    },

    async created () {
      this.initializing = new Promise(this.init)
    },

    async mounted () {
      await waitForReadystate()
      await this.initializing

      if (this.loading.length) {
        await Promise.all(this.loading)

        this.loading = []
      }

      if (this.hash) {
        await this.$router.options.scrollBehavior({ hash: this.hash })
      }

      this.initializing = false
    },

    methods: {
      load () {
        const isApi = this.category === 'api'
        const namespace = isApi ? 'api' : 'pages'
        const path = [namespace, localeLookup(this.locale)]

        if (!isApi) path.push(this.category)

        path.push(this.page)

        return import(
          /* webpackChunkName: "documentation-[request]" */
          `@/${path.join('/')}.md`
        )
      },
      async init (resolve, reject) {
        let structure

        try {
          structure = await this.load()
        } catch (e) {
          console.log(e)

          const component = await error()

          this.component = component.default

          reject(e)

          return
        }

        const {
          attributes = {},
          toc = [],
          vue = {},
        } = structure

        vue.component.name = this.page

        this.frontmatter = attributes
        this.toc = toc
        this.component = vue.component

        resolve()
      },
      async reset () {
        this.component = undefined
      },
    },
  }
</script>
