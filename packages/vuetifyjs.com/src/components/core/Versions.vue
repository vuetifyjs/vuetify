<template>
  <v-menu
    attach
    bottom
    lazy
    left
    offset-y
    class="hidden-xs-only"
  >
    <v-btn
      slot="activator"
      class="pr-1 pl-3"
      flat
    >
      <span
        class="mr-1 text-lowercase"
        v-text="`v${currentVersion}`"
      />
      <v-icon>mdi-menu-down</v-icon>
    </v-btn>
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
      ])
    }
  }
</script>
