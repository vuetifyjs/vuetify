<template>
  <v-toolbar
    class="v-bar--underline"
    flat
  >
    <headline path="settings" />

    <v-spacer />

    <v-btn
      icon
      @click="settings = !settings"
    >
      <v-icon>$close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettingsDrawerPrepend',

    computed: { settings: sync('app/settings') },
  }
</script>
