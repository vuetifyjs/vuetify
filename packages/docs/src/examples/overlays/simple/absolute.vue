<template>
  <v-layout column align-center justify-center>
    <v-card height="300" width="250">
      <v-layout justify-center wrap>
        <v-btn
          color="success"
          class="mt-12"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          :absolute="absolute"
          :value="overlay"
        >
          <v-btn
            color="success"
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
      overlay: false,
    }),
  }
</script>
