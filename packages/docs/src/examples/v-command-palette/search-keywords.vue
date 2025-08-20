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

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const snackbar = ref(false)
  const snackbarText = ref('')

  function showSnackbar (text) {
    snackbarText.value = text
    snackbar.value = true
  }

  const items = [
    {
      id: 'toggle-theme',
      title: 'Toggle Theme',
      prependIcon: 'mdi-theme-light-dark',
      keywords: ['dark', 'light', 'mode', 'appearance'],
      handler: () => showSnackbar('Toggling theme...'),
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      prependIcon: 'mdi-cog',
      keywords: ['preferences', 'options'],
      handler: () => showSnackbar('Opening system settings...'),
    },
  ]
</script>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      const snackbar = ref(false)
      const snackbarText = ref('')

      function showSnackbar (text) {
        snackbarText.value = text
        snackbar.value = true
      }

      const items = [
        {
          id: 'toggle-theme',
          title: 'Toggle Theme',
          prependIcon: 'mdi-theme-light-dark',
          keywords: ['dark', 'light', 'mode', 'appearance'],
          handler: () => showSnackbar('Toggling theme...'),
        },
        {
          id: 'system-settings',
          title: 'System Settings',
          prependIcon: 'mdi-cog',
          keywords: ['preferences', 'options'],
          handler: () => showSnackbar('Opening system settings...'),
        },
      ]

      return {
        snackbar,
        snackbarText,
        showSnackbar,
        items,
      }
    },
  }
</script>
