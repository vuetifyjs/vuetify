<template>
  <v-row justify="center">
    <v-time-picker v-model="picker"></v-time-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
