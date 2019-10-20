<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    color="primary"
    dark
  >
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
  export default {
    name: 'DocumentationAppBar',

    components: {
      DocumentationSearch: () => import('./Search'),
    },
  }
</script>
