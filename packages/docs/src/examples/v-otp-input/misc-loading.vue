<template>
  <div>
    <div class="ma-auto position-relative" style="max-width: 300px">
      <v-otp-input
        v-model="otp"
        :disabled="loading"
        @finish="onFinish"
      ></v-otp-input>
      <v-overlay absolute :model-value="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </div>
    <div>
      Expected value: <span class="font-weight-bold">{{ expectedOtp }}</span>
    </div>
    <div class="text--caption">Type or copy/paste.</div>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

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
        }, 3500)
      },
    },
  }
</script>

<style scoped>
 .position-relative {
   position: relative;
 }
</style>
