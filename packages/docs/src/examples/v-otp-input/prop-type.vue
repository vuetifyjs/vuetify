<template>
  <v-otp-input
    v-model="otp"
    type="password"
    length="5"
    variant="solo-inverted"
  ></v-otp-input>
</template>

<script setup>
  import { ref } from 'vue'

  const otp = ref('')
</script>

<script>
  export default {
    data: () => ({
      otp: '',
    }),
  }
</script>
