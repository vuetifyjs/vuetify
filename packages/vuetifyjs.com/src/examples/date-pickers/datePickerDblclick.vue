<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="my-2 px-1">
      <v-date-picker
        v-model="date"
        full-width
        readonly
        @dblclick:date="dblclick"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-2 px-1">
      <v-subheader>Double click on any date in the picker</v-subheader>
      <ul class="ma-3">
        <li v-for="(clickedDate, index) in dates" :key="index">Clicked date: {{ clickedDate }}</li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      dates: []
    }),
    methods: {
      dblclick (date) {
        this.dates.push(date)
      }
    }
  }
</script>
