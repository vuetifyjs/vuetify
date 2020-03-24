<template>
  <v-app-bar
    id="documentation-app-bar"
    app
    clipped-left
    clipped-right
    color="primary"
    dark
  >
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="drawer = !drawer"
    />

    <base-vuetify-logo />

    <v-spacer />

    <documentation-search />

    <base-store-link />

    <base-enterprise-link />

    <base-ecosystems-menu />

    <base-support-menu />

    <base-locales-menu />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DocumentationAppBar',

    components: {
      DocumentationSearch: () => import('./Search'),
    },

    computed: { drawer: sync('app/drawer') },
  }
</script>
