<template>
  <v-select
    :items="items"
    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
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
