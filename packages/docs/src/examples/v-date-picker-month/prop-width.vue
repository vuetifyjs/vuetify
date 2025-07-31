<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="date"
      class="mt-4"
      type="month"
      width="290"
    ></v-date-picker>
    <v-date-picker
      v-model="date"
      class="mt-4"
      type="month"
      full-width
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
