<template>
  <app-btn
    id="settings-toggle"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    color="medium-emphasis"
    @click="onClick"
  >
    <app-settings-dialog v-if="user.dev" activator="parent" />
  </app-btn>
</template>

<script setup>
  import AppSettingsDialog from '@/components/app/settings/Dialog.vue'

  // Composables
  import { useRoute } from 'vue-router'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { gtagClick } from '@/util/analytics'

  const app = useAppStore()
  const user = useUserStore()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    if (!user.dev) {
      app.settings = !app.settings
    }
  }
</script>
