<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar :color="selected.length ? 'primary' : undefined" density="compact">
      <v-toolbar-title>
        {{ selected.length ? `${selected.length} selected` : 'Touch and hold a file' }}
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
        v-touch-hold="() => toggle(file)"
        @click="selected.length && toggle(file)"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const files = ['Invoice.pdf', 'Photo.jpg', 'Notes.txt', 'Slides.pptx']
  const selected = ref([])

  function toggle (file) {
    selected.value = selected.value.includes(file)
      ? selected.value.filter(f => f !== file)
      : [...selected.value, file]
  }
</script>
