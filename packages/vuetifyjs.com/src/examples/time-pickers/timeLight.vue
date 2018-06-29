<template>
  <div>
    <v-checkbox v-model="landscape" label="Landscape"></v-checkbox>
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
