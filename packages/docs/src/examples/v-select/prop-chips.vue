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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14302-6865"
  }
</example-meta>
