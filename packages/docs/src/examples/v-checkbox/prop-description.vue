<template>
  <v-container>
    <v-checkbox
      v-model="checkbox"
      description="Description"
      label="Label"
    ></v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const checkbox = ref(false)
</script>
