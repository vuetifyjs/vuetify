<template>
  <v-layout justify-center>
    <v-date-picker v-model="date" readonly></v-date-picker>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>
