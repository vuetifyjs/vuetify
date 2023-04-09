<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-rating
      v-model="rating"
      class="ma-2"
      density="default"
    ></v-rating>

    <v-rating
      v-model="rating"
      class="ma-2"
      density="comfortable"
    ></v-rating>

    <v-rating
      v-model="rating"
      class="ma-2"
      density="compact"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>
