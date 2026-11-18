<template>
  <v-date-time-input
    v-model="since"
    format="24hr"
    input-format="yyyy-mm-dd"
    label="Show logs since"
    max-width="368"
    prepend-icon=""
    prepend-inner-icon="mdi-history"
  ></v-date-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const since = shallowRef('2026-01-01T00:00')
</script>
