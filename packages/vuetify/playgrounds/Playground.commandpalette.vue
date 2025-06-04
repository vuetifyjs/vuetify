<script setup lang="ts">
  import { VCommandPalette } from '../src/labs/VCommandPalette'
  import { ref } from 'vue'

  const model = ref(true)
</script>

<template>
  <VBtn @click="model = !model">
    Open
  </VBtn>
  <VCommandPalette v-model="model" />
</template>

<style scoped lang="scss"></style>
