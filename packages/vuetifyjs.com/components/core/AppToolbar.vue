<template lang="pug">
  v-toolbar(
    color="primary"
    app
    dark
    fixed
    scroll-off-screen
    height="58px"
    :manual-scroll="isManualScrolled"
    :inverted-scroll="isHome"
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(
      @click="$store.commit('app/DRAWER_TOGGLE')"
      v-show="!stateless && $vuetify.breakpoint.mdAndDown"
    )
    router-link(:to="{ name: 'Home' }").d-flex.ml-3
      img(
        src="/static/v-alt.svg"
        height="38px"
      )

    v-fade-transition(mode="out-in")
      v-btn(flat :to="backPath" v-if="$route.path.name === 'store/Index'")
        v-icon(left) mdi-arrow-left
        span Back to Docs
      v-toolbar-title(v-else).pb-1.hidden-xs-only Vuetify

    v-spacer
    v-toolbar-items
      v-btn(
        flat
        v-show="!isStore"
        :to="{ name: 'store/Index' }"
      )
        span.hidden-sm-and-down Store
        v-icon(right) store
    v-toolbar-items
      v-btn(
        flat
        v-show="isHome"
        :to="{ name: 'getting-started/QuickStart' }"
      )
        span.hidden-md-and-up Docs
        span.hidden-sm-and-down Documentation
      v-menu(
        bottom
        offset-y
        left
        attach
        v-show="!isStore"
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
      v-menu(
        bottom
        offset-y
        attach
        v-show="!isStore"
      ).hidden-xs-only
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
        v-if="isStore && cart"
        flat
        :to="{ name: 'store/Cart' }"
        active-class="btn"
      )
        v-badge(color="red" left :value="cart.lineItems.length")
          template(slot="badge") {{ cart.lineItems.length }}
          v-icon(left) shopping_cart
        span Cart
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import asyncData from '@/util/asyncData'
  import languages from '@/i18n/languages'

  export default {
    mixins: [asyncData],

    asyncData ({ store, route }) {
      return store.state.store.cart && route.name.startsWith('store/')
        ? Promise.resolve()
        : store.dispatch('store/getCheckout')
    },

    data: () => ({
      fixed: false,
      languages
    }),

    computed: {
      ...mapState('app', [
        'appToolbar',
        'isFullscreen',
        'releases',
        'stateless'
      ]),
      ...mapState('store', {
        cart: state => state.checkout
      }),
      ...mapState(['currentVersion', 'route']),
      backPath () {
        return this.route.from.path === '/'
          ? { name: 'getting-started/QuickStart' }
          : this.route.from.path
      },
      isHome () {
        return this.route.name === 'Home'
      },
      isManualScrolled () {
        return !this.isHome &&
          this.isFullscreen
      },
      isStore () {
        return this.$route.name.startsWith('store/')
      }
    },

    methods: {
      changeToRelease (release) {
        window.location.href = `${window.location.origin}/releases/${release}/#${this.$route.fullPath}`
      },
      translateI18n (lang) {
        this.$router.replace({ params: { lang } })
        document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
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
