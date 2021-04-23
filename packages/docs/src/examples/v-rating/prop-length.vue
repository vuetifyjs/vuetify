<template>
  <div class="text-center">
    <v-slider
      v-model="length"
      color="red-darken-4"
      label="Custom length"
      max="15"
      min="1"
    ></v-slider>

    <v-rating
      v-model="rating"
      :length="length"
      background-color="grey-lighten-1"
      color="red-lighten-3"
    ></v-rating>

    <div>
      <span class="text-caption text-uppercase">model:</span>
      <span class="font-weight-bold">
        {{ rating }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      length: 5,
      rating: 2,
    }),
  }
</script>
