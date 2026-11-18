<template>
  <v-select
    v-model="selected"
    :items="['Apple', 'Orange', 'Banana', 'Pear']"
    :list-props="{ bgColor: 'purple' }"
    item-color="yellow"
    label="Label"
    multiple
  ></v-select>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref(['Apple'])
</script>

<script>
  export default {
    data: () => ({
      selected: ['Apple'],
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14302-7105"
  }
</example-meta>
