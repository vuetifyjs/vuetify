<template>
  <v-menu
    bottom
    left
    max-height="calc(100% - 16px)"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        :aria-label="$t('Vuetify.AppToolbar.ecosystem')"
        class="hidden-md-and-down"
        text
        v-bind="attrs"
        v-on="on"
      >
        <base-nav-text class="hidden-sm-and-down">Vuetify.AppToolbar.ecosystem</base-nav-text>

        <v-icon
          class="hidden-sm-and-down"
          right
        >
          mdi-menu-down
        </v-icon>

        <v-icon class="hidden-md-and-up">mdi-earth</v-icon>
      </v-btn>
    </template>

    <v-list
      dense
      nav
    >
      <v-subheader v-text="$t('Vuetify.AppToolbar.quickLinks')" />

      <base-item
        v-for="ecosystem in ecosystems"
        :key="ecosystem.text"
        v-bind="ecosystem"
        no-markdown
        @click="$ga.event('toolbar', 'click', 'ecosystems', ecosystem.text)"
      />

      <v-divider />

      <v-subheader v-text="$t('Vuetify.AppToolbar.social')" />

      <base-item
        v-for="social in socials"
        :key="social.text"
        v-bind="social"
        no-markdown
        @click="$ga.event('toolbar', 'click', 'ecosystems', social.text)"
      />
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
          href: 'https://theme-generator.vuetifyjs.com',
        },
        {
          text: 'vuetify-loader',
          icon: 'mdi-package-variant-closed',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.cognito'),
          icon: 'mdi-server-network',
          href: 'https://cognito.vuetifyjs.com',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.eslint'),
          icon: 'mdi-eslint',
          href: 'https://github.com/vuetifyjs/eslint-config-vuetify',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.reddit'),
          href: 'https://www.reddit.com/r/vuetifyjs/',
          icon: 'mdi-reddit',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.medium'),
          href: 'https://medium.com/vuetify',
          icon: 'mdi-medium',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.awesome'),
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
          icon: 'mdi-creation',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.codepen'),
          href: 'https://template.vuetifyjs.com',
          icon: 'mdi-codepen',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.latest'),
          href: 'https://github.com/vuetifyjs/vuetify/releases',
          icon: 'mdi-format-list-checks',
        },
      ],
      socials: [
        {
          text: vm.$t('Vuetify.AppToolbar.github'),
          href: 'https://github.com/vuetifyjs/vuetify',
          icon: 'mdi-github-box',
        },
        {
          text: vm.$t('Vuetify.AppToolbar.twitter'),
          href: 'https://twitter.com/vuetifyjs',
          icon: 'mdi-twitter-box',
        },
      ],
    }),
  }
</script>
