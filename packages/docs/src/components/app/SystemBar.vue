<template>
  <v-system-bar
    v-if="show"
    color="error"
    window
  >
    <v-icon icon="$warning" class="me-2" />

    This is the Vuetify 3 documentation, examples and information may be broken or outdated.

    <v-spacer />

    <div class="bg-white px-2 rounded d-none d-md-block">
      <app-link href="https://vuetifyjs.com/">Vuetify 2 documentation</app-link>
    </div>

    <v-btn
      icon="$cancel"
      size="small"
      density="compact"
      class="ms-4"
      variant="plain"
      @click="show = !show"
    />
  </v-system-bar>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'

  const show = ref(true)
</script>
