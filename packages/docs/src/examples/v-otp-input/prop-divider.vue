<template>
  <v-otp-input
    v-model="otp"
    divider="•"
    length="4"
  ></v-otp-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const otp = shallowRef('')
</script>

<script>
  export default {
    data: () => ({
      otp: '',
    }),
  }
</script>
