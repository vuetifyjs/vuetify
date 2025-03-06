<template>
  <v-switch
    v-model="model"
    :label="`Switch: ${model}`"
    false-value="no"
    true-value="yes"
    hide-details
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
