<template>
  <v-row
    align="center"
    class="ma-4"
    justify="center"
  >
    <v-card
      height="300"
      width="250"
    >
      <v-row justify="center">
        <v-btn
          color="success"
          class="mt-12"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          v-model="overlay"
          contained
          class="align-center justify-center"
        >
          <v-btn
            color="success"
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
      overlay: false,
    }),
  }
</script>
