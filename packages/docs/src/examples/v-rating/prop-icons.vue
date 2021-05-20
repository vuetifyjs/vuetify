<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      empty-icon="mdi-circle-outline"
      full-icon="mdi-circle"
      half-icon="mdi-circle-half"
      half-increments
    />
  </div>
</template>

<script>
  export default {
    data: () => ({
      rating: 3.5,
    }),
  }
</script>
