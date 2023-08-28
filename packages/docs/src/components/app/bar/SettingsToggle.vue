<template>
  <app-btn
    v-if="!isAuthenticated"
    id="settings-toggle"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    color="medium-emphasis"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useRoute } from 'vue-router'

  // Stores
  import { useAppStore } from '@/store/app'

  // Utilities
  import { gtagClick } from '@/util/analytics'

  const app = useAppStore()
  const { isAuthenticated } = useAuth0()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
