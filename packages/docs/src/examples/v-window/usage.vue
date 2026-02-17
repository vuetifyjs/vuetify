<template>
  <v-window
    v-model="window"
    show-arrows
  >
    <v-window-item
      v-for="n in length"
      :key="n"
    >
      <v-card class="d-flex justify-center align-center" height="200px">
        <span class="text-h2">Card {{ n }}</span>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script>
  export default {
    data: () => ({
      length: 3,
      window: 0,
    }),
  }
</script>
