<template>
  <v-toolbar
    id="app-toolbar"
    app
    clipped-right
    color="primary"
    dark
    fixed
    height="58"
    extension-height="48"
  >
    <v-toolbar-side-icon v-if="!hideSideIcon" @click="toggleDrawer" />

    <router-link
      :to="{ name: 'home/Home' }"
      class="d-flex"
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

    <v-toolbar-title class="pb-1 hidden-xs-only">Vuetify</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-menu
        attach
        bottom
        lazy
        left
        offset-y
      >
        <v-btn
          slot="activator"
          flat
          style="min-width: 48px"
          aria-label="Translations"
        >
          <v-img
            :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`"
            width="26px"
          />
        </v-btn>
        <v-list
          dense
          light
        >
          <v-list-tile
            v-for="language in languages"
            :key="language.locale"
            avatar
            @click="translateI18n(language.locale)"
          >
            <v-list-tile-avatar
              tile
              size="24px"
            >
              <v-img
                :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
                width="24px"
              />
            </v-list-tile-avatar>
            <v-list-tile-title v-text="language.name" />
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        flat
        style="min-width: 48px"
        href="https://store.vuetifyjs.com"
        target="_blank"
        rel="noopener"
      >
        {{ $t('Vuetify.AppToolbar.store') }}
      </v-btn>

      <v-menu
        attach
        bottom
        lazy
        left
        offset-y
        max-height="500"
      >
        <v-btn
          slot="activator"
          :aria-label="$t('Vuetify.AppToolbar.ecosystem')"
          flat
          style="min-width: 48px"
        >
          <span
            class="mr-1"
            v-text="$t('Vuetify.AppToolbar.ecosystem')"
          />
          <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
          <v-icon class="hidden-md-and-up">mdi-earth</v-icon>
        </v-btn>

        <v-list
          light
          dense
        >
          <v-subheader
            light
            v-text="$t('Vuetify.AppToolbar.quickLinks')"
          />

          <v-list-tile
            v-for="ecosystem in ecosystems"
            :href="ecosystem.href"
            :key="ecosystem.text"
            target="_blank"
            rel="noopener"
          >
            <v-list-tile-action>
              <v-icon
                light
                v-text="ecosystem.icon"
              />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="ecosystem.text" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />

          <v-subheader v-text="$t('Vuetify.AppToolbar.social')" />

          <v-list-tile
            v-for="social in socials"
            :href="social.href"
            :key="social.text"
            target="_blank"
            rel="noopener"
          >
            <v-list-tile-action>
              <v-icon
                light
                v-text="social.icon"
              />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="social.text" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu
        attach
        bottom
        lazy
        left
        offset-y
        max-height="500"
      >
        <v-btn
          slot="activator"
          flat
          style="min-width: 48px"
        >
          <span
            class="mr-1"
            v-text="$t('Vuetify.AppToolbar.support')"
          />
          <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
          <v-icon class="hidden-md-and-up">mdi-lifebuoy</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile
            v-for="support in supports"
            :href="support.href"
            :key="support.text"
            target="_blank"
            rel="noopener"
          >
            <v-list-tile-action>
              <v-icon
                light
                v-text="support.icon"
              />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="support.text" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu
        attach
        bottom
        lazy
        left
        offset-y
        class="hidden-xs-only"
      >
        <v-btn
          slot="activator"
          flat
        >
          <span
            class="mr-1"
            v-text="currentVersion"
          />
        </v-btn>
      </v-menu>
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
      ecosystems: vm.$t('Vuetify.AppToolbar.ecosystems'),
      supports: vm.$t('Vuetify.AppToolbar.supports'),
      languages,
      socials: vm.$t('Vuetify.AppToolbar.socials')
    }),

    computed: {
      ...mapState('app', [
        'currentVersion'
      ]),
      currentLanguage () {
        return this.languages.find(l => l.locale === this.$i18n.locale)
      },
      hideSideIcon () {
        return this.$route.name === 'home/Home'
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
