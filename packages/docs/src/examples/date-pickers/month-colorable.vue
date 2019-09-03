<template>
  <v-row>
    <v-col md="12" lg="6">
      <v-date-picker v-model="picker" type="month" color="green lighten-1"></v-date-picker>
    </v-col>
    <v-col md="12" lg="6" class="hidden-xs-only">
      <v-date-picker v-model="picker2" type="month" color="green lighten-1" header-color="primary"></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
        picker2: new Date().toISOString().substr(0, 7),
      }
    },
  }
</script>
