<template>
  <div class="text-center">
    <h5 class="my-2">[3] - [3] merged groups</h5>
    <v-otp-input v-model="otp">
      <v-otp-group merged>
        <v-otp-field :index="0"></v-otp-field>
        <v-otp-field :index="1"></v-otp-field>
        <v-otp-field :index="2"></v-otp-field>
      </v-otp-group>
      <v-otp-separator>-</v-otp-separator>
      <v-otp-group merged>
        <v-otp-field :index="3"></v-otp-field>
        <v-otp-field :index="4"></v-otp-field>
        <v-otp-field :index="5"></v-otp-field>
      </v-otp-group>
    </v-otp-input>

    <h5 class="my-2 mt-6">[2] - [4] mixed</h5>
    <v-otp-input v-model="otp">
      <v-otp-group>
        <v-otp-field :index="0"></v-otp-field>
        <v-otp-field :index="1"></v-otp-field>
      </v-otp-group>
      <v-otp-separator>
        <v-icon icon="mdi-minus"></v-icon>
      </v-otp-separator>
      <v-otp-group merged>
        <v-otp-field :index="2"></v-otp-field>
        <v-otp-field :index="3"></v-otp-field>
        <v-otp-field :index="4"></v-otp-field>
        <v-otp-field :index="5"></v-otp-field>
      </v-otp-group>
    </v-otp-input>
  </div>
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
