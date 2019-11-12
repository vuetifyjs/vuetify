<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-slider
          v-model="volume"
          append-icon="volume_up"
          prepend-icon="volume_down"
          label="Volume"
        ></v-slider>
      </v-col>
    </v-row>
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
