<template>
  <v-select
    :items="items"
    :menu-props="{ top: true, offsetY: true }"
    label="Label"
  ></v-select>
</template>

<script setup>
  const items = ['Foo', 'Bar', 'Fizz', 'Buzz']
</script>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>
