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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14302-6913"
}
</example-meta>
