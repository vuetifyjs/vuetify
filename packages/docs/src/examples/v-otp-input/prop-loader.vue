<template>
  <div class="text-center">
    <v-otp-input
      v-model="otp"
      :loading="loading"
      length="5"
      variant="underlined"
    ></v-otp-input>

    <v-btn
      :disabled="otp.length < 5 || loading"
      class="my-5"
      color="surface-variant"
      text="Submit"
      variant="tonal"
      @click="onClick"
    ></v-btn>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const loading = shallowRef(false)
  const otp = shallowRef('31')

  function onClick () {
    loading.value = true

    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
</script>

<script>
  export default {
    data: () => ({
      loading: false,
      otp: '',
    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
        }, 2000)
      },
    },
  }
</script>
