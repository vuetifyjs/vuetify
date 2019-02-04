<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="hidden-xs-only">
      <v-date-picker v-model="picker2" color="green lighten-1" header-color="primary"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        picker2: new Date().toISOString().substr(0, 10)
      }
    }
  }
</script>
