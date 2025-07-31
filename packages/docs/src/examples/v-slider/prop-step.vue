<template>
  <v-slider
    v-model="value"
    :max="1"
    :min="0"
    :step="0.2"
    thumb-label
  ></v-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(0)
</script>

<script>
  export default {
    data () {
      return {
        value: 0,
      }
    },
  }
</script>
