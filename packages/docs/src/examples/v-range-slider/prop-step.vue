<template>
  <v-range-slider
    v-model="value"
    step="10"
    thumb-label="always"
  ></v-range-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([20, 40])
</script>

<script>
  export default {
    data () {
      return {
        value: [20, 40],
      }
    },
  }
</script>
