<template>
  <v-container fluid>
    <v-checkbox
      v-model="checkbox1"
      :label="`Checkbox 1: ${checkbox1.toString()}`"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox2"
      :label="`Checkbox 2: ${checkbox2.toString()}`"
    ></v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const checkbox1 = ref(true)
  const checkbox2 = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false,
      }
    },
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2045-82645"
}
</example-meta>
