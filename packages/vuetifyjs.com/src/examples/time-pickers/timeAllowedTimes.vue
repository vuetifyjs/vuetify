<template>
  <v-layout row wrap>
    <v-flex md12 lg6>
      <v-time-picker
        v-model="time"
        :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"
        class="mt-3"
        format="24hr"
        scrollable
        min="9:30"
        max="22:15"
      ></v-time-picker>
    </v-flex>
    <v-flex md12 lg6>
      <v-time-picker
        v-model="timeStep"
        :allowed-minutes="allowedStep"
        class="mt-3"
        format="24hr"
      ></v-time-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        time: '11:15',
        timeStep: '10:10'
      }
    },
    methods: {
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50,
      allowedStep: m => m % 10 === 0
    }
  }
</script>
