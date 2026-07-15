<template>
  <div class="d-flex justify-space-around">
    <v-color-picker
      v-model="c1"
      hide-canvas
      hide-sliders
    ></v-color-picker>

    <v-color-picker
      v-model="c2"
      hide-inputs
      show-swatches
    ></v-color-picker>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const c1 = ref('#ff00ff')
  const c2 = ref('#00ff00')
</script>

<script>

  export default {
    data: () => ({
      c1: '#ff00ff',
      c2: '#00ff00',
    }),
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2496-13259&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
