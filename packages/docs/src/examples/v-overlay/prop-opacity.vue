<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-card
      height="300"
      width="250"
    >
      <v-row justify="center">
        <v-btn
          color="orange lighten-2"
          class="mt-12"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
        >
          <v-btn
            color="orange lighten-2"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      absolute: true,
      opacity: 1,
      overlay: false,
    }),
  }
</script>
