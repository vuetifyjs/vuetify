<template>
  <v-layout row wrap justify-space-around>
    <v-time-picker v-model="picker" ampm-in-title></v-time-picker>
    <v-time-picker v-model="picker" landscape ampm-in-title></v-time-picker>
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
