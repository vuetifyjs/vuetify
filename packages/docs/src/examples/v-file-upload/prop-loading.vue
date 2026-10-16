<template>
  <v-container>

    <v-file-upload
      :disabled="disabled"
      :loading="loading"
    ></v-file-upload>

    <v-switch v-model="loading" label="Loading"></v-switch>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const loading = shallowRef(false)
</script>
