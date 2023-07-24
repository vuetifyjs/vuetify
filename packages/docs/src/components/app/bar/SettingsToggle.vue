<template>
  <app-tooltip-btn
    :input-value="app.settings"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    color="medium-emphasis"
    path="settings"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useAppStore } from '@/store/app'
  import { useRoute } from 'vue-router'

  // Utilities
  import { gtagClick } from '@/util/analytics'

  const app = useAppStore()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
