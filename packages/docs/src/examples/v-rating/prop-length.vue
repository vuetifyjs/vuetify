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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-105001"
  }
</example-meta>
