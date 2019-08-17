<template>
  <v-row>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker v-model="date1" :show-current="false"></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker v-model="date2" show-current="2013-07-13"></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        date1: new Date().toISOString().substr(0, 10),
        date2: '2013-07-29',
      }
    },
  }
</script>
