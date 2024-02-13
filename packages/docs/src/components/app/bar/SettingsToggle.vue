<template>
  <AppBtn
    id="settings-toggle"
    :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
    color="medium-emphasis"
    @click="onClick"
  />
</template>

<script setup>
  const app = useAppStore()
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'settings-toggle', name)

    app.settings = !app.settings
  }
</script>
