<template>
  <v-progress-circular
    v-if="pwa.availableOffline && pwa.isUpdating"
    :model-value="pwa.progress / pwa.progressTotal * 100"
    class="me-n2"
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
    data-umami-event="app-bar"
    data-umami-event-type="settings-toggle"
    @click="onClick"
  />
</template>

<script setup>
  const app = useAppStore()
  const pwa = usePwaStore()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
