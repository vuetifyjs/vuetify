<template>
  <v-layout row wrap justify-around align-center>
    <v-time-picker v-model="picker" disabled></v-time-picker>
    <v-time-picker v-model="picker" landscape disabled></v-time-picker>
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
