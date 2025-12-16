<template>
  <v-range-slider
    v-model="value"
    direction="vertical"
  ></v-range-slider>
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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2074-1156&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>