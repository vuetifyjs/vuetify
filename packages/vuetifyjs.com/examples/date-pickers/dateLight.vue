<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-checkbox hide-details label="Landscape" v-model="landscape"></v-checkbox>
      </v-flex>
      <v-flex xs12 sm3>
        <v-checkbox hide-details label="Reactive" v-model="reactive"></v-checkbox>
      </v-flex>
    </v-layout>

    <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        landscape: false,
        reactive: false
      }
    }
  }
</script>
