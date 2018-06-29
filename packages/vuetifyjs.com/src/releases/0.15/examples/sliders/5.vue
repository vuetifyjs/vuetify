<template>
  <v-card dark>
    <v-card-text>
      <v-slider v-model="value1" dark></v-slider>
      <v-slider v-model="value2" :step="5" snap thumb-label dark></v-slider>
      <v-slider value="50" dark disabled></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value1: 0,
        value2: 0
      }
    }
  }
</script>
