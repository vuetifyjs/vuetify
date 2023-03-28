<template>
  <v-container class="bg-green-lighten-2" fluid>
    <v-row>
      <v-col cols="9">
        <div class="ma-auto" style="max-width: 300px">
          <v-otp-input
            v-model="otp"
            :length="length"
            dark
          ></v-otp-input>
        </div>
      </v-col>

      <v-col cols="2" class="my-3">
        <v-btn block :disabled="!isActive">Ready</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      otp: '',
      length: 7,
    }),
    computed: {
      isActive () {
        return this.otp.length === this.length
      },
    },
  }
</script>
