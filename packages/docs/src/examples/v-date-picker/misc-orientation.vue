<template>
  <v-row align="center">
    <v-checkbox
      v-model="landscape"
      label="Landscape"
    ></v-checkbox>
    <v-date-picker
      v-model="picker"
      :landscape="landscape"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref(new Date().toISOString().substr(0, 7))
  const landscape = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
        landscape: false,
      }
    },
  }
</script>
