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
