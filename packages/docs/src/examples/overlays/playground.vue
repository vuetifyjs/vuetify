<template>
  <div class="text-xs-center">
    <v-btn
      color="light-blue"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay :value="overlay">
      <v-btn
        icon
        @click="overlay = false"
      >
        Close Overlay
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      absolute: false,
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
    }),
  }
</script>
