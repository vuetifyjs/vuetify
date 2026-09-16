<template>
  <v-card
    class="py-12 px-8 text-center mx-auto ma-4"
    max-width="420"
    width="100%"
  >
    <h3 class="text-title-large mt-0 mb-2">
      Please enter the one time password to verify your account
    </h3>

    <div>A code has been sent to *****2489</div>

    <v-otp-input
      v-model="otp"
      :disabled="validating"
      color="primary"
      variant="plain"
    ></v-otp-input>

    <v-btn
      :loading="validating"
      class="mt-6 text-none bg-surface-variant"
      height="40"
      text="Validate"
      variant="plain"
      width="135"
      border
      rounded
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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2063-78016&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
