<template>
  <div class="d-flex flex-column align-center ga-4">
    <v-rating v-model="rating">
      <template v-slot:item="props">
        <v-icon
          :color="props.isFilled ? colors[props.index] : 'grey-lighten-1'"
          size="large"
        >
          {{ props.isFilled ? 'mdi-star-circle' : 'mdi-star-circle-outline' }}
        </v-icon>
      </template>
    </v-rating>

    <v-rating v-model="score" length="10">
      <template v-slot:item="{ index, isFilled }">
        <v-icon
          :color="isFilled ? 'purple-darken-4' : 'grey-lighten-1'"
          :icon="`mdi-numeric-${index + 1}-box`"
          size="large"
        ></v-icon>
      </template>
    </v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const colors = ['green', 'purple', 'orange', 'indigo', 'red']

  const rating = ref(4.5)
  const score = ref(7)
</script>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'orange', 'indigo', 'red'],
      rating: 4.5,
      score: 7,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-105405"
  }
</example-meta>
