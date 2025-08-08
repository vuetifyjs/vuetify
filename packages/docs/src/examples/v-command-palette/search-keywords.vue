<template>
  <div class="text-center">
    <v-command-palette
      :items="items"
      :model-value="true"
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
