<template>
  <v-layout row justify-center>
    <v-date-picker
      v-model="months"
      type="month"
      multiple
    ></v-date-picker>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      months: ['2018-09', '2018-10'],
    }),
  }
</script>
