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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2076-4905"
}
</example-meta>
