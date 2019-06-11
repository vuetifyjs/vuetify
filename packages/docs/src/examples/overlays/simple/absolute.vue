<template>
  <v-layout column align-center justify-center>
    <v-card height="300" width="250">
      <v-layout justify-center wrap>
        <v-btn
          color="green"
          class="mt-5"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          absolute
          opacity="1"
          :value="overlay"
        >
          <v-btn
            color="green"
            @click="overlay = false"
          >
            Close Overlay
          </v-btn>
        </v-overlay>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),
  }
</script>
