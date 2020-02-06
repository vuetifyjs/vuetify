<template>
  <v-menu
    v-model="menu"
    max-height="500"
    offset-y
    right
    top
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="text--secondary text-lowercase"
        rounded
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>mdi-tag-outline</v-icon>

        <span v-text="version" />

        <v-icon right>mdi-menu-{{ menu ? 'up' : 'down' }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list
        class="px-0 py-1"
        dense
        nav
      >
        <v-subheader v-text="$t('Vuetify.AppToolbar.documentation')" />

        <base-item
          v-for="(archive, i) in archives"
          :key="`archives-${i}`"
          v-bind="archive"
          no-markdown
          @click="$ga.event('toolbar', 'click', 'versions', archive.text)"
        />

        <v-divider />

        <v-subheader v-text="$t('Vuetify.AppToolbar.releases')" />

        <base-item
          v-for="(release, i) in releases"
          :key="`releases-${i}`"
          v-bind="release"
          no-markdown
          @click="$ga.event('toolbar', 'click', 'versions', release.text)"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'BaseVersionsMenu',

    data: () => ({
      menu: false,
    }),

    computed: {
      currentVersion: sync('app/currentVersion'),
      archives () {
        return [
          {
            icon: 'mdi-shield-lock',
            text: 'v1.5.x',
            subtext: this.$t('Vuetify.AppToolbar.stable'),
            href: 'https://v15.vuetifyjs.com',
          },
          {
            icon: 'mdi-package',
            text: 'v1.0.x',
            subtext: this.$t('Vuetify.AppToolbar.archived'),
            href: 'https://v1.vuetifyjs.com',
          },
          {
            icon: 'mdi-developer-board',
            text: this.$t('Vuetify.AppToolbar.dev'),
            subtext: this.$t('Vuetify.AppToolbar.inDev'),
            href: 'https://dev.vuetifyjs.com',
          },
          {
            icon: 'mdi-rocket',
            text: this.$t('Vuetify.AppToolbar.next'),
            subtext: this.$t('Vuetify.AppToolbar.inDev'),
            href: 'https://next.vuetifyjs.com',
          },
        ]
      },
      releases () {
        return [
          {
            icon: 'mdi-star-box',
            href: `https://github.com/vuetifyjs/vuetify/releases/${this.version}`,
            text: this.$t('Vuetify.AppToolbar.current'),
            subtext: this.version,
          },
        ]
      },
      version () {
        return `v${this.currentVersion}`
      },
    },
  }
</script>
