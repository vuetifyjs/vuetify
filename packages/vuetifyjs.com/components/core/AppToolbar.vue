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
        width="38px"
      )

    v-fade-transition(mode="out-in")
      v-btn(flat :to="backPath" v-if="$route.path.name === 'store/Index'")
        v-icon(left) mdi-arrow-left
        span {{ $t('Vuetify.AppToolbar.backToDocs' )}}
      v-toolbar-title(v-else).pb-1.hidden-xs-only Vuetify

    v-spacer
    v-toolbar-items
      v-btn(
        flat
        v-show="isHome"
        :to="{ name: 'getting-started/QuickStart' }"
      )
        span.hidden-md-and-up {{ $t('Vuetify.AppToolbar.docs' )}}
        span.hidden-sm-and-down {{ $t('Vuetify.AppToolbar.documentation' )}}
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
          style="min-width: 64px"
        )
          img(
            :src="`https://countryflags.io/${currentLanguage.country}/flat/32.png`"
            width="32px"
          )
        v-list(light)
          v-list-tile(
            avatar
            v-for="language in languages"
            :key="language.locale"
            @click="translateI18n(language.locale)"
          )
            v-list-tile-avatar(size="24px").avatar--tile
              img(
                :src="`https://countryflags.io/${language.country}/flat/24.png`"
                width="24px"
              )
            v-list-tile-title {{language.title}}
    v-toolbar-items
      v-btn(
        flat
        style="min-width: 64px"
        v-show="!isStore"
        :to="{ name: 'store/Index' }"
      )
        span.hidden-sm-and-down {{ $t('Vuetify.AppToolbar.store' )}}
        v-icon(:right="$vuetify.breakpoint.mdAndUp") store

    v-toolbar-items
      v-menu(
        attach
        bottom
        left
        offset-y
        v-show="!isStore"
      )
        v-btn(
          flat
          slot="activator"
          style="min-width: 64px"
        )
          span.hidden-sm-and-down {{ $t('Vuetify.AppToolbar.ecosystem' )}}
          v-icon(:right="$vuetify.breakpoint.mdAndUp") mdi-earth
        v-list(light)
          v-subheader(light) {{ $t('Vuetify.AppToolbar.quickLinks' )}}
          v-list-tile(
            target="_blank"
            rel="noopener"
            v-for="ecosystem in ecosystems"
            :href="ecosystem.href"
            :key="ecosystem.text"
          )
            v-list-tile-action
              v-icon(light) {{ ecosystem.icon }}
            v-list-tile-content
              v-list-tile-title {{ ecosystem.text }}
          v-divider(light)
          v-subheader(light) {{ $t('Vuetify.AppToolbar.social' )}}
          v-list-tile(
            target="_blank"
            rel="noopener"
            v-for="social in socials"
            :href="social.href"
            :key="social.text"
          )
            v-list-tile-action
              v-icon(light) {{ social.icon }}
            v-list-tile-content
              v-list-tile-title {{ social.text }}

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
          v-icon(right) keyboard_arrow_down
        v-list(light)
          v-list-tile(
            v-for="release in releases"
            :key="release"
            @click="changeToRelease(release)"
          )
            v-list-tile-avatar
              v-icon(light) mdi-package
            v-list-tile-content
              v-list-tile-title {{ release }}

      v-btn(
        v-if="isStore && cart"
        flat
        :to="{ name: 'store/Cart' }"
        dark
      )
        v-badge(color="red" left :value="cart.lineItems.length")
          template(slot="badge") {{ cart.lineItems.length }}
          v-icon(left) shopping_cart
        span {{ $t('Vuetify.AppToolbar.cart' )}}
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

    data: vm => ({
      ecosystems: vm.$t('Vuetify.AppToolbar.ecosystems'),
      fixed: false,
      languages,
      socials: vm.$t('Vuetify.AppToolbar.socials')
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
      currentLanguage () {
        return this.languages.find(l => l.locale === this.$i18n.locale)
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
        // Remove language setting
        const path = this.$route.fullPath.split('/')
          .slice(2)
          .join('/')
        window.location.href = `${window.location.origin}/releases/${release}/#/${path}`
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
        font-size 16px
        font-weight 300
</style>
