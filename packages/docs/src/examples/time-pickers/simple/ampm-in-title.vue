<template>
  <v-row

    justify="space-around"
    align="center"
  >
    <v-time-picker
      v-model="picker"
      ampm-in-title
    ></v-time-picker>
    <v-time-picker
      v-model="picker"
      :landscape="$vuetify.breakpoint.smAndUp"
      ampm-in-title
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
