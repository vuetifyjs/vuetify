<template>
  <v-app-bar
    id="app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    elevation="1"
  >
    <app-bar-logo :alt="lgAndUp" />

    <v-spacer />

    <template v-if="smAndUp">
      <app-vertical-divider />

      <app-bar-learn-menu />
      <app-bar-support-menu />
      <template v-if="mdAndUp">
        <app-bar-team-link />

        <app-vertical-divider />

        <app-bar-store-link />
        <app-bar-jobs-link />
        <app-bar-notifications-menu />

        <app-vertical-divider />

        <app-bar-settings-toggle />
        <app-bar-language-menu />
      </template>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useDisplay } from 'vuetify/lib/composables/display.mjs'

  export default defineComponent({
    name: 'AppBar',

    setup () {
      const { lgAndUp, smAndUp, mdAndUp } = useDisplay()

      // data
      const dark = false

      return {
        dark,
        lgAndUp,
        mdAndUp,
        smAndUp,
      }
    },

  })
</script>
