<template>
  <v-switch
    v-model="model"
    :label="`Switch: ${model}`"
    false-value="no"
    true-value="yes"
    hide-details
  ></v-switch>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref('no')
</script>

<script>
  export default {
    data: () => ({
      model: 'no',
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14325-26855"
}
</example-meta>
