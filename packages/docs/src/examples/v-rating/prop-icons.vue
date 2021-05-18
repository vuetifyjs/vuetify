<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      empty-icon="circle-outline"
      full-icon="circle"
      half-icon="circle-half"
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
