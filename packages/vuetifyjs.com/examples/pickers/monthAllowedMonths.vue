<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        :color="allowedMonths === thirtyOneDays ? 'primary' : ''"
        :class="{ 'white--text': allowedMonths === thirtyOneDays }"
        @click.native="allowedMonths = thirtyOneDays"
      >Function</v-btn>
      <v-btn
        :color="allowedMonths === randomMonths ? 'primary' : ''"
        :class="{ 'white--text': allowedMonths === randomMonths }"
        @click.native="allowedMonths = randomMonths"
      >Array</v-btn>
      <v-btn
        :color="allowedMonths === lastFiveMonths ? 'primary' : ''"
        :class="{ 'white--text': allowedMonths === lastFiveMonths }"
        @click.native="allowedMonths = lastFiveMonths"
      >Object</v-btn>
      <v-date-picker
        type="month"
        class="mt-3"
        v-model="date"
        :allowed-dates="allowedMonths"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        date: null,
        allowedMonths: null,
        thirtyOneDays: function (date) {
          return [0, 2, 4, 6, 7, 9, 11].includes(date.getMonth())
        },
        randomMonths: [],
        lastFiveMonths: {
          min: null,
          max: null
        }
      }
    },
    mounted () {
      const date = new Date()
      this.randomMonths = [...Array(4)].map(() => {
        const month = Math.floor(Math.random() * 12)
        const d = new Date()
        d.setMonth(month)
        return d
      })

      const d = new Date()
      d.setMonth(date.getMonth() - 4)
      this.lastFiveMonths.min = d
      this.lastFiveMonths.max = date

      this.allowedMonths = this.thirtyOneDays
    }
  }
</script>
