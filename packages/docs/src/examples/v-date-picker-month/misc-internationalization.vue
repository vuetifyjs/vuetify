<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      locale="th"
      type="month"
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      locale="sv-se"
      type="month"
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
