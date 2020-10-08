
<template>
  <v-container>
    <v-row>
      <v-slider
        v-model="value"
        vertical
        label="Regular"
      ></v-slider>
    </v-row>
  </v-container>
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
