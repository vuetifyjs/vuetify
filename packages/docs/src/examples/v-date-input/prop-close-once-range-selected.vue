<template>
  <div class="d-flex justify-center">
    <v-date-input
      v-model="model"
      label="Select range"
      max-width="368"
      multiple="range"
      close-once-range-selected
    ></v-date-input>
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
