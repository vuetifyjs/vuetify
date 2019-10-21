<template>
  <v-menu
    bottom
    left
    max-height="500"
    offset-y
  >
    <template v-slot:activator="{ on: menu }">
      <v-btn
        class="hidden-md-and-down"
        text
        v-on="menu"
      >
        <base-nav-text v-text="version" />
        <span
          class="text-lowercase mr-1"
          v-text="version"
        />

        <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list
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
