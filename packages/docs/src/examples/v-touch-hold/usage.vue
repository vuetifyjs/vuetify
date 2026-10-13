<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar :color="selected.length ? 'primary' : undefined" density="compact">
      <v-toolbar-title>
        {{ selected.length ? `${selected.length} selected` : 'Hold a file to select' }}
      </v-toolbar-title>
      <v-btn
        v-if="selected.length"
        icon="mdi-close"
        @click="selected = []"
      ></v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="file in files"
        :key="file"
        :active="selected.includes(file)"
        :prepend-icon="selected.includes(file) ? 'mdi-check-circle' : 'mdi-file-outline'"
        :title="file"
        color="primary"
        link
        v-touch-hold.mouse="() => toggle(file)"
        @click="selected.length ? toggle(file) : logSimpleClick(file)"
      ></v-list-item>
    </v-list>

    <div class="text-body-small text-medium-emphasis pa-3">{{ last }}</div>
  </v-card>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const files = ['Invoice.pdf', 'Photo.jpg', 'Notes.txt', 'Slides.pptx']
  const selected = ref([])
  const last = shallowRef('')

  function logSimpleClick (file) {
    last.value = `Opened ${file}`
  }

  function toggle (file) {
    selected.value = selected.value.includes(file)
      ? selected.value.filter(f => f !== file)
      : [...selected.value, file]
  }
</script>
