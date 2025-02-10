<template>
  <div class="text-center pa-2 mb-2">
    <v-btn-toggle v-model="density" density="comfortable" border divided rounded>
      <v-btn value="default">Default</v-btn>

      <v-btn value="comfortable">Comfortable</v-btn>

      <v-btn value="compact">Compact</v-btn>
    </v-btn-toggle>
  </div>

  <v-file-upload :density="density"></v-file-upload>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const density = shallowRef('default')
</script>
