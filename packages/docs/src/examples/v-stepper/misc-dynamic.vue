<script setup lang="ts">
import { ref } from "vue";

const current = ref(1); // numeric
</script>

<template>
  <v-stepper v-model="current" :items="['Step 1', 'Step 2', 'Step 3']">
    <!-- Add height to stepper -->
    <v-stepper-window v-model="current" style="height: 450px">
      <v-stepper-window-item :value="1">
        <v-card title="Step 1" height="200"> 200 height </v-card>
      </v-stepper-window-item>
      <v-stepper-window-item :value="2">
        <v-card title="Step 2" height="300"> 300 height </v-card>
      </v-stepper-window-item>
      <v-stepper-window-item :value="3">
        <v-card title="Step 3" height="400"> 400 height </v-card>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>
