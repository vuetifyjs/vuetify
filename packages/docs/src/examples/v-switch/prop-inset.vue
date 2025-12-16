<template>
  <v-switch
    v-model="model"
    :label="`Switch: ${model.toString()}`"
    hide-details
    inset
  ></v-switch>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref(true)
</script>

<script>
  export default {
    data () {
      return {
        model: true,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2723-45692&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>