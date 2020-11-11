<template>
  <div class="text-center">
    <v-btn
      color="error"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay :value="overlay"></v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 2000)
      },
    },
  }
</script>
