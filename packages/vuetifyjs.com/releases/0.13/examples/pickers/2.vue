<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md12 lg4 class="ma-3">
        <v-date-picker v-model="e2" actions dark></v-date-picker>
      </v-flex>
      <v-flex md12 lg8 class="ma-3">
        <v-date-picker v-model="e2" actions landscape dark></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e2: null,
      }
    }
  }
</script>
