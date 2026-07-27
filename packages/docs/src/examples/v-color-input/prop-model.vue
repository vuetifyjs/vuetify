<template>
  <div class="d-flex justify-center">
    <v-color-input
      v-model="model"
      label="Select a color"
      max-width="368"
    ></v-color-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(null)
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
