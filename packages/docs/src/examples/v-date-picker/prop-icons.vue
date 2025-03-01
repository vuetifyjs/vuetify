<template>
  <v-row justify="center">
    <v-date-picker
      v-model="picker"
      next-icon="mdi-skip-next"
      prev-icon="mdi-skip-previous"
      year-icon="mdi-calendar-blank"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
</script>

<script>
  export default {
    data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
  }
</script>
