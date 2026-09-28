<template>
  <v-otp-input
    v-model="otp"
    merged
  ></v-otp-input>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const otp = shallowRef('4256')
</script>

<script>
  export default {
    data: () => ({
      otp: '4256',
    }),
  }
</script>
