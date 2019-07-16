<template>
  <v-layout row wrap justify-space-around>
    <v-date-picker
      v-model="date"
      type="month"
      width="290"
      class="mt-3"
    ></v-date-picker>
    <v-date-picker
      v-model="date"
      full-width
      :landscape="$vuetify.breakpoint.smAndUp"
      type="month"
      class="mt-3"
    ></v-date-picker>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 7),
    }),
  }
</script>
