<template>
  <div>
    <core-drawer />

    <core-ad />

    <v-content>
      <core-page />
    </v-content>

    <core-fab />

    <core-snackbar />
  </div>
</template>

<script>
  // Prism
  import 'prismjs'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-stylus.js'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-sass.js'
  import 'prismjs/components/prism-scss.js'

  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'

  async function load ({ route, store }) {
    const namespace = kebabCase(route.params.namespace)
    const page = upperFirst(camelCase(route.params.page))

    store.commit('documentation/setStructure', null)

    let structure
    try {
      structure = (await import(
        /* webpackChunkName: "pages" */
        `@/data/pages/${namespace}/${page}.json`
      )).default
    } catch (err) {
      structure = false
    }

    store.commit('documentation/SET_STRUCTURE', structure)
  }

  export default {
    name: 'Documentation',

    watch: {
      '$route.path' () {
        this.load({
          store: this.$store,
          route: this.$route,
        })
      },
    },

    asyncData: load,

    methods: {
      load,
    },
  }
</script>

<style lang="sass">
  #components-navigation-drawers
    .v-navigation-drawer
      height: 100% !important
</style>
