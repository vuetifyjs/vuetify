<template>
  <div class="text-center">
    <v-btn
      append-icon="mdi-open-in-new"
      color="deep-purple-accent-4"
      @click="overlay = !overlay"
    >
      Launch Application
    </v-btn>

    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
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
