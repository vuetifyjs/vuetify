<template>
  <v-layout justify-space-between wrap>
    <v-flex xs12 sm6 class="my-3">
      <div class="subheading">Defined by array</div>
      <v-date-picker
        v-model="date1"
        :events="arrayEvents"
        event-color="green lighten-1"
        type="month"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <div class="subheading">Defined by function</div>
      <v-date-picker
        v-model="date2"
        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
        :events="functionEvents"
        type="month"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      arrayEvents: null,
      date1: new Date().toISOString().substr(0, 7),
      date2: new Date().toISOString().substr(0, 7)
    }),

    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 12)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 7)
      })
    },

    methods: {
      functionEvents (date) {
        const [, month] = date.split('-')
        return parseInt(month, 10) % 4 === 1
      }
    }
  }
</script>
