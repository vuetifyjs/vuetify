<template>
  <v-row

    align="center"
    justify="space-around"
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

<script setup>
  import { ref } from 'vue'

  const picker = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
