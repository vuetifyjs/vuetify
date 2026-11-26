<template>
  <v-window
    v-model="onboarding"
    direction="vertical"
    show-arrows
  >
    <v-window-item
      v-for="n in length"
      :key="`card-${n}`"
    >
      <v-card
        class="d-flex align-center justify-center ma-2"
        elevation="1"
        height="200"
      >
        <h1 class="text-display-large my-0">
          Slide {{ n }}
        </h1>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup>
  import { ref } from 'vue'

  const length = ref(3)
  const onboarding = ref(0)
</script>

<script>
  export default {
    data: () => ({
      length: 3,
      onboarding: 0,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14441-37230"
  }
</example-meta>
