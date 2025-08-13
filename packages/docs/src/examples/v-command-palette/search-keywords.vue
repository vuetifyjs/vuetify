<template>
  <div class="d-flex justify-center">
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="flex-grow-1"
      hotkeys-scope="focused"
      contained
    ></v-command-palette>
  </div>
</template>

<script setup>
  const items = [
    {
      id: 'toggle-theme',
      title: 'Toggle Theme',
      prependIcon: 'mdi-theme-light-dark',
      keywords: ['dark', 'light', 'mode', 'appearance'],
      handler: () => alert('Toggling theme...'),
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      prependIcon: 'mdi-cog',
      keywords: ['preferences', 'options'],
      handler: () => alert('Opening system settings...'),
    },
  ]
</script>
