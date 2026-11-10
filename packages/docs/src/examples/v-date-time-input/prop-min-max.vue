<template>
  <v-date-time-input
    v-model="pickup"
    :max="max"
    :min="min"
    hint="Today the earliest time is in an hour, later days start at midnight"
    label="Courier pickup"
    max-width="368"
    persistent-hint
  ></v-date-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const pad = v => String(v).padStart(2, '0')
  const day = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

  const soon = new Date(Date.now() + 60 * 60 * 1000)
  const min = `${day(soon)}T${pad(soon.getHours())}:${pad(soon.getMinutes())}`
  const max = `${day(new Date(soon.getFullYear(), soon.getMonth(), soon.getDate() + 7))}T18:00`

  const pickup = shallowRef(null)
</script>
