<template>
  <v-container>
    <v-row justify="center">
      <v-month-picker :allowed-months="allowedMonths"></v-month-picker>
    </v-row>
  </v-container>
</template>

<script setup>
  const allowedMonths = [0, 1, 2, 9, 10, 11]
</script>
