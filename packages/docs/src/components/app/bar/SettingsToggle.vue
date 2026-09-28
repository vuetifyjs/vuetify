<template>
  <v-progress-circular
    v-if="pwa.availableOffline && pwa.isUpdating"
    :model-value="pwa.progress / pwa.progressTotal * 100"
    color="primary"
    size="42"
    width="1"
  >
    <AppBtn
      id="settings-toggle"
      :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
      color="medium-emphasis"
      @click="onClick"
    />
  </v-progress-circular>
  <AppBtn
    v-else
    id="settings-toggle"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    class="me-n2"
    color="medium-emphasis"
    v-tooltip:bottom="t('settings.header')"
    @click="onClick"
  />
</template>

<script setup>
  const app = useAppStore()
  const pwa = usePwaStore()
  const { name } = useRoute()
  const { t } = useI18n()

  function onClick () {
    sweClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
