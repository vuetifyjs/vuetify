<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="month1"
      :show-current="false"
      type="month"
    ></v-date-picker>
    <v-date-picker
      v-model="month2"
      show-current="2013-07"
      type="month"
    ></v-date-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const month1 = ref(new Date().toISOString().substr(0, 7))
  const month2 = ref('2013-09')
</script>

<script>
  export default {
    data () {
      return {
        month1: new Date().toISOString().substr(0, 7),
        month2: '2013-09',
      }
    },
  }
</script>
