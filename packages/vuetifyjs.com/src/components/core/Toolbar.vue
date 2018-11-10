<template lang="pug">
  v-toolbar(
    app
    clipped-right
    color="primary"
    dark
    fixed
    height="58"
    extension-height="48"
    :flat="isHome"
    :manual-scroll="isManualScrolled"
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(
      @click="$store.commit('app/DRAWER_TOGGLE')"
      v-show="!stateless"
    )
    router-link(:to="logoLink").d-flex
      img(
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
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
        v-show="isHome"
        :to="logoLink"
        class="hidden-xs-only"
        flat
        style="min-width: 48px"
      )
        translation-translatable(:i18n="$vuetify.breakpoint.mdAndUp ? 'Vuetify.AppToolbar.documentation' : 'Vuetify.AppToolbar.docs'")
        span.hidden-sm-and-down {{ $t('Vuetify.AppToolbar.documentation' )}}
        v-icon.hidden-md-and-up mdi-file-document-box
      v-menu(
        bottom
        offset-y
        left
        attach
      )
        v-btn(
          slot="activator"
          flat
          style="min-width: 48px"
        )
          img(
            :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`"
            width="26px"
          )
        v-list(light)
          v-list-tile(
            avatar
            v-for="language in languages"
            :key="language.locale"
            @click="translateI18n(language.locale)"
          )
            v-list-tile-avatar(tile size="24px")
              img(
                :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
                width="24px"
              )
            v-list-tile-title {{language.name}}
          v-list-tile(
            v-if="isTranslating"
            @click="showCreateDialog(true)"
          )
            v-list-tile-title New translation
    v-toolbar-items
      v-btn(
        :to="{ name: 'store/Front' }"
        flat
        style="min-width: 48px"
      )
        translation-translatable(i18n="Vuetify.AppToolbar.store")
        v-badge(color="red lighten-2")
          v-icon(
            v-if="storeSale"
            slot="badge"
            v-text="storeSale"
          )
          span.hidden-sm-and-down {{ $t('Vuetify.AppToolbar.store' )}}
          v-icon.hidden-md-and-up store

    v-toolbar-items
      v-menu(
        attach
        bottom
        left
        offset-y
        max-height="500"
      )
        v-btn(
          flat
          slot="activator"
          style="min-width: 48px"
        )
          translation-translatable(i18n="Vuetify.AppToolbar.ecosystem").hidden-sm-and-down
            span.mr-1 {{ $t('Vuetify.AppToolbar.ecosystem' )}}
          v-icon.hidden-sm-and-down mdi-menu-down
          v-icon.hidden-md-and-up mdi-earth

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
        attach
        bottom
        left
        offset-y
        max-height="500"
      )
        v-btn(
          flat
          slot="activator"
          style="min-width: 48px"
        )
          translation-translatable(i18n="Vuetify.AppToolbar.support").hidden-sm-and-down
            span.mr-1 {{ $t('Vuetify.AppToolbar.support' )}}
          v-icon.hidden-sm-and-down mdi-menu-down
          v-icon.hidden-md-and-up mdi-lifebuoy
        v-list(light)
          v-list-tile(
            target="_blank"
            rel="noopener"
            v-for="support in supports"
            :href="support.href"
            :key="support.text"
          )
            v-list-tile-action
              v-icon(light) {{ support.icon }}
            v-list-tile-content
              v-list-tile-title {{ support.text }}

      v-menu(
        bottom
        left
        offset-y
        attach
      ).hidden-xs-only
        v-btn(
          slot="activator"
          flat
        )
          span.mr-1 {{ currentVersion }}
          v-icon mdi-menu-down
        v-list(light)
          v-list-tile(href="https://v1.vuetifyjs.com")
            v-list-tile-avatar
              v-icon(light) mdi-package
            v-list-tile-content
              v-list-tile-title 1.0
          v-list-tile(
            v-for="release in releases"
            :key="release"
            :href="`/releases/${release}`"
            @click.prevent="changeToRelease(release)"
          )
            v-list-tile-avatar
              v-icon(light) mdi-package
            v-list-tile-content
              v-list-tile-title {{ release }}

    store-toolbar(
      v-if="isStore"
      slot="extension"
    )
</template>

<script>
  // Components
  import StoreToolbar from '@/components/store/Toolbar'

  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import languages from '@/data/i18n/languages.json'

  export default {
    components: {
      StoreToolbar
    },

    data: vm => ({
      ecosystems: vm.$t('Vuetify.AppToolbar.ecosystems'),
      supports: vm.$t('Vuetify.AppToolbar.supports'),
      fixed: false,
      languages,
      socials: vm.$t('Vuetify.AppToolbar.socials')
    }),

    computed: {
      ...mapGetters('store', ['storeSale']),
      ...mapState('translation', [
        'isTranslating'
      ]),
      ...mapState('app', [
        'appToolbar',
        'isFullscreen',
        'releases',
        'stateless',
        'currentVersion'
      ]),
      ...mapState(['route']),
      backPath () {
        return this.route.from.path === '/'
          ? { name: 'getting-started/QuickStart' }
          : this.route.from.path
      },
      currentLanguage () {
        return this.languages.find(l => l.locale === this.$i18n.locale)
      },
      isHome () {
        return this.route.name === 'home/Home'
      },
      isManualScrolled () {
        return !this.isHome &&
          this.isFullscreen
      },
      isStore () {
        return this.$route.name.startsWith('store/')
      },
      logoLink () {
        return this.isHome
          ? { name: 'getting-started/QuickStart' }
          : { name: 'home/Home' }
      }
    },

    methods: {
      ...mapMutations({
        showCreateDialog: 'translation/SHOW_CREATE_DIALOG'
      }),
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
