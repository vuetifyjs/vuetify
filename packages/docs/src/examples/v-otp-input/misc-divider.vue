<template>
  <v-sheet
    class="py-8 px-6 mx-auto ma-4 text-center"
    elevation="4"
    max-width="500"
    rounded="lg"
    width="100%"
  >
    <h3 class="text-h5">Verification Code</h3>

    <div class="text-subtitle-2 font-weight-light mb-3">Please enter the verification code sent to your mobile</div>

    <v-otp-input
      v-model="otp"
      class="mb-8"
      divider="•"
      length="4"
      variant="outlined"
    ></v-otp-input>

    <div class="text-caption">
      <v-btn
        color="primary"
        size="x-small"
        text="Send New Code"
        variant="text"
        @click="otp = ''"
      ></v-btn>
    </div>
  </v-sheet>
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
