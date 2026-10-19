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

<script setup>
  import { ref } from 'vue'

  const rating = ref(3)
</script>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-104395"
  }
</example-meta>
