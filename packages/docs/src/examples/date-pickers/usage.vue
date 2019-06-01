<template>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-layout row wrap justify-space-around>
          <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
          <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
        </v-layout>
      </v-flex>

      <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
      }
    }
  }
</script>
