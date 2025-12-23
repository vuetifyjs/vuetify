<template>
  <v-card
    class="py-8 px-6 text-center mx-auto ma-4"
    elevation="4"
    max-width="400"
    width="100%"
  >
    <h3 class="text-h6 mb-4">Verify Your Account</h3>

    <div class="text-body-2">
      We sent a verification code to john..@gmail.com <br>

      Please check your email and paste the code below.
    </div>

    <v-sheet color="surface">
      <v-otp-input
        v-model="otp"
        type="password"
        variant="solo"
      ></v-otp-input>
    </v-sheet>

    <v-btn
      class="my-4"
      color="purple"
      height="40"
      text="Verify"
      variant="flat"
      width="70%"
    ></v-btn>

    <div class="text-caption">
      Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
    </div>
  </v-card>
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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2062-10241&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
