<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-date-picker
      v-model="picker"
      flat
    ></v-date-picker>

    <v-date-picker
      v-model="picker"
      elevation="15"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
