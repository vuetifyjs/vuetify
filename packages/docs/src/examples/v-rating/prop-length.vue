<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      length="10"
    ></v-rating>
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
