<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-time-input v-model="time" format="ampm" label="12-hour"></v-time-input>
    </v-col>

    <v-col cols="12" md="6">
      <v-time-input v-model="time" format="24hr" label="24-hour"></v-time-input>
    </v-col>
  </v-row>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const time = shallowRef('14:30')
</script>
