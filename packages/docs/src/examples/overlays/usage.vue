<template>
  <div class="text-xs-center">
    <v-btn
      color="error"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay :value="overlay">
      <v-btn
        icon
        @click="overlay = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      overlay: false
    })
  }
</script>
