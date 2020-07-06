<template>
  <v-container>
    <v-row>
      <v-range-slider
        v-model="value"
        vertical
        label="Range"
      ></v-range-slider>
    </v-row>
  </v-container>
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
