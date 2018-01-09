<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        :color="events === everyOtherDay ? 'primary' : ''"
        :class="{ 'white--text': events === everyOtherDay }"
        @click="events = everyOtherDay"
      >Function</v-btn>
      <v-btn
        :color="events === randomDays ? 'primary' : ''"
        :class="{ 'white--text': events === randomDays }"
        @click="events = randomDays"
      >Array</v-btn>
      <v-btn
        :color="events === lastFiveDays ? 'primary' : ''"
        :class="{ 'white--text': events === lastFiveDays }"
        @click="events = lastFiveDays"
      >Object</v-btn>
      <v-date-picker
        class="mt-3"
        v-model="date"
        event-color="green lighten-1"
        :events="events"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        date: null,
        events: null,
        everyOtherDay: function (date) {
          const [,,day] = date.split('-')
          return parseInt(day, 10) % 9 == 3
        },
        randomDays: [],
        lastFiveDays: {
          min: null,
          max: null
        }
      }
    },
    mounted () {
      const date = new Date()
      this.randomDays = [...Array(10)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })

      const d = new Date()
      d.setDate(date.getDate() - 5)
      this.lastFiveDays.min = d.toISOString().substr(0, 10)
      this.lastFiveDays.max = date.toISOString().substr(0, 10)

      this.events = this.everyOtherDay
    }
  }
</script>
