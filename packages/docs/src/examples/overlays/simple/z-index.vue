<template>
  <v-layout justify-center wrap>
    <v-btn
      class="white--text"
      color="teal"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay
      :z-index="zIndex"
      :value="overlay"
    >
      <v-btn
        class="white--text"
        color="teal"
        @click="overlay = false"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
      zIndex: 0,
    }),
  }
</script>
