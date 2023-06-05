<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <div class="text-center">
        <div class="ma-auto" style="max-width: 320px">
          <v-otp-input
            v-model="otp"
            v-bind="$attrs"
            @finish="onOtpFinished"
          ></v-otp-input>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',
    inheritAttrs: false,
    props: {
      maxWidth: {
        type: Number,
        default: 300,
      },
    },
    data: () => ({
      defaults: {
        disabled: false,
        length: 6,
        plain: false,
      },
      otp: '',
      options: {
        booleans: ['disabled', 'dark', 'plain'],
        selects: {
          type: ['text', 'password', 'number'],
        },
        sliders: { length: [2, 8, 2] },
      },
      tabs: ['default'],
    }),
    methods: {
      onOtpFinished (rsp) {
        // OTP ready to process.
        console.log('Completed input with', rsp)
      },
    },
  }
</script>
