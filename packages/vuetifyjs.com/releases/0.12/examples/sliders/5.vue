<template>
  <v-card class="secondary">
    <v-card-text>
      <v-slider v-model="value" light></v-slider>
      <v-slider value="50" light disabled></v-slider>
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
