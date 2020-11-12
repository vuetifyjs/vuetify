<template>
  <v-rating
    v-model="rating"
    icon-label="custom icon label text"
  ></v-rating>
</template>

<script>
  export default {
    data: () => ({
      rating: 4,
    }),
  }
</script>
