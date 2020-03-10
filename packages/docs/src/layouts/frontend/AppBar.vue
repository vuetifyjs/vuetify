<template>
  <v-app-bar
    id="app-toolbar"
    app
    color="primary"
    dark
    elevate-on-scroll
    extension-height="40"
  >
    <v-container class="pa-0 d-flex">
      <base-vuetify-logo />

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          :aria-label="$t('Vuetify.AppToolbar.documentation')"
          exact
          min-width="48"
          text
          :to="`/${$route.params.lang}/getting-started/quick-start/`"
        >
          <base-nav-text class="hidden-sm-and-down">Vuetify.AppToolbar.documentation</base-nav-text>

          <v-icon class="hidden-md-and-up">mdi-speedometer</v-icon>
        </v-btn>

        <base-store-link />

        <base-ecosystems-menu />

        <base-support-menu />

        <base-locales-menu />
      </v-toolbar-items>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'FrontendAppBar',
  }
</script>
