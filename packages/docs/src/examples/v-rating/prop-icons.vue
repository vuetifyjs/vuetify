<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      empty-icon="i-mdi:circle-outline"
      full-icon="i-mdi:circle"
      half-icon="i-mdi:circle-half"
      half-increments
      hover
    ></v-rating>
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
