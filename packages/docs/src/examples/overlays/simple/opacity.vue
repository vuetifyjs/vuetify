<template>
  <v-layout column align-center justify-center>
    <v-card height="300" width="250">
      <v-layout justify-center wrap>
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
      </v-layout>
    </v-card>
  </v-layout>
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
