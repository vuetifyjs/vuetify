<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="date"
      type="month"
      width="290"
      class="mt-4"
    ></v-date-picker>
    <v-date-picker
      v-model="date"
      full-width
      type="month"
      class="mt-4"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const date = ref(new Date().toISOString().substr(0, 7))
</script>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 7),
    }),
  }
</script>
