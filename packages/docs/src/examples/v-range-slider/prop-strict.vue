<template>
  <v-card>
    <v-card-text>
      <v-range-slider
        v-model="value"
        strict
      ></v-range-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: [20, 40],
      }
    },
  }
</script>
