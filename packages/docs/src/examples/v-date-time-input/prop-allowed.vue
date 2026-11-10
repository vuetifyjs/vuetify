<template>
  <v-date-time-input
    v-model="appointment"
    :allowed-dates="isWeekday"
    :allowed-hours="h => h >= 9 && h < 17"
    :allowed-minutes="m => m % 30 === 0"
    default-time="09:00"
    label="Appointment"
    max-width="368"
  ></v-date-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const appointment = shallowRef(null)

  function isWeekday (date) {
    const day = new Date(date).getDay()

    return day > 0 && day < 6
  }
</script>
