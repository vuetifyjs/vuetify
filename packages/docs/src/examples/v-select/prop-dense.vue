<template>
  <v-select
    :items="items"
    density="compact"
    label="Compact"
  ></v-select>

  <v-select
    :items="items"
    density="comfortable"
    label="Comfortable"
  ></v-select>

  <v-select
    :items="items"
    label="Default"
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
