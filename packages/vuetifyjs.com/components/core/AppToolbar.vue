<template lang="pug">
  v-toolbar(
    color="primary"
    app
    dark
    fixed
    :inverted-scroll="isManualScrolling"
    :scroll-off-screen="isManualScrolling"
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(@click="$store.commit('app/DRAWER_TOGGLE')" v-if="!stateless").hidden-lg-and-up
    router-link(to="/").d-flex.ml-3
      img(
        src="/static/v-alt.svg"
        height="38px"
      )
    v-toolbar-title.pb-1.hidden-xs-only Vuetify
    v-spacer
    v-toolbar-items
      v-menu(
        bottom
        offset-y
        left
        attach
        min-width="300"
      )
        v-btn(
          slot="activator"
          flat
        )
          span Translations
          v-icon keyboard_arrow_down
        v-card(light)
          v-card-title.title Coming soon!
          v-card-text
            div For more information, visit the <a href="https://discord.gg/CweuCn7" target="_blank">community</a>
      v-menu(bottom offset-y attach).hidden-xs-only
        v-btn(
          slot="activator"
          flat
        )
          span {{ currentVersion }}
          v-icon keyboard_arrow_down
        v-list(light)
          v-list-tile(
            v-for="release in releases"
            :key="release"
            @click="changeToRelease(release)"
          )
            v-list-tile-title {{ release }}
      v-btn(
        flat
        v-if="$route.path === '/'"
        to="/getting-started/quick-start"
      )
        span.hidden-md-and-up Docs
        span.hidden-sm-and-down Documentation
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      fixed: false,
      isManualScrolling: false
    }),

    computed: {
      ...mapState({
        currentVersion: state => state.currentVersion,
        releases: state => state.releases,
        stateless: state => state.stateless
      })
    },

    watch: {
      $route (current) {
        const isManualScrolling = this.getManualScroll(current.path)
        const duration = isManualScrolling ? 0 : 400

        setTimeout(() => {
          this.isManualScrolling = isManualScrolling
        }, duration)
      }
    },

    created () {
      this.isManualScrolling = this.getManualScroll(this.$route.path)
    },

    methods: {
      changeToRelease (release) {
        window.location.href = `${window.location.origin}/releases/${release}/#${this.$route.fullPath}`
      },
      getManualScroll (path) {
        return ['/', '/404'].includes(path)
      }
    }
  }
</script>

<style lang="stylus">
  #app-toolbar
    .toolbar__title
      margin-left .5em
      font-weight 300
      font-size 21px
      position relative
      top 1px

    .toolbar__items
      .btn
        text-transform capitalize
        font-size 18px
        font-weight 300
</style>
