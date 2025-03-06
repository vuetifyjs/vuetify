<template>
  <v-row justify="center">
    <v-date-picker
      v-model="picker"
      next-icon="mdi-skip-next"
      prev-icon="mdi-skip-previous"
      type="month"
      year-icon="mdi-calendar-blank"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref(new Date().toISOString().substr(0, 7))
</script>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
      }
    },
  }
</script>
