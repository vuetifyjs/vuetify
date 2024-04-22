<template>
  <v-container>
    <v-row justify="space-around">
      <v-time-picker
        v-model="time"
        :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"
        format="24hr"
        max="22:15"
        min="9:30"
        scrollable
      ></v-time-picker>

      <v-time-picker
        v-model="timeStep"
        :allowed-minutes="allowedStep"
        format="24hr"
      ></v-time-picker>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const time = ref('11:15')
  const timeStep = ref('10:10')
</script>

<script>
  export default {
    data () {
      return {
        time: '11:15',
        timeStep: '10:10',
      }
    },
    methods: {
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50,
      allowedStep: m => m % 10 === 0,
    },
  }
</script>
