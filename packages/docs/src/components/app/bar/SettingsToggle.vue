<template>
  <app-btn
    id="settings-toggle"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    color="medium-emphasis"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useRoute } from 'vue-router'

  // Stores
  import { useAppStore } from '@/store/app'

  // Utilities
  import { gtagClick } from '@/util/analytics'

  const app = useAppStore()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
