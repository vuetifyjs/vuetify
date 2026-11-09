<template>
  <v-time-input
    v-model="time"
    :allowed-minutes="m => m % 15 === 0"
    label="Office hours"
    max="17:30"
    max-width="368"
    min="09:00"
  ></v-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const time = shallowRef('09:00')
</script>
