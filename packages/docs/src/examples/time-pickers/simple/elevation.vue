<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-time-picker
      v-model="picker"
      flat
    ></v-time-picker>

    <v-time-picker
      v-model="picker"
      elevation="15"
    ></v-time-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
