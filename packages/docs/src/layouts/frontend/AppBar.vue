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
      <router-link
        :to="{
          name: 'Home',
          params: {
            lang: $route.params.lang
          }
        }"
        aria-label="Vuetify Home Page"
        class="d-flex align-center"
        title="Vuetify Home Page"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          max-width="100"
        />
      </router-link>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          :aria-label="$t('Vuetify.AppToolbar.documentation')"
          :to="`/${$route.params.lang}/getting-started/quick-start`"
          class="hidden-xs-only"
          exact
          min-width="48"
          text
        >
          <span class="hidden-sm-and-down">{{ $t('Vuetify.AppToolbar.documentation' ) }}</span>

          <v-icon class="hidden-md-and-up">mdi-file-document-box</v-icon>
        </v-btn>

        <core-store />

        <core-supports />

        <core-ecosystems />

        <core-locales />
      </v-toolbar-items>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'FrontendAppBar',
  }
</script>

<style lang="sass">
  #app-toolbar
    .v-toolbar__title
      margin-left: .5em
      font-weight: 300
      font-size: 21px
      position: relative
      top: 1px

    .v-toolbar__items
      .v-btn
        text-transform: capitalize
        font-size: 16px
        font-weight: 300

    .v-toolbar__extension
      padding: 0
      z-index: -1
</style>
