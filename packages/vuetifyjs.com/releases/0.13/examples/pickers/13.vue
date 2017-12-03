<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-date-picker
        :months="months"
        :days="days"
        first-day-of-week="星期日"
        :short-days="(d) => { return d.slice(-1) }"
        :title-date-format="({ dayName, monthName, day }) => { return `${monthName}${day}日, ${dayName}` }"
        :header-date-format="({ monthName, year }) => { return `${year}年 ${monthName}` }"
        v-model="picker"
      ></v-date-picker>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        picker: null,
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(x => x + '月'),
        days: ['日', '一', '二', '三', '四', '五', '六'].map(x => '星期' + x),
      }
    }
  }
</script>
