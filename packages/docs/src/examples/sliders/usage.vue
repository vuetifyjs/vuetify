<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-slider
          v-model="volume"
          append-icon="volume_up"
          prepend-icon="volume_down"
          label="Volume"
        ></v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        volume: 10,
      }
    },
  }
</script>
