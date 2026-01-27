<template>
  <v-sheet
    class="pt-8 pb-12 px-6 ma-4 mx-auto"
    max-width="350"
    width="100%"
    border
  >
    <h3 class="text-h6 mt-0 mb-1">Mobile phone verification</h3>

    <div class="text-body-2 font-weight-light">
      Enter the code we just sent to your mobile phone <span class="font-weight-black text-primary">+1 408 555 1212</span>
    </div>

    <v-otp-input
      v-model="otp"
      class="mt-3 ms-n2"
      length="4"
      placeholder="0"
      variant="underlined"
    ></v-otp-input>

    <v-divider class="mt-3 mb-6"></v-divider>

    <div class="mb-3 text-body-2">
      Need another <strong>code</strong>?
    </div>

    <v-btn
      color="primary"
      size="small"
      text="Re-send Email"
      variant="tonal"
      @click="otp = ''"
    ></v-btn>
  </v-sheet>
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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2063-36830&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
