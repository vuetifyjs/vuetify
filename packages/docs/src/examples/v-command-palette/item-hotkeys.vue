<template>
  <div class="text-center">
    <v-command-palette
      :items="items"
      :model-value="true"
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
      id: 'save',
      title: 'Save',
      prependIcon: 'mdi-content-save',
      hotkey: 'ctrl+s',
      handler: () => showSnackbar('File Saved'),
    },
    {
      id: 'save-as',
      title: 'Save As...',
      prependIcon: 'mdi-content-save-edit',
      hotkey: 'ctrl+shift+s',
      handler: () => showSnackbar('Save As dialog opened'),
    },
    {
      id: 'find',
      title: 'Find',
      prependIcon: 'mdi-magnify',
      hotkey: 'ctrl+f',
      handler: () => showSnackbar('Find widget opened'),
    },
  ]
</script>
