<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker v-model="month1" :show-current="false" type="month"></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker v-model="month2" type="month" show-current="2013-07"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        month1: new Date().toISOString().substr(0, 7),
        month2: '2013-09'
      }
    }
  }
</script>
