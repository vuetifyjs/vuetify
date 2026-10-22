<template>
  <div>
    <v-input
      v-model="main"
      :rules="rules"
      hide-details="auto"
    >
      <input
        v-model="main"
        placeholder="Main input"
        style="border: none; outline: none; width: 100%; background: transparent;"
      >
    </v-input>

    <v-input>
      <input
        placeholder="Another input"
        style="border: none; outline: none; width: 100%; background: transparent;"
      >
    </v-input>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const main = ref('')
  const rules = [
    value => !!value || 'Required.',
    value => (value && value.length >= 3) || 'Min 3 characters',
  ]
</script>
