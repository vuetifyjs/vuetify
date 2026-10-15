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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-105102"
  }
</example-meta>
