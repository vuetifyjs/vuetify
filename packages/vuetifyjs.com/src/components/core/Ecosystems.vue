<template>
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
      ecosystems: vm.$t('Vuetify.AppToolbar.ecosystems'),
      socials: vm.$t('Vuetify.AppToolbar.socials')
    })
  }
</script>
