<template>
  <v-btn
    :href="`https://github.com/vuetifyjs/vuetify/releases/${version}`"
    class="hidden-xs-only"
    flat
    target="_blank"
    rel="noopener"
  >
    <span
      class="text-lowercase"
      v-text="version"
    />
  </v-btn>
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
      version () {
        return `v${this.currentVersion}`
      }
    }
  }
</script>
