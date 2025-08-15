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
      id: 'documents',
      type: 'parent',
      title: 'Documents',
      prependIcon: 'mdi-folder',
      children: [
        { id: 'work', title: 'Work', prependIcon: 'mdi-briefcase', handler: () => showSnackbar('Opening Work folder') },
        { id: 'personal', title: 'Personal', prependIcon: 'mdi-account', handler: () => showSnackbar('Opening Personal folder') },
      ],
    },
    {
      id: 'pictures',
      type: 'parent',
      title: 'Pictures',
      prependIcon: 'mdi-image',
      children: [
        { id: 'vacation', title: 'Vacation 2024', prependIcon: 'mdi-beach', handler: () => showSnackbar('Viewing vacation photos') },
        { id: 'family', title: 'Family', prependIcon: 'mdi-human-male-female-child', handler: () => showSnackbar('Viewing family photos') },
      ],
    },
    {
      id: 'readme',
      title: 'README.md',
      prependIcon: 'mdi-file-document',
      handler: () => showSnackbar('Opening README.md'),
    },
  ]
</script>
