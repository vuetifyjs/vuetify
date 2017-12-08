<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker v-model="picker" year-icon="mdi-calendar-blank" prepend-icon="fa-backward" append-icon="fa-forward"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: null
      }
    }
  }
</script>
