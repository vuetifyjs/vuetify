<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker color="green lighten-1" v-model="picker"></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="hidden-xs-only">
      <v-date-picker color="green lighten-1" header-color="primary" v-model="picker2"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        picker2: null
      }
    }
  }
</script>
