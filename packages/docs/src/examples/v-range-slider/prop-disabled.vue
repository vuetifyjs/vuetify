<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-range-slider
          v-model="value"
          disabled
          label="Disabled"
          value="30"
        ></v-range-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        value: [30, 60],
      }
    },
  }
</script>
