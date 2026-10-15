<template>
  <v-select
    v-model="value"
    :items="items"
    label="Select Item"
    multiple
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index < 2" :text="item"></v-chip>

      <span
        v-if="index === 2"
        class="text-grey text-body-small align-self-center"
      >
        (+{{ value.length - 2 }} others)
      </span>
    </template>
  </v-select>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const value = shallowRef(['foo', 'bar', 'fizz'])
  const items = ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar']
</script>

<script>
  export default {
    data: () => ({
      value: ['foo', 'bar', 'fizz'],
      items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
    }),
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14319-3373"
  }
</example-meta>
