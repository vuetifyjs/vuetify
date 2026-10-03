<template>
  <v-input
    v-model="email"
    :rules="rules"
  >
    <input
      v-model="email"
      type="email"
      placeholder="email@example.com"
      style="border: none; outline: none; width: 100%; background: transparent;"
    >
  </v-input>
</template>

<script setup>
  import { ref } from 'vue'

  const email = ref('')
  const rules = [
    value => !!value || 'Required.',
    value => (value || '').length <= 40 || 'Max 40 characters',
    value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  ]
</script>
