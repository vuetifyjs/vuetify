<template>
  <v-layout justify-center>
    <v-time-picker v-model="picker"></v-time-picker>
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
