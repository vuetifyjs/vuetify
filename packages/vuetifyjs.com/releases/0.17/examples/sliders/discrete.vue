<template>
  <v-card>
    <v-card-text>
      <v-slider v-model="value" thumb-label step="10" ticks></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 0
      }
    }
  }
</script>
