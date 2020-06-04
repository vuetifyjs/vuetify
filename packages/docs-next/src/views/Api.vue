<template>
  <v-container tag="section">
    <component :is="page" />
  </v-container>
</template>

<script>
  // Utilities
  import { genMetaData } from '@/util/metadata'

  async function load (route) {
    const { locale, page } = route.params

    return import(
      /* webpackChunkName: "api-pages" */
      `@docs/${locale}/api/${page}.md`
    )
  }

  export default {
    name: 'ApiView',

    metaInfo () {
      if (!this.attributes) return {}

      const {
        description,
        keywords,
        title,
      } = this.attributes

      return genMetaData(
        title,
        description,
        keywords,
      )
    },

    data: () => ({
      attributes: undefined,
      page: undefined,
    }),

    watch: {
      '$route.params.locale': 'loadComponent',
    },

    created () {
      this.loadComponent()
    },

    methods: {
      async loadComponent () {
        const { attributes, vue } = await load(this.$route)

        this.attributes = attributes
        this.page = vue.component
      },
    },
  }
</script>
