<template>
  <div>
    <v-mask-input
      v-model="model"
      :mask="{
        mask: 'LLL-NNN',
        tokens: {
          'L': {
            pattern: /[A-Z]/,
            convert: v => v.toUpperCase()
          },
          'N': {
            pattern: /[0-9]/,
            convert: v => v
          }
        }
      }"
      label="License Plate"
      persistent-hint
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
