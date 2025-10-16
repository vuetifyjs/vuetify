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
        elevation="2"
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
