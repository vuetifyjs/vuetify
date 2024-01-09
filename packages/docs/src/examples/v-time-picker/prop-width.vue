<template>
  <v-row align="center">
    <v-time-picker
      v-model="time"
      type="month"
      width="290"
      class="ms-4"
    ></v-time-picker>
    <v-col class="pa-0 mx-4 mt-4 mt-sm-0">
      <v-time-picker
        v-model="time"
        :landscape="$vuetify.breakpoint.mdAndUp"
        full-width
        type="month"
      ></v-time-picker>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const time = ref('11:15')
</script>

<script>
  export default {
    data: () => ({
      time: '11:15',
    }),
  }
</script>
