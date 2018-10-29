<template>
  <div>
    <v-checkbox v-model="landscape" label="Landscape"></v-checkbox>
    <v-date-picker v-model="picker" :landscape="landscape" type="month"></v-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
        landscape: false
      }
    }
  }
</script>
