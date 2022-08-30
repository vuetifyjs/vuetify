<template>
  <div class="text-center">
    <v-btn
      color="deep-purple-accent-4"
      class="text-white"
      @click="overlay = !overlay"
    >
      Launch Application
      <v-icon end>
        mdi-open-in-new
      </v-icon>
    </v-btn>

    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
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
        }, 3000)
      },
    },
  }
</script>
