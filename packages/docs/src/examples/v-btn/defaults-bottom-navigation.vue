<template>
  <v-layout
    class="overflow-visible"
    style="height: 56px;"
  >
    <v-bottom-navigation
      v-model="value"
      active
    >
      <v-btn>Home</v-btn>

      <v-btn>Recents</v-btn>

      <v-btn>Favorites</v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(0)
</script>

<script>
  export default {
    data: () => ({ value: 0 }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13671-205100"
}
</example-meta>
