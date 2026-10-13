<template>
  <v-slider
    v-model="value"
    label="Temperature"
    max="30"
    min="10"
    step="0.5"
    thumb-label="always"
    value-format="[value] °C"
  ></v-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(21.5)
</script>

<script>
  export default {
    data () {
      return {
        value: 21.5,
      }
    },
  }
</script>
