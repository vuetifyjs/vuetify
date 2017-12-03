<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
          :primary="allowedDates === everyOtherDay"
          :class="{ 'white--text': allowedDates === everyOtherDay }"
          @click.native="allowedDates = everyOtherDay"
        >Function</v-btn>
        <v-btn
          :primary="allowedDates === randomDays"
          :class="{ 'white--text': allowedDates === randomDays }"
          @click.native="allowedDates = randomDays"
        >Array</v-btn>
        <v-btn
          :primary="allowedDates === lastFiveDays"
          :class="{ 'white--text': allowedDates === lastFiveDays }"
          @click.native="allowedDates = lastFiveDays"
        >Object</v-btn>
        <v-date-picker
          class="mt-3"
          landscape
          v-model="date"
          :allowed-dates="allowedDates"
        ></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        date: null,
        allowedDates: null,
        everyOtherDay: function (date) {
          return date.getDay() % 2 == 0
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
        return d
      })

      const d = new Date()
      d.setDate(date.getDate() - 5)
      this.lastFiveDays.min = d
      this.lastFiveDays.max = date

      this.allowedDates = this.everyOtherDay
    }
  }
</script>
