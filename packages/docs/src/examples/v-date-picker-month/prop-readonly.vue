<template>
  <v-row justify="center">
    <v-date-picker
      v-model="date"
      type="month"
      readonly
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const date = ref(new Date().toISOString().substr(0, 7))
</script>

<script>
  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 7),
      }
    },
  }
</script>
