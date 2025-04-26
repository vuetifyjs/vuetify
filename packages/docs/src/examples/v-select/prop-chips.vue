<template>
  <v-select
    v-model="value"
    :items="items"
    label="Chips"
    chips
    multiple
  ></v-select>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = shallowRef(['foo', 'bar', 'fizz', 'buzz'])
  const value = shallowRef(['foo', 'bar', 'fizz', 'buzz'])
</script>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
  }
</script>
