<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        :color="allowedDates === everyOtherDay ? 'primary' : ''"
        :class="{ 'white--text': allowedDates === everyOtherDay }"
        @click="allowedDates = everyOtherDay"
      >Function</v-btn>
      <v-btn
        :color="allowedDates === randomDays ? 'primary' : ''"
        :class="{ 'white--text': allowedDates === randomDays }"
        @click="allowedDates = randomDays"
      >Array</v-btn>
      <v-btn
        :color="allowedDates === lastFiveDays ? 'primary' : ''"
        :class="{ 'white--text': allowedDates === lastFiveDays }"
        @click="allowedDates = lastFiveDays"
      >Object</v-btn>
      <v-date-picker
        class="mt-3"
        v-model="date"
        :allowed-dates="allowedDates"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      date: null,
      allowedDates: null,
      everyOtherDay (date) {
        const [,, day] = date.split('-')
        return parseInt(day, 10) % 2 === 0
      },
      randomDays: [],
      lastFiveDays: {
        min: null,
        max: null
      }
    }),

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

      this.allowedDates = this.everyOtherDay
    }
  }
</script>
