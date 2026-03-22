<template>
  <v-container>
    <v-row justify="center">
      <v-month-picker :allowed-months="allowedMonths"></v-month-picker>
    </v-row>
  </v-container>
</template>

<script setup>
  // Only allow Q1 months (Jan, Feb, Mar)
  const allowedMonths = [0, 1, 2]
</script>
