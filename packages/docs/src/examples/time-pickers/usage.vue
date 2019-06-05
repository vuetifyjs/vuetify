<template>
  <div>
    <v-checkbox v-model="landscape" label="Landscape"></v-checkbox>
    <v-checkbox v-model="ampmInTitle" label="AM/PM in title"></v-checkbox>
    <v-time-picker v-model="picker" :landscape="landscape" :ampm-in-title="ampmInTitle"></v-time-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        landscape: false,
        ampmInTitle: false,
      }
    },
  }
</script>
