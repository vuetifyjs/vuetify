<template>
  <v-app-bar
    id="app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
  >
    <home-app-bar-logo :alt="lgAndUp" />

    <v-spacer />

    <app-bar-learn-menu />
    <app-bar-support-menu />
    <app-bar-team-link />
    <app-bar-language-menu />
  </v-app-bar>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useDisplay } from 'vuetify/lib/composables/display.mjs'

  export default defineComponent({
    name: 'HomeAppBar',

    setup () {
      const { lgAndUp } = useDisplay()

      // data
      const dark = false

      return {
        dark,
        lgAndUp,
      }
    },

  })
</script>
