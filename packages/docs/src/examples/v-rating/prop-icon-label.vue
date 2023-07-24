<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      item-aria-label="custom icon label text {0} of {1}"
    ></v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(4)
</script>

<script>
  export default {
    data: () => ({ rating: 4 }),
  }
</script>
