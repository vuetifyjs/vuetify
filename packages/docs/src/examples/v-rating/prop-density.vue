<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-rating
      class="ma-2"
      v-model="rating"
      density="default"
    ></v-rating>

    <v-rating
      class="ma-2"
      v-model="rating"
      density="comfortable"
    ></v-rating>

    <v-rating
      class="ma-2"
      v-model="rating"
      density="compact"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>
