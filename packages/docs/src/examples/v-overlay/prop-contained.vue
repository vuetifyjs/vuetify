<template>
  <v-row class="ma-4 align-center justify-center">
    <v-card
      height="300"
      width="250"
    >
      <v-row class="justify-center">
        <v-btn
          class="mt-12"
          color="success"
          @click="overlay = !overlay"
        >
          Show Overlay
        </v-btn>

        <v-overlay
          v-model="overlay"
          class="align-center justify-center"
          contained
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

<script setup>
  import { ref } from 'vue'

  const overlay = ref(false)
</script>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),
  }
</script>
