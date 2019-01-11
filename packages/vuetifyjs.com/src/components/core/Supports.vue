<template>
  <v-menu
    attach
    bottom
    left
    offset-y
    max-height="500"
  >
    <v-btn
      slot="activator"
      :aria-label="$t('Vuetify.AppToolbar.support')"
      text
      style="min-width: 48px"
    >
      <span
        class="hidden-sm-and-down mr-1"
        v-text="$t('Vuetify.AppToolbar.support')"
      />
      <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
      <v-icon class="hidden-md-and-up">mdi-comment-question</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile
        v-for="support in supports"
        :href="support.href"
        :key="support.text"
        target="_blank"
        rel="noopener"
        @click="$ga.event('toolbar', 'click', 'support', support.href)"
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
</template>

<script>
  export default {
    data: vm => ({
      supports: [
        {
          href: 'https://community.vuetifyjs.com/',
          icon: 'mdi-discord',
          text: vm.$t('Vuetify.AppToolbar.community')
        },
        {
          href: 'https://issues.vuetifyjs.com',
          icon: 'mdi-bug',
          text: vm.$t('Vuetify.AppToolbar.bug')
        },
        {
          href: 'https://github.com/vuetifyjs/vuetify/issues',
          icon: 'mdi-github-face',
          text: vm.$t('Vuetify.AppToolbar.issues')
        },
        {
          href: 'https://stackoverflow.com/search?q=vuetify',
          icon: 'mdi-stack-overflow',
          text: vm.$t('Vuetify.AppToolbar.stack')
        }
      ]
    })
  }
</script>
