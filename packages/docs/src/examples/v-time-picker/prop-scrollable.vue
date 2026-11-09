<template>
  <v-row class="align-center justify-space-around">
    <v-time-picker
      v-model="picker"
      scrollable="clock"
    ></v-time-picker>
    <v-time-picker
      v-model="picker"
      scrollable="controls"
      variant="input"
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
