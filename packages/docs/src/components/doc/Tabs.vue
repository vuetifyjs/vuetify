<template>
  <v-tabs v-model="model" color="primary">
    <slot name="tabs" />
  </v-tabs>
  <v-window v-model="model">
    <slot name="content" />
  </v-window>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref()
</script>
