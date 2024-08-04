<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <v-btn-toggle
      v-model="toggle"
      divided
    >
      <v-btn icon="i-mdi:format-align-left"></v-btn>
      <v-btn icon="i-mdi:format-align-center"></v-btn>
      <v-btn icon="i-mdi:format-align-right"></v-btn>
      <v-btn icon="i-mdi:format-align-justify"></v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const toggle = ref(null)
</script>

<script>
  export default {
    data: () => ({
      toggle: null,
    }),
  }
</script>
