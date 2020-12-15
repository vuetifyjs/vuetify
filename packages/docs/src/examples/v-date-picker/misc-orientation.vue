<template>
  <v-row align="center">
    <v-checkbox
      v-model="landscape"
      label="Landscape"
    ></v-checkbox>
    <v-date-picker
      v-model="picker"
      :landscape="landscape"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
        landscape: false,
      }
    },
  }
</script>
