<template lang="pug">
  v-toolbar(
    color="primary"
    app
    dark
    fixed
    :inverted-scroll="getManualScroll($route.path)"
    scroll-off-screen
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(
      @click="$store.commit('app/DRAWER_TOGGLE')"
      v-show="!stateless && $vuetify.breakpoint.mdAndDown"
    )
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
      )
        v-btn(
          slot="activator"
          flat
        )
          span Translations
          v-icon keyboard_arrow_down
        v-list(light)
          v-list-tile(
            v-for="language in languages"
            :key="language.locale"
            @click="translateI18n(language.locale)"
          )
            v-list-tile-title {{language.title}}
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
      isManualScrolling: false,
      languages: [
        {
          title: 'English',
          locale: 'en'
        },
        {
          title: 'русский',
          locale: 'ru'
        }
      ]
    }),

    computed: {
      ...mapState({
        currentVersion: state => state.currentVersion,
        fullscreenRoutes: state => state.fullscreenRoutes,
        loadedLangs: state => state.loadedLangs,
        releases: state => state.releases,
        stateless: state => state.stateless
      })
    },

    methods: {
      changeToRelease (release) {
        window.location.href = `${window.location.origin}/releases/${release}/#${this.$route.fullPath}`
      },
      getManualScroll (path) {
        return this.fullscreenRoutes.includes(path)
      },
      async translateI18n (lang) {
        if (this.loadedLangs.indexOf(lang) < 0) {
          await import(
            /* webpackChunkName: "lang-[request]" */
            /* webpackMode: "lazy-once" */
            `@/lang/${lang}`
          ).then(msgs => this.$i18n.setLocaleMessage(lang, msgs.default))
          .catch(err => Promise.resolve(err))
        }

        document.querySelector('html').setAttribute('lang', lang)

        this.$i18n.locale = lang
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
