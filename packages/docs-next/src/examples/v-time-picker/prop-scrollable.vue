<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-time-picker
      v-model="picker"
      scrollable
    ></v-time-picker>
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
