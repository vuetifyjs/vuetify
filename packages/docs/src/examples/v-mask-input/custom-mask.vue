<template>
  <div>
    <v-mask-input
      v-model="model"
      label="Product Code"
      mask="AAA-###"
      placeholder="ABC-123"
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
