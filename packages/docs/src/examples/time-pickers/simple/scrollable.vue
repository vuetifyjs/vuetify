<template>
  <v-layout row wrap justify-around align-center>
    <v-time-picker v-model="picker" scrollable></v-time-picker>
  </v-layout>
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
