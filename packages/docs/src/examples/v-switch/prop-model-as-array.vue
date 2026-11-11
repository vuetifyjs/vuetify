<template>
  <v-container fluid>
    <p>{{ people }}</p>
    <v-switch
      v-model="people"
      color="primary"
      label="John"
      value="John"
      hide-details
    ></v-switch>
    <v-switch
      v-model="people"
      color="primary"
      label="Jacob"
      value="Jacob"
      hide-details
    ></v-switch>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const people = ref(['John'])
</script>

<script>
  export default {
    data () {
      return {
        people: ['John'],
      }
    },
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2092-12914"
}
</example-meta>
