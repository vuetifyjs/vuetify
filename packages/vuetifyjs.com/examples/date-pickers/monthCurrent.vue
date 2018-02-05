<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker type="month" v-model="month1" :show-current="false"></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker type="month" v-model="month2" show-current="2013-07"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        month1: null,
        month2: '2013-09'
      }
    }
  }
</script>
