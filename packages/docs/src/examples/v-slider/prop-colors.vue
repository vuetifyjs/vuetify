<template>
  <div>
    <v-slider
      v-model="slider1"
      color="orange"
      label="color"
    ></v-slider>

    <v-slider
      v-model="slider2"
      label="track-color"
      track-color="green"
    ></v-slider>

    <v-slider
      v-model="slider3"
      label="thumb-color"
      thumb-color="purple"
    ></v-slider>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const slider1 = ref(0)
  const slider2 = ref(50)
  const slider3 = ref(100)
</script>

<script>
  export default {
    data: () => ({
      slider1: 0,
      slider2: 50,
      slider3: 100,
    }),
  }
</script>
