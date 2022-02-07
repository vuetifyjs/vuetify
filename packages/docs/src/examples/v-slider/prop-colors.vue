<template>
  <div>
    <v-slider
      v-model="slider1"
      color="orange"
      label="color"
    ></v-slider>

    <v-slider
      v-model="slider2"
      track-color="green"
      label="track-color"
    ></v-slider>

    <v-slider
      v-model="slider3"
      thumb-color="purple"
      label="thumb-color"
    ></v-slider>
  </div>
</template>

<script>
  export default {
    data: () => ({
      slider1: 0,
      slider2: 50,
      slider3: 100,
    }),
  }
</script>
