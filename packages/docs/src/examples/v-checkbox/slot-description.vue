<template>
  <v-container>
    <v-checkbox v-model="checkbox" label="Checkbox with description">
      <template v-slot:description>
        You can use <span class="highlight">HTML</span> inside the description slot.
      </template>
    </v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const checkbox = ref(false)
</script>

<style scoped>
  .highlight {
    font-weight: bold;
    color: #1976d2;
  }
</style>
