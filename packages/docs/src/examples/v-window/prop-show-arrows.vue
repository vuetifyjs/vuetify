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
        elevation="2"
        height="200"
        class="d-flex align-center justify-center ma-2"
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

<script>
  export default {
    data: () => ({
      length: 3,
      onboarding: 0,
    }),
  }
</script>
