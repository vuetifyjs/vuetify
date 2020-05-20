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

  async function load (route, store) {
    const page = upperFirst(camelCase(route.params.page))

    return await import(
      /* webpackChunkName: "documentation-pages" */
      `@/pages/documentation/${page}.md`
    )
  }

  export default {
    name: 'DocumentationView',

    data: () => ({
      attributes: {},
      page: undefined,
    }),

    beforeRouteEnter (to, from, next) {
      next(vm => {
        load(vm.$route, vm.$store).then(component => {
          const { attributes, vue } = component.default

          vm.attributes = attributes
          vm.page = vue.component
        })
      })
    },

    updated () {
      load(this.$route, this.$store).then(component => {
        const { attributes, vue } = component.default

        this.attributes = attributes
        this.page = vue.component
      })
    },
  }
</script>
