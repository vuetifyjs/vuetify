
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
