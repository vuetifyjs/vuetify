<template>
  <div>
    <div class="ma-auto position-relative" style="max-width: 300px">
      <v-otp-input
        v-model="otp"
        :disabled="loading"
        @finish="onFinish"
      ></v-otp-input>
      <div
        v-if="loading"
        class="fill-width position-absolute fill-height bg-block text-center pt-4"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
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
 .fill-width {
   width: 100%;
 }
 .position-relative {
   position: relative;
 }
 .position-absolute {
   position: absolute;
   top: 0;
 }
 .bg-block {
   background: #eeeeeec2;
 }
</style>
