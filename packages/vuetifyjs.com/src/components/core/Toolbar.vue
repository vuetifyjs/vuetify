<template>
  <v-toolbar
    id="app-toolbar"
    :class="`elevation-${isHome ? 0 : 6}`"
    app
    clipped-left
    clipped-right
    color="primary"
    dark
    fixed
    height="58"
  >
    <v-toolbar-side-icon
      v-if="!isHome"
      :aria-label="$t('Vuetify.AppToolbar.menu')"
      class="hidden-lg-and-up"
      @click="toggleDrawer"
    />

    <router-link :to="{ name: 'home/Home' }">
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
        class="hidden-xs-only"
        flat
        style="min-width: 48px;"
        to="getting-started/quick-start"
      >
        <span class="hidden-sm-and-down">{{ $t('Vuetify.AppToolbar.documentation' ) }}</span>
        <v-icon class="hidden-md-and-up">mdi-file-document-box</v-icon>
      </v-btn>
      <core-store />
      <core-supports />
      <core-ecosystems />
      <core-versions />
      <core-locales />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import languages from '@/data/i18n/languages.json'

  export default {
    name: 'CoreToolbar',

    data: vm => ({
      languages
    }),

    computed: {
      ...mapState('route', ['name', 'params']),
      isHome () {
        return this.name === 'home/Home'
      }
    },

    methods: {
      ...mapMutations('app', ['toggleDrawer']),
      changeToRelease (release) {
        // Remove language setting
        const path = this.$route.fullPath.split('/')
          .slice(2)
          .join('/')
        window.location.href = `${window.location.origin}/releases/${release}/#/${path}`
      }
    }
  }
</script>

<style lang="stylus">
  #app-toolbar
    .v-toolbar__title
      margin-left .5em
      font-weight 300
      font-size 21px
      position relative
      top 1px

    .v-toolbar__items
      .v-btn
        text-transform capitalize
        font-size 16px
        font-weight 300

    .v-toolbar__extension
      padding: 0
</style>
