<template>
  <v-card>
    <v-card-text>
      <v-slider
        v-model="value"
        step="10"
        thumb-label
        ticks
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 0,
      }
    },
  }
</script>
