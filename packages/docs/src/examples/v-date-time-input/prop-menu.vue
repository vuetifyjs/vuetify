<template>
  <v-date-time-input
    v-model="reminder"
    v-model:menu="menu"
    label="Remind me"
    max-width="368"
    prepend-icon=""
  >
    <template v-slot:append-inner>
      <v-icon-btn
        aria-label="Choose date"
        icon="mdi-calendar"
        size="small"
        variant="text"
        @click="menu = 'date'"
      ></v-icon-btn>

      <v-icon-btn
        aria-label="Choose time"
        icon="mdi-clock-outline"
        size="small"
        variant="text"
        @click="menu = 'time'"
      ></v-icon-btn>
    </template>
  </v-date-time-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const reminder = shallowRef(null)
  const menu = shallowRef(false)
</script>
