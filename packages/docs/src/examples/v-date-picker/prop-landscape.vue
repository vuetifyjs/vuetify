<template>
  <v-layout>
    <v-container>
      <v-fab
        icon="mdi-refresh"
        location="top end"
        app
        v-tooltip="'Clear selection'"
        @click="value = null"
      ></v-fab>

      <div class="d-flex flex-wrap justify-space-around ga-6">
        <v-date-picker
          v-model="value"
          color="primary"
          landscape
        ></v-date-picker>

        <v-date-picker
          v-model="value"
          color="purple"
          header-date-format="monthAndDate"
          landscape-header-width="250"
          landscape
        ></v-date-picker>
      </div>
    </v-container>
  </v-layout>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const value = shallowRef('2025-11-01')
</script>
