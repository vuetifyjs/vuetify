<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-color-picker
      v-model="picker"
      flat
    ></v-color-picker>

    <v-color-picker
      v-model="picker"
      elevation="15"
    ></v-color-picker>
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
