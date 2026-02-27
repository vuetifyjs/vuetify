<template>
  <v-layout height="150">
    <v-container class="d-flex flex-wrap ga-3 justify-center">
      <v-btn text="Timer Top" @click="current = 1"></v-btn>
      <v-btn text="Timer bottom" @click="current = 2"></v-btn>
      <v-btn text="Top Reversed" @click="current = 3"></v-btn>
      <v-btn text="Bottom Reversed" @click="current = 4"></v-btn>
    </v-container>

    <v-snackbar
      :model-value="current === 1"
      text="Timer at the top"
      timer="top"
      timer-color="green"
      contained
      @update:model-value="current = -1"
    ></v-snackbar>

    <v-snackbar
      :model-value="current === 2"
      text="Timer at the bottom"
      timer="bottom"
      timer-color="info"
      contained
      @update:model-value="current = -1"
    ></v-snackbar>

    <v-snackbar
      :model-value="current === 3"
      text="Reversed timer"
      timer-color="warning"
      contained
      reverse-timer
      timer
      @update:model-value="current = -1"
    ></v-snackbar>

    <v-snackbar
      :model-value="current === 4"
      text="Reversed bottom timer"
      timer="bottom"
      timer-color="error"
      contained
      reverse-timer
      @update:model-value="current = -1"
    ></v-snackbar>
  </v-layout>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const current = shallowRef(-1)
</script>

<script>
  export default {
    data: () => ({
      current: -1,
    }),
  }
</script>
