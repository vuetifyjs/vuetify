<template>
  <v-row justify="center">
    <v-date-picker
      v-model="months"
      type="month"
      multiple
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const months = ref(['2018-09', '2018-10'])
</script>

<script>
  export default {
    data: () => ({
      months: ['2018-09', '2018-10'],
    }),
  }
</script>
