<template>
  <v-card>
    <v-card-text>
      <v-slider v-model="value1" thumb-label step="10"></v-slider>
      <v-slider v-model="value2" thumb-label step="10" snap></v-slider>
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
