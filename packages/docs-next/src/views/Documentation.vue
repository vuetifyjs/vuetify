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

  async function load (route, store) {
    const page = upperFirst(camelCase(route.params.page))
    const { category, lang } = route.params

    return await import(
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

    beforeRouteEnter (to, from, next) {
      next(vm => {
        load(vm.$route, vm.$store).then(component => {
          const { attributes, vue } = component.default

          vm.attributes = attributes
          vm.page = vue.component

          const { lang } = to.params
          if (lang === 'eo-UY') {
            console.log(lang)
            const crowdin = document.createElement('script')
            crowdin.setAttribute('src', 'https://cdn.crowdin.com/jipt/jipt.js')
            document.head.appendChild(crowdin)
          }
        })
      })
    },
  }
</script>
