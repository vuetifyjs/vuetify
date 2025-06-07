<template>
  <div>
    <v-mask-input
      v-model="model"
      label="Credit Card"
      mask="credit-card"
      placeholder="#### - #### - #### - ####"
    ></v-mask-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(null)
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
