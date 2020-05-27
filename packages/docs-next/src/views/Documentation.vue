<template>
  <v-container tag="section">
    <component :is="page" />
  </v-container>
</template>

<script>
  // Utilities
  import { genMetaData } from '@/util/metadata'
  import {
    camelCase,
    upperFirst,
  } from 'lodash'

  async function load (route) {
    const page = upperFirst(camelCase(route.params.page))
    const { category, locale } = route.params

    return import(
      /* webpackChunkName: "documentation-pages" */
      `@/pages/${locale}/${category}/${page}.md`
    )
  }

  export default {
    name: 'DocumentationView',

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
