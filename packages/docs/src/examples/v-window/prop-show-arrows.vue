<template>
  <v-window
    v-model="onboarding"
    show-arrows="hover"
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
        <h1
          class="text-h2"
        >
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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2801-155682&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
