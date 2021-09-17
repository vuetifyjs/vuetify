<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      :first-day-of-week="0"
      locale="zh-cn"
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      :first-day-of-week="1"
      locale="sv-se"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
  }
</script>
