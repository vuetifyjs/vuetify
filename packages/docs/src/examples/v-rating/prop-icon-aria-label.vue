<template>
  <v-rating
    v-model="rating"
    icon-aria-label="custom icon label text"
  ></v-rating>
</template>

<script>
  export default {
    data: () => ({
      rating: 4,
    }),
  }
</script>
