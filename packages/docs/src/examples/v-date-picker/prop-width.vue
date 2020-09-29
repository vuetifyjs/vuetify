<template>
  <v-row align="center">
    <v-date-picker
      v-model="date"
      width="290"
      class="mt-4"
    ></v-date-picker>
    <v-date-picker
      v-model="date"
      full-width
      class="mt-4"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
    }),
  }
</script>
