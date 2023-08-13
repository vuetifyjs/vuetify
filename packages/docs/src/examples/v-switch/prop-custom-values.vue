<template>
  <v-switch
    v-model="model"
    hide-details
    true-value="yes"
    false-value="no"
    :label="`Switch: ${model}`"
  ></v-switch>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref('no')
</script>

<script>
  export default {
    data: () => ({
      model: 'no',
    }),
  }
</script>
