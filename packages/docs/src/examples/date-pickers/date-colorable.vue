<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="hidden-xs-only">
      <v-date-picker v-model="picker2" color="green lighten-1" header-color="primary"></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        picker2: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>
