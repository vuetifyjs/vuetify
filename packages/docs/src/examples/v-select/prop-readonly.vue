<template>
  <v-select
    v-model="model"
    :items="items"
    label="Read-only"
    readonly
  ></v-select>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef('Foo')
  const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
</script>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      model: 'Foo',
    }),
  }
</script>
