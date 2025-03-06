<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-rating
      v-model="rating"
      :item-labels="['sad', '', '', '', 'happy']"
      class="ma-2"
      item-label-position="top"
    ></v-rating>

    <v-rating
      v-model="rating"
      :item-labels="['sad', '', '', '', 'happy']"
      class="ma-2"
      item-label-position="bottom"
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
