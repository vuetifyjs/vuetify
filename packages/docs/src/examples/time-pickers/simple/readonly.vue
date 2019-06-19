<template>
  <v-layout row wrap justify-space-around align-center>
    <v-time-picker v-model="picker" readonly></v-time-picker>
    <v-time-picker v-model="picker" landscape readonly></v-time-picker>
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
