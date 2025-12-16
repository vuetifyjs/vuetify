<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      color="primary"
      horizontal
    >
      <v-btn>
        <v-icon>mdi-history</v-icon>

        Recents
      </v-btn>

      <v-btn>
        <v-icon>mdi-heart</v-icon>

        Favorites
      </v-btn>

      <v-btn>
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(1)
</script>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1655-146658&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>