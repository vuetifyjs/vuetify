<script setup lang="ts">
import { ref } from 'vue';

// References for testing various boundary conditions
const value1 = ref(20); // Test for max within range
const value2 = ref(Number.MAX_SAFE_INTEGER + 1); // Test for exceeding max value
const value3 = ref(Number.MAX_SAFE_INTEGER + 1); // Test for unparseable max value

const value4 = ref(2); // Test for min within range
const value5 = ref(Number.MIN_SAFE_INTEGER - 1); // Test for exceeding min value
const value6 = ref(Number.MIN_SAFE_INTEGER - 1); // Test for unparseable min value

// Constants for boundary values
const minValue = 5;
const maxValue = 15;
</script>

<template>
  <v-app>
    <v-container>
      <!-- Test case: Max value within range -->
      <v-number-input
        class="max-within-range"
        :max="maxValue"
        v-model="value1"
      />

      <!-- Test case: Max value exceeds safe integer -->
      <v-number-input
        class="max-out-of-range1"
        :max="Number.MAX_SAFE_INTEGER + 2"
        v-model="value2"
      />

      <!-- Test case: Max value set to "Infinity" -->
      <v-number-input
        class="max-out-of-range2"
        max="Infinity"
        v-model="value3"
      />

      <!-- Test case: Min value within range -->
      <v-number-input
        class="min-within-range"
        :min="minValue"
        v-model="value4"
      />

      <!-- Test case: Min value below safe integer -->
      <v-number-input
        class="min-out-of-range1"
        :min="Number.MIN_SAFE_INTEGER - 2"
        v-model="value5"
      />

      <!-- Test case: Min value set to "-Infinity" -->
      <v-number-input
        class="min-out-of-range2"
        min="-Infinity"
        v-model="value6"
      />

      <!-- Testing VNumberInput with various styles, icons, and options -->
      <v-number-input prepend-inner-icon="mdi-alert" reverse />
      <v-number-input prepend-inner-icon="mdi-square" hide-input />
      <v-number-input hide-input />
      <v-number-input prepend-inner-icon="mdi-circle-outline" />
      <v-select prepend-inner-icon="mdi-check" placeholder="Normal padding" />


    </v-container>
  </v-app>
</template>
