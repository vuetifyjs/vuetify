<template>
  <v-app-bar
    id="app-toolbar"
    :elevate-on-scroll="isHome"
    app
    clipped-left
    clipped-right
    color="primary"
    dark
    fixed
    extension-height="40"
  >
    <v-app-bar-nav-icon
      v-if="!isHome"
      :aria-label="$t('Vuetify.AppToolbar.menu')"
      class="hidden-lg-and-up"
      @click="toggleDrawer"
    />

    <router-link
      :to="{ name: 'home/Home' }"
      aria-label="Vuetify Home Page"
      title="Vuetify Home Page"
    >
      <v-img
        alt="Vuetify Logo"
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        contain
        transition="scale-transition"
        height="38px"
        width="38px"
      />
    </router-link>
    <v-toolbar-title class="hidden-xs-only">Vuetify</v-toolbar-title>
    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-show="isHome"
        :aria-label="$t('Vuetify.AppToolbar.documentation')"
        :to="{
          name: 'Documentation',
          params: {
            lang: $route.params.lang,
            namespace: 'getting-started',
            page: 'quick-start'
          }
        }"
        class="hidden-xs-only"
        text
        style="min-width: 48px;"
      >
        <span class="hidden-sm-and-down">{{ $t('Vuetify.AppToolbar.documentation' ) }}</span>
        <v-icon class="hidden-md-and-up">mdi-file-document-box</v-icon>
      </v-btn>
      <core-store />
      <core-enterprise />
      <core-supports />
      <core-ecosystems />
      <core-versions />
      <core-locales />
    </v-toolbar-items>

    <template v-if="isHome" v-slot:extension>
      <v-layout
        align-center
        justify-center
        fill-height
        white
        text--primary
      >
        Looking for the&nbsp;<a class="primary--text font-weight-bold" href="https://v15.vuetifyjs.com" aria-label="v1.5 documentation">v1.5 documentation</a>?
      </v-layout>
    </template>
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState,
  } from 'vuex'
  import languages from '@/data/i18n/languages.json'

  export default {
    name: 'CoreToolbar',

    data: vm => ({
      languages,
    }),

    computed: {
      ...mapState('route', ['name', 'params']),
      isHome () {
        return this.name === 'home/Home'
      },
    },

    methods: {
      ...mapMutations('app', ['toggleDrawer']),
      changeToRelease (release) {
        // Remove language setting
        const path = this.$route.fullPath.split('/')
          .slice(2)
          .join('/')
        window.location.href = `${window.location.origin}/releases/${release}/#/${path}`
      },
    },
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
</style>
