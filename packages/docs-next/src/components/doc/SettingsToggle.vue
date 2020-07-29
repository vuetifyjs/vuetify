<template>
  <app-tooltip-btn
    :input-value="settings"
    icon="$mdiCog"
    path="settings"
    @click="settings = !settings"
  />
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'SettingsToggle',

    computed: { settings: sync('app/settings') },
  }
</script>
