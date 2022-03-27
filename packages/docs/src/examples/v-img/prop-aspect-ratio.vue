<template>
  <div class="d-flex flex-column justify-space-between align-center">
    <v-select
      v-model="aspectRatio"
      :items="aspectRatios"
    ></v-select>
    <v-slider
      v-model="width"
      class="align-self-stretch"
      min="200"
      max="500"
      step="1"
    ></v-slider>

    <v-img
      :aspect-ratio="aspectRatio"
      :width="width"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      cover
    ></v-img>
  </div>
</template>

<script>
  export default {
    data: () => ({
      width: 300,
      aspectRatio: 16 / 9,
      aspectRatios: [
        {
          title: '16/9',
          value: 16 / 9,
        },
        {
          title: '4/3',
          value: 4 / 3,
        },
        {
          title: '1/1',
          value: 1,
        },
      ],
    }),
  }
</script>
