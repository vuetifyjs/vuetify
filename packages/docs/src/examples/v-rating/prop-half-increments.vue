<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      hover
      half-increments
    ></v-rating>
    <pre>{{ rating }}</pre>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rating: 3.5,
    }),
  }
</script>
