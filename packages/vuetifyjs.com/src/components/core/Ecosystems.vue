<template>
  <v-menu
    attach
    bottom
    left
    offset-y
    max-height="700"
  >
    <v-btn
      slot="activator"
      :aria-label="$t('Vuetify.AppToolbar.ecosystem')"
      text
      style="min-width: 48px"
    >
      <span
        class="hidden-sm-and-down mr-1"
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
        @click="$ga.event('toolbar', 'click', 'support', social.href)"
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
</template>

<script>
  export default {
    data: vm => ({
      ecosystems: [
        {
          text: vm.$t('Vuetify.AppToolbar.themeGenerator'),
          icon: 'mdi-format-paint',
          href: 'https://theme-generator.vuetifyjs.com'
        },
        {
          text: 'vuetify-loader',
          icon: 'mdi-package-variant-closed',
          href: 'https://github.com/vuetifyjs/vuetify-loader'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.cognito'),
          icon: 'mdi-server-network',
          href: 'https://cognito.vuetifyjs.com'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.eslint'),
          icon: 'mdi-eslint',
          href: 'https://github.com/vuetifyjs/eslint-config-vuetify'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.reddit'),
          href: 'https://www.reddit.com/r/vuetifyjs/',
          icon: 'mdi-reddit'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.medium'),
          href: 'https://medium.com/vuetify',
          icon: 'mdi-medium'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.awesome'),
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
          icon: 'mdi-creation'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.codepen'),
          href: 'https://template.vuetifyjs.com',
          icon: 'mdi-codepen'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.latest'),
          href: 'https://github.com/vuetifyjs/vuetify/releases',
          icon: 'mdi-format-list-checks'
        }
      ],
      socials: [
        {
          text: vm.$t('Vuetify.AppToolbar.github'),
          href: 'https://github.com/vuetifyjs/vuetify',
          icon: 'mdi-github-box'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.twitter'),
          href: 'https://twitter.com/vuetifyjs',
          icon: 'mdi-twitter-box'
        },
        {
          text: vm.$t('Vuetify.AppToolbar.facebook'),
          href: 'https://www.facebook.com/vuetifyjs',
          icon: 'mdi-facebook-box'
        }
      ]
    })
  }
</script>
