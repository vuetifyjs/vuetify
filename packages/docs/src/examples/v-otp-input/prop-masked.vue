<template>
  <div class="text-center">
    <h5 class="my-2">(accepting only digits)</h5>
    <v-otp-input
      v-model="otp"
      type="number"
      masked
    ></v-otp-input>

    <div class="mt-2">Value: <v-code>{{ otp }}</v-code></div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const otp = ref('3216')
</script>

<script>
  export default {
    data: () => ({
      otp: '3216',
    }),
  }
</script>
