<template>
  <v-container>
    <v-combobox
      :items="fruits"
      label="Fruits"
      placeholder="Ex: Apple, Grape"
      multiple
      persistent-placeholder
    ></v-combobox>
  </v-container>
</template>

<script setup>
  const fruits = ['Apple', 'Grape', 'Banana']
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14098-218150"
}
</example-meta>
