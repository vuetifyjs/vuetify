<template>
  <v-layout justify-center>
    <v-date-picker v-model="picker"></v-date-picker>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>
