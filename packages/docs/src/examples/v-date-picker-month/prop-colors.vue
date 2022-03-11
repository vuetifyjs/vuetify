<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      type="month"
      color="green lighten-1"
    ></v-date-picker>
    <v-date-picker
      v-model="picker2"
      type="month"
      color="green lighten-1"
      header-color="primary"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().slice(0, 7),
        picker2: new Date().toISOString().slice(0, 7),
      }
    },
  }
</script>
