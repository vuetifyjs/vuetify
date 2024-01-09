<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      color="orange-lighten-1"
      active-color="blue"
    ></v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(3)
</script>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>
