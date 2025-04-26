<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-title class="d-flex">
      <h2 class="text-h4">Toothbrush</h2>

      <v-spacer></v-spacer>

      <span class="text-h6">$4.99</span>
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
        variant="flat"
        mandatory
      >
        <v-chip text="Extra Soft" border></v-chip>
        <v-chip text="Soft" border></v-chip>
        <v-chip text="Medium" border></v-chip>
        <v-chip text="Hard" border></v-chip>
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
