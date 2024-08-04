<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <div class="text-subtitle-2">Default</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
    >
      <v-btn icon="i-mdi:format-align-left"></v-btn>
      <v-btn icon="i-mdi:format-align-center"></v-btn>
      <v-btn icon="i-mdi:format-align-right"></v-btn>
      <v-btn icon="i-mdi:format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Text</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="text"
    >
      <v-btn icon="i-mdi:format-align-left"></v-btn>
      <v-btn icon="i-mdi:format-align-center"></v-btn>
      <v-btn icon="i-mdi:format-align-right"></v-btn>
      <v-btn icon="i-mdi:format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Plain</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="plain"
    >
      <v-btn icon="i-mdi:format-align-left"></v-btn>
      <v-btn icon="i-mdi:format-align-center"></v-btn>
      <v-btn icon="i-mdi:format-align-right"></v-btn>
      <v-btn icon="i-mdi:format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Outlined</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="outlined"
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
