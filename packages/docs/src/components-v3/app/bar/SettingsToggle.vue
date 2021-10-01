<template>
  <app-tooltip-btn
    :input-value="app.settings"
    icon="mdi-cog-outline"
    path="settings"
    @click="app.settings = !app.settings"
  />
</template>

<script>
  import { useAppStore } from '@/store-v3/app'

  export default {
    name: 'SettingsToggle',

    setup () {
      const app = useAppStore()

      return { app }
    },
  }
</script>
