<template>
  <v-card>
    <v-card-text>
      <h3>Show thumb-label when using slider</h3>
      <v-slider
        v-model="value"
        thumb-label
      ></v-slider>

      <h3>Always show thumb-label</h3>
      <v-slider
        v-model="value"
        thumb-label="always"
      ></v-slider>

      <h3>Thumb-label size</h3>
      <v-slider
        v-model="value"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 15
      }
    }
  }
</script>
