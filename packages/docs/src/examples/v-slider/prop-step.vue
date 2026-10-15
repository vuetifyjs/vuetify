<template>
  <v-slider
    v-model="value"
    :max="1"
    :min="0"
    :step="0.2"
    thumb-label
  ></v-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(0)
</script>

<script>
  export default {
    data () {
      return {
        value: 0,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14319-9110"
  }
</example-meta>
