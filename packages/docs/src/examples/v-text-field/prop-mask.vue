<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-text-field v-model="mask" label="Mask"></v-text-field>
      <v-text-field v-model="value" :mask="mask"></v-text-field>
    </v-card>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const mask = ref('credit-card')
  const value = ref(4444444444444444)
</script>
