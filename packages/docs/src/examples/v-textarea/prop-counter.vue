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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2115-38836&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
