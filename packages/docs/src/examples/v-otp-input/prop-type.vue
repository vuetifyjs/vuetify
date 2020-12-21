<template>
  <div class="ma-auto" style="max-width: 260px">
    <v-otp-input
      v-model="otp"
      type="password"
      :length="length"
      dark
    ></v-otp-input>
  </div>
</template>

<script>
  export default {
    data: () => ({
      otp: '',
      length: 5,
    }),
    computed: {
      isActive () {
        return this.otp.length === this.length
      },
    },
  }
</script>

<style scoped>
</style>
