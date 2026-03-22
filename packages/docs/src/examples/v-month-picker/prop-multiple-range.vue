<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <h5 class="mb-2">Multiple selection</h5>

        <v-month-picker
          v-model="selection2"
          multiple
        ></v-month-picker>

        <code class="d-block pt-3">value: {{ selection2.join(',') }}</code>
      </v-col>

      <v-col cols="auto">
        <h5 class="mb-2">Range selection</h5>

        <v-month-picker
          v-model="selection1"
          multiple="range"
        ></v-month-picker>

        <code class="d-block pt-3">value: {{ selection1.join(',') }}</code>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selection1 = shallowRef([])
  const selection2 = shallowRef([])
</script>
