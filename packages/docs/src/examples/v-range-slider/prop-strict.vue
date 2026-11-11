<template>
  <v-card>
    <v-card-text>
      <v-range-slider
        v-model="value"
        strict
      ></v-range-slider>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([20, 40])
</script>

<script>
  export default {
    data () {
      return {
        value: [20, 40],
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2074-1154"
  }
</example-meta>
