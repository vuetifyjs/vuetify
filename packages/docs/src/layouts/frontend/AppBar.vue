<template>
  <v-app-bar
    id="documentation-app-bar"
    app
    color="#1867c0"
    dark
    elevate-on-scroll
    extension-height="40"
  >
    <v-container class="pa-0 d-flex align-center">
      <base-vuetify-logo />

      <v-spacer />

      <v-theme-provider light>
        <documentation-search />
      </v-theme-provider>

      <v-spacer class="d-sm-none" />

      <base-store-link />

      <base-enterprise-link />

      <base-ecosystems-menu />

      <base-support-menu />

      <base-locales-menu />
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'FrontendAppBar',

    components: {
      DocumentationSearch: () => import('../documentation/Search'),
    },
  }
</script>
