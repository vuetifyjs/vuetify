<template>
  <v-file-input
    v-model="files"
    placeholder="Upload your documents"
    label="File input"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
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
