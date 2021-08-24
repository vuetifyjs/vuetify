<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      half-increments
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rating: 3.5,
    }),
  }
</script>
