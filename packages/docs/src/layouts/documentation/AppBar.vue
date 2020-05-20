<template>
  <v-app-bar
    id="documentation-app-bar"
    :color="!theme.isDark ? 'white' : undefined"
    app
    clipped-left
    clipped-right
    flat
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

    <v-spacer class="d-sm-none" />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DocumentationAppBar',

    inject: ['theme'],

    components: {
      DocumentationSearch: () => import('./Search'),
    },

    computed: { drawer: sync('app/drawer') },
  }
</script>

<style lang="sass">
  .theme--light,
  .theme--dark
    #documentation-app-bar
      border-width: 0 0 thin 0
      border-style: solid

      &.theme--light
        border-bottom-color: #0000001F !important

      &.theme--dark
        border-bottom-color: #FFFFFF1F !important
</style>
