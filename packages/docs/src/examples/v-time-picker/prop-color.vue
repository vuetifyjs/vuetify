<template>
  <v-row justify="space-around">
    <v-time-picker
      v-model="e4"
      color="green lighten-1"
    ></v-time-picker>
    <v-time-picker
      v-model="e4"
      color="green lighten-1"
      header-color="primary"
    ></v-time-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        e4: null,
      }
    },
  }
</script>
