<template>
  <v-row
    align="center"
    justify="space-around"
  >
    <v-time-picker
      v-model="picker"
      flat
    ></v-time-picker>

    <v-time-picker
      v-model="picker"
      elevation="15"
    ></v-time-picker>
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
