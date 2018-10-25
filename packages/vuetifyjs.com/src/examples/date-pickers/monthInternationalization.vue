<template>
  <v-layout justify-space-between wrap>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker
        v-model="picker"
        type="month"
        locale="th"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker
        v-model="picker"
        type="month"
        locale="sv-se"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7)
      }
    }
  }
</script>
