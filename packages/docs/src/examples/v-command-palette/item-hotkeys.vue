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

      return {
        snackbar,
        snackbarText,
        showSnackbar,
        items,
      }
    },
  }
</script>
