<template>
  <v-container tag="section">
    <component :is="page" />
  </v-container>
</template>

<script>
  // Utilities
  import {
    camelCase,
    upperFirst,
  } from 'lodash'
  import { genMetaData } from '@/util/metadata'

  async function load (route) {
    const page = upperFirst(camelCase(route.params.page))
    const { category, lang } = route.params

    return import(
      /* webpackChunkName: "documentation-pages" */
      `@/pages/${lang}/${category}/${page}.md`
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

    async created () {
      const { attributes, vue } = await load(this.$route)

      this.attributes = attributes
      this.page = vue.component
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        const { lang } = to.params
        if (lang === 'eo-UY') {
          console.log(lang)
          const crowdin = document.createElement('script')
          crowdin.setAttribute('src', 'https://cdn.crowdin.com/jipt/jipt.js')
          document.head.appendChild(crowdin)
        }
      })
    },
  }
</script>
