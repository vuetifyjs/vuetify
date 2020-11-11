<template>
  <v-card>
    <v-card-text>
      <v-slider
        v-model="value"
        step="10"
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 10,
      }
    },
  }
</script>
