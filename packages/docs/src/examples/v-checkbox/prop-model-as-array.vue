<template>
  <v-container fluid>
    <p>{{ selected }}</p>
    <v-checkbox
      v-model="selected"
      label="John"
      value="John"
    ></v-checkbox>
    <v-checkbox
      v-model="selected"
      label="Jacob"
      value="Jacob"
    ></v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref(['John'])
</script>

<script>
  export default {
    data () {
      return {
        selected: ['John'],
      }
    },
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2045-82353"
}
</example-meta>
