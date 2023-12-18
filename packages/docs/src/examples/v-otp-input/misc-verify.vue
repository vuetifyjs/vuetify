<template>
  <v-card
    class="py-12 px-8 text-center mx-auto ma-4"
    max-width="420"
    width="100%"
  >
    <h3 class="text-h6 mb-2">
      Please enter the one time password to verify your account
    </h3>

    <div>A code has been sent to *****2489</div>

    <v-otp-input
      v-model="otp"
      :disabled="validating"
      variant="plain"
      color="primary"
    ></v-otp-input>

    <v-btn
      :loading="validating"
      border
      class="mt-6 text-none bg-surface-variant"
      rounded
      variant="plain"
      text="Validate"
      height="40"
      width="135"
      @click="onClick"
    ></v-btn>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const otp = shallowRef('2401')
  const validating = shallowRef(false)

  function onClick () {
    validating.value = true

    setTimeout(() => {
      validating.value = false
    }, 2000)
  }
</script>

<script>
  export default {
    data: () => ({
      otp: '',
      validating: false,
    }),

    methods: {
      onClick () {
        this.validating = true

        setTimeout(() => {
          this.validating = false
        }, 2000)
      },
    },
  }
</script>
