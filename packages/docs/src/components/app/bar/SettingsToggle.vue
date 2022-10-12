<template>
  <app-tooltip-btn
    :input-value="app.settings"
    color="medium-emphasis"
    icon="mdi-cog-outline"
    path="settings"
    @click="app.settings = !app.settings"
  />
</template>

<script setup>
  // Composables
  import { useAppStore } from '@/store/app'

  const app = useAppStore()
</script>
