<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Palette with Keywords
    </v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      title="Search for 'dark' or 'light'"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

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
    }
  ]
</script>

