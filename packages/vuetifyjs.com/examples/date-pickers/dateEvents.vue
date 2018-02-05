<template>
  <v-layout justify-space-between wrap>
    <v-flex xs12 sm6 class="my-3">
      <div class="subheading">Defined by array</div>
      <v-date-picker
        v-model="date1"
        event-color="green lighten-1"
        :events="arrayEvents"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <div class="subheading">Defined by function</div>
      <v-date-picker
        v-model="date2"
        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
        :events="functionEvents"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      arrayEvents: null,
      date1: null,
      date2: null
    }),

    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },

    methods: {
      functionEvents (date) {
        const [,, day] = date.split('-')
        return parseInt(day, 10) % 3 === 0
      }
    }
}
</script>
