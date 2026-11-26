<template>
  <v-date-time-input
    v-model="due"
    default-time="17:00"
    hint="Picking only a date sets the end of the work day"
    label="Due"
    max-width="368"
    persistent-hint
  ></v-date-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const due = shallowRef(null)
</script>
