<template>
  <v-menu
    bottom
    left
    offset-y
    max-height="500"
  >
    <template #activator="{ on: menu }">
      <v-btn
        class="hidden-md-and-down"
        flat
        v-on="menu"
      >
        <span
          class="text-lowercase mr-1"
          v-text="version"
        />
        <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list dense>
        <v-subheader v-text="$t('Vuetify.AppToolbar.documentation')" />
        <core-item
          v-for="(archive, i) in archives"
          :key="`archives-${i}`"
          v-bind="archive"
          no-markdown
          @click="$ga.event('toolbar', 'click', 'versions', archive.text)"
        />
        <v-divider />
        <v-subheader v-text="$t('Vuetify.AppToolbar.releases')" />
        <core-item
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
    mapState
  } from 'vuex'

  export default {
    computed: {
      ...mapState('app', [
        'currentVersion'
      ]),
      archives () {
        return [
          {
            icon: 'mdi-rocket',
            text: 'v2.0.0',
            subtext: this.$t('Vuetify.AppToolbar.next'),
            href: 'https://next.vuetifyjs.com'
          },
          {
            icon: 'mdi-package',
            text: 'v1.0.x',
            subtext: this.$t('Vuetify.AppToolbar.archived'),
            href: 'https://v1.vuetifyjs.com'
          },
          {
            icon: 'mdi-developer-board',
            text: this.$t('Vuetify.AppToolbar.inDev'),
            subtext: this.$t('Vuetify.AppToolbar.dev'),
            href: 'https://dev.vuetifyjs.com'
          }
        ]
      },
      releases () {
        return [
          {
            icon: 'mdi-star-box',
            href: `https://github.com/vuetifyjs/vuetify/releases/${this.version}`,
            text: this.$t('Vuetify.AppToolbar.current'),
            subtext: this.version
          }
        ]
      },
      version () {
        return `v${this.currentVersion}`
      }
    }
  }
</script>
