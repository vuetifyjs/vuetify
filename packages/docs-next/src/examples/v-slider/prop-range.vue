<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Default range slider</v-subheader>
    <v-card-text>
      <v-range-slider
        v-model="value1"
      ></v-range-slider>
    </v-card-text>

    <v-subheader>Disabled range slider</v-subheader>
    <v-card-text>
      <v-range-slider
        v-model="value2"
        disabled
      ></v-range-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value1: [30, 60],
        value2: [30, 60],
      }
    },
  }
</script>
