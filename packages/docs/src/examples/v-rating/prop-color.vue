<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      bg-color="orange-lighten-1"
      color="blue"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>
