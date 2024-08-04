<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      color="primary"
      horizontal
    >
      <v-btn>
        <v-icon icon="i-mdi:history"></v-icon>

        Recents
      </v-btn>

      <v-btn>
        <v-icon icon="i-mdi:heart"></v-icon>

        Favorites
      </v-btn>

      <v-btn>
        <v-icon icon="i-mdi:map-marker"></v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(1)
</script>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>
