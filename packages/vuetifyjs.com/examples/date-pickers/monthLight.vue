<template>
  <div>
    <v-checkbox label="Landscape" v-model="landscape"></v-checkbox>
    <v-date-picker v-model="picker" type="month" :landscape="landscape"></v-date-picker>
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
