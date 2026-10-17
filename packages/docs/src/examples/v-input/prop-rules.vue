<template>
  <v-input
    v-model="email"
    :rules="rules"
  >
    <template v-slot:default="{ id, messagesId }">
      <input
        :id="id.value"
        v-model="email"
        :aria-describedby="messagesId.value"
        aria-label="Email address"
        class="border pa-2 w-100"
        placeholder="Email address"
        type="email"
      >
    </template>
  </v-input>
</template>

<script setup>
  import { ref } from 'vue'

  const email = ref('')

  const rules = [
    value => !!value || 'Required.',
    value => (value || '').length <= 20 || 'Max 20 characters',
    value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  ]
</script>
