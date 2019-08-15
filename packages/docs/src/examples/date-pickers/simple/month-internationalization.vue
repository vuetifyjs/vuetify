<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      type="month"
      locale="th"
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      type="month"
      locale="sv-se"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
      }
    },
  }
</script>
