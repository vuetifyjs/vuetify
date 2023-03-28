<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      item-aria-label="custom icon label text {0} of {1}"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 4 }),
  }
</script>
