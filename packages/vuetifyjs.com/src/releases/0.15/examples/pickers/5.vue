<template>
  <v-layout row wrap>
    <v-flex md12 lg4>
      <v-time-picker v-model="e5" dark></v-time-picker>
    </v-flex>
    <v-flex md12 lg8 class="hidden-xs-only">
      <v-time-picker v-model="e5" landscape dark></v-time-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        e5: null,
      }
    }
  }
</script>
