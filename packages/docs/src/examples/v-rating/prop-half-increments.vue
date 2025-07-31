<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      half-increments
      hover
    ></v-rating>
    <pre>{{ rating }}</pre>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(3.5)
</script>

<script>
  export default {
    data: () => ({
      rating: 3.5,
    }),
  }
</script>
