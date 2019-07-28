<template>
  <div>
    <h1>Plan your event:</h1>
    <v-layout wrap justify-space-around align-center>
      <v-flex style="width: 290px; flex: 0 1 auto;">
        <h2>Start:</h2>
        <v-time-picker v-model="start" :max="end"></v-time-picker>
      </v-flex>
      <v-flex style="width: 290px; flex: 0 1 auto;">
        <h2>End:</h2>
        <v-time-picker v-model="end" :min="start"></v-time-picker>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        start: null,
        end: null,
      }
    },
  }
</script>
