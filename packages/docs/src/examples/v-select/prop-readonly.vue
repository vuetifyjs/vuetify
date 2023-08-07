<template>
  <v-select
    v-model="model"
    :items="items"
    readonly
    label="Read-only"
  ></v-select>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
  const model = ref('Foo')
</script>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      model: 'Foo',
    }),
  }
</script>
