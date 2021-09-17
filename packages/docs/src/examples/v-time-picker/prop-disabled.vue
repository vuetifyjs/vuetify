<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-time-picker
      v-model="picker"
      disabled
    ></v-time-picker>
    <v-time-picker
      v-model="picker"
      :landscape="$vuetify.breakpoint.smAndUp"
      disabled
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
