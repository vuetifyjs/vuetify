<template>
  <v-container class="bg-green-lighten-2" fluid>
    <v-row>
      <v-col cols="9">
        <div class="ma-auto" style="max-width: 300px">
          <v-otp-input
            v-model="otp"
            :length="length"
            theme="dark"
          ></v-otp-input>
        </div>
      </v-col>

      <v-col cols="2" class="my-3">
        <v-btn block :disabled="!isActive">Ready</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const otp = ref('')
  const length = ref(7)

  const isActive = computed(() => {
    return otp.value.length === length.value
  })
</script>

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
