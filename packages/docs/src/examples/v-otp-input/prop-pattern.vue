<template>
  <div class="text-center">
    <h5 class="my-2">Numeric (default)</h5>
    <v-otp-input v-model="numeric" pattern="numeric"></v-otp-input>

    <h5 class="my-2">Alpha</h5>
    <v-otp-input v-model="alpha" pattern="alpha"></v-otp-input>

    <h5 class="my-2">Custom RegExp (uppercase only)</h5>
    <v-otp-input v-model="upper" :pattern="/[A-Z]/"></v-otp-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const numeric = shallowRef('1234')
  const alpha = shallowRef('abcD')
  const upper = shallowRef('ZERO')
</script>

<script>
  export default {
    data: () => ({
      numeric: '123456',
      alpha: 'abcDEF',
      upper: 'VUEJSX',
    }),
  }
</script>
