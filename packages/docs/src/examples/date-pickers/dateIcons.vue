<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker
        v-model="picker"
        year-icon="mdi-calendar-blank"
        prev-icon="mdi-skip-previous"
        next-icon="mdi-skip-next"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10)
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"]
  }
</codepen-resources>
