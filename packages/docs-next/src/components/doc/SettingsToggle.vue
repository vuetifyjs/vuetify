<template>
  <v-btn
    :input-value="settings"
    icon
    @click="settings = !settings"
  >
    <v-icon>$mdiCog</v-icon>
  </v-btn>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'SettingsToggle',

    computed: { settings: sync('app/settings') },
  }
</script>
