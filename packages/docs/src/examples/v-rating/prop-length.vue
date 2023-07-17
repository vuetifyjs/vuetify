<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      length="10"
    ></v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(2)
</script>

<script>
  export default {
    data: () => ({
      rating: 2,
    }),
  }
</script>
