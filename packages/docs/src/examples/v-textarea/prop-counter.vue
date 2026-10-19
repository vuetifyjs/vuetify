<template>
  <v-container fluid>
    <v-textarea
      :model-value="value"
      :rules="rules"
      label="Text"
      counter
    ></v-textarea>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const rules = [v => v.length <= 25 || 'Max 25 characters']

  const value = ref('Hello!')
</script>

<script>
  export default {
    data: () => ({
      rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: 'Hello!',
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14350-49355"
  }
</example-meta>
