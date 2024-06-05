<template>
  <v-row justify="center">
    <v-date-picker
      v-model="date"
      :allowed-dates="allowedMonths"
      class="mt-4"
      max="2019-10"
      min="2017-06"
      type="month"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const date = ref('2017-12')
</script>

<script>
  export default {
    data () {
      return {
        date: '2017-12',
      }
    },

    methods: {
      allowedMonths: val => parseInt(val.split('-')[1], 10) % 2 === 0,
    },
  }
</script>
