<template>
  <v-layout row wrap>
    <v-flex md12 lg4>
      <v-date-picker type="month" v-model="e2" actions dark></v-date-picker>
    </v-flex>
    <v-flex md12 lg8 class="hidden-xs-only">
      <v-date-picker type="month" v-model="e2" actions landscape dark></v-date-picker>
    </v-flex>
  </v-layout>
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
