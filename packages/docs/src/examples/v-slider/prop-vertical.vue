<template>
  <v-slider
    v-model="value"
    direction="vertical"
    label="Regular"
  ></v-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(10)
</script>

<script>
  export default {
    data () {
      return {
        value: 10,
      }
    },
  }
</script>

<style scoped>
  .v-slider :deep(> .v-input__control) {
    /* overrides $slider-vertical-min-height: 300px */
    min-height: 150px;
  }
</style>
