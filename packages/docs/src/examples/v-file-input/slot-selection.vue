<template>
  <v-file-input
    v-model="files"
    label="File input"
    placeholder="Upload your documents"
    prepend-icon="mdi-paperclip"
    multiple
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="fileName in fileNames" :key="fileName">
        <v-chip
          class="me-2"
          color="primary"
          size="small"
          label
        >
          {{ fileName }}
        </v-chip>
      </template>
    </template>
  </v-file-input>
</template>

<script setup>
  import { ref } from 'vue'

  const files = ref([])
</script>

<script>
  export default {
    data: () => ({
      files: [],
    }),
  }
</script>
