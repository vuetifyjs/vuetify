<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      readonly
    ></v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(3)
</script>

<script>
  export default {
    data: () => ({
      rating: 3,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-104597"
  }
</example-meta>
