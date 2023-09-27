<template>
  <div>
    <v-otp-input
      v-model="otp"
      :loading="loading"
      @finish="onFinish"
    ></v-otp-input>

    <div>
      Expected value: <span class="font-weight-bold">{{ expectedOtp }}</span>
    </div>

    <div class="text-caption">Type or copy/paste.</div>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const loading = ref(false)
  const snackbar = ref(false)
  const snackbarColor = ref('default')
  const otp = ref('')
  const text = ref('')
  const expectedOtp = ref('133707')
  function onFinish (rsp) {
    loading.value = true

    setTimeout(() => {
      loading.value = false
      snackbarColor.value = (rsp === expectedOtp.value) ? 'success' : 'warning'
      text.value = `Processed OTP with "${rsp}" (${snackbarColor.value})`
      snackbar.value = true
    }, 3500)
  }
</script>

<script>
  export default {
    data: () => ({
      loading: false,
      snackbar: false,
      snackbarColor: 'default',
      otp: '',
      text: '',
      expectedOtp: '133707',
    }),

    methods: {
      onFinish (rsp) {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.snackbarColor = (rsp === this.expectedOtp) ? 'success' : 'warning'
          this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`
          this.snackbar = true
        }, 1500)
      },
    },
  }
</script>
