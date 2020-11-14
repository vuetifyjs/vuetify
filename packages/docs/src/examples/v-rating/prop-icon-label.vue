<template>
  <v-rating
    v-model="rating"
    icon-label="custom icon label text {0} of {1}"
  ></v-rating>
</template>

<script>
  export default {
    data: () => ({
      rating: 4,
    }),
  }
</script>
