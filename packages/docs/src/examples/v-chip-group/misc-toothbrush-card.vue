<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-title class="d-flex">
      <h2 class="text-headline-large my-0">Toothbrush</h2>

      <v-spacer></v-spacer>

      <span class="text-title-large">$4.99</span>
    </v-card-title>

    <v-card-text>
      Our company takes pride in making handmade brushes.
      Our toothbrushes are available in 4 different bristel types, from extra soft to hard.
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select type</span>

      <v-chip-group
        v-model="selection"
        selected-class="v-chip--selected v-chip--variant-flat"
        variant="outlined"
        mandatory
      >
        <v-chip text="Extra Soft"></v-chip>
        <v-chip text="Soft"></v-chip>
        <v-chip text="Medium"></v-chip>
        <v-chip text="Hard"></v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="secondary"
        text="Add to Cart"
        variant="flat"
        block
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selection = shallowRef(2)
</script>

<script>
  export default {
    data: () => ({
      selection: 2,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2226-48225&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
