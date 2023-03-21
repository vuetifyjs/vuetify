<template>
  <v-file-input
    v-model="files"
    placeholder="Upload your documents"
    label="File input"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="fileName in fileNames" :key="fileName">
        <v-chip
          size="small"
          label
          color="primary"
          class="me-2"
        >
          {{ fileName }}
        </v-chip>
      </template>
    </template>
  </v-file-input>
</template>

<script>
  export default {
    data: () => ({
      files: [],
    }),
  }
</script>
