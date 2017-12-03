<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md12 lg4 lg-offset8>
        <v-time-picker v-model="e7" format="24hr"></v-time-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e7: null,
      }
    }
  }
</script>
