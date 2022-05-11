<template>
  <v-app>
    <h3>Year {{ year }}</h3>
    <h3>Month {{ month }}</h3>
    <v-date-picker-month
      :month="month"
      :year="year"
      :model-value="['2022-05-06', '2022-05-11']"
      show-weekdays
      show-adjacent-months
      show-week
    />
    <v-btn @click="prev">prev</v-btn>
    <v-btn @click="next">next</v-btn>
  </v-app>
</template>

<script>
  import { changeMonth } from '../src/components/VDatePicker/utils'

  export default {
    data: () => ({
      month: 8,
      year: 2022,
    }),
    methods: {
      prev () {
        const [year, month] = changeMonth(this.year, this.month, -1)
        this.year = year
        this.month = month
      },
      next () {
        const [year, month] = changeMonth(this.year, this.month, 1)
        this.year = year
        this.month = month
      },
    },
  }
</script>
