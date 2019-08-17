<template>
  <v-row align="stretch">
    <v-col align-self="center">
      <v-time-picker
        v-model="time"
        type="month"
        width="290"
        class="mt-4"
      ></v-time-picker>
    </v-col>
    <v-time-picker
      v-model="time"
      :landscape="$vuetify.breakpoint.mdAndUp"
      class="mt-4"
      full-width
      type="month"
    ></v-time-picker>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      time: '11:15',
    }),
  }
</script>
