<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md12 lg4 class="ma-3">
        <v-date-picker v-model="picker"></v-date-picker>
      </v-flex>
      <v-flex md12 lg8 class="ma-3">
        <v-date-picker v-model="picker2" landscape></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        picker2: null
      }
    }
  }
</script>
