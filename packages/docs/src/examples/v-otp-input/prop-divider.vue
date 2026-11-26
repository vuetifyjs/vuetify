<template>
  <v-otp-input
    v-model="otp"
    divider="•"
    length="4"
  ></v-otp-input>
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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2063-78952"
  }
</example-meta>
