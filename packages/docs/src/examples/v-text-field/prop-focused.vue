<template>
  <v-container>
    <v-text-field v-model="msg" :focused="true" @update:focused=""></v-text-field>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const msg = ref('Hello World!')
</script>
<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14350-24905"
}
</example-meta>
