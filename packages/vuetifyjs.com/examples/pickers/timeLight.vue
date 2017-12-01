<template>
  <div>
    <v-checkbox label="Landscape" v-model="landscape"></v-checkbox>
    <v-time-picker v-model="picker" :landscape="landscape"></v-time-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        landscape: false
      }
    }
  }
</script>
