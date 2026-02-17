<template>
  <v-container fluid>
    <v-textarea
      :model-value="value"
      label="Text"
      rows="1"
      no-resize
    ></v-textarea>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
</script>

<script>
  export default {
    data: () => ({
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
  }
</script>
