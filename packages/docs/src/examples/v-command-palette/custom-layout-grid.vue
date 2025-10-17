<template>
  <div class="d-flex justify-center">
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="flex-grow-1"
      hotkeys-scope="focused"
      contained
    >
      <template v-slot:default="{ items: filteredItems, rootProps, getItemProps }">
        <div
          v-bind="rootProps"
          class="pa-4"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;"
        >
          <div
            v-for="(item, index) in filteredItems"
            :key="item.raw.id"
            v-bind="getItemProps(item, index)"
            :class="{ 'bg-primary': getItemProps(item, index)['aria-selected'] }"
            class="d-flex flex-column align-center justify-center pa-2 rounded-lg"
            style="cursor: pointer;"
          >
            <v-icon :icon="item.raw.prependIcon" size="x-large"></v-icon>
            <div class="mt-2 text-body-2">{{ item.title }}</div>
          </div>
        </div>
      </template>
    </v-command-palette>

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
    { id: 'new-doc', title: 'New Doc', prependIcon: 'mdi-file-document-plus-outline', handler: () => showSnackbar('Creating new document') },
    { id: 'new-sheet', title: 'New Sheet', prependIcon: 'mdi-file-excel-box-outline', handler: () => showSnackbar('Creating new spreadsheet') },
    { id: 'new-slide', title: 'New Slide', prependIcon: 'mdi-file-powerpoint-box-outline', handler: () => showSnackbar('Creating new presentation') },
    { id: 'upload', title: 'Upload', prependIcon: 'mdi-upload-outline', handler: () => showSnackbar('Opening file upload') },
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
        { id: 'new-doc', title: 'New Doc', prependIcon: 'mdi-file-document-plus-outline', handler: () => showSnackbar('Creating new document') },
        { id: 'new-sheet', title: 'New Sheet', prependIcon: 'mdi-file-excel-box-outline', handler: () => showSnackbar('Creating new spreadsheet') },
        { id: 'new-slide', title: 'New Slide', prependIcon: 'mdi-file-powerpoint-box-outline', handler: () => showSnackbar('Creating new presentation') },
        { id: 'upload', title: 'Upload', prependIcon: 'mdi-upload-outline', handler: () => showSnackbar('Opening file upload') },
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
