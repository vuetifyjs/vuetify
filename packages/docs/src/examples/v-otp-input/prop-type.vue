<template>
  <div class="ma-auto" style="max-width: 260px">
    <v-otp-input
      v-model="otp"
      type="password"
      length="5"
      dark
    ></v-otp-input>
  </div>
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
