<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="month1"
      :show-current="false"
      type="month"
    ></v-date-picker>
    <v-date-picker
      v-model="month2"
      type="month"
      show-current="2013-07"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        month1: new Date().toISOString().substr(0, 7),
        month2: '2013-09',
      }
    },
  }
</script>
