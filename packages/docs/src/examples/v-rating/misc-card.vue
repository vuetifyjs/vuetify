<template>
  <v-card
    class="mx-auto"
    color="purple"
    elevation="10"
    width="360"
  >
    <div class="d-flex justify-between">
      <v-card-title class="flex-grow-1 flex-column align-start">
        <div class="text-h5">
          Halycon Days
        </div>
        <div class="text-h6 font-weight-thin">Ellie Goulding</div>

        <div class="text-h6 font-weight-thin">(2013)</div>
      </v-card-title>

      <v-img
        class="flex-grow-0"
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
        contain
      ></v-img>
    </div>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      Rate this album

      <v-spacer></v-spacer>

      <span class="text-grey-lighten-2 text-caption me-2">
        ({{ rating }})
      </span>

      <v-rating
        v-model="rating"
        active-color="yellow-accent-4"
        color="white"
        size="18"
        half-increments
        hover
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(4.5)
</script>

<script>
  export default {
    data: () => ({ rating: 4.5 }),
  }
</script>
