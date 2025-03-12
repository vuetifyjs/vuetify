<template>
  <v-toolbar
    id="app-toolbar"
    :class="`elevation-${isHome ? 0 : 0}`"
    app
    color="white"
    clipped-left
    clipped-right
    fixed
    height="58"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12) !important"
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
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        contain
        transition="scale-transition"
        :width="$vuetify.breakpoint.lgAndUp ? 148 : 96"
      />
    </router-link>
    <!-- <v-toolbar-title class="hidden-xs-only">Vuetify</v-toolbar-title> -->
    <v-spacer />

    <v-toolbar-items>
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
