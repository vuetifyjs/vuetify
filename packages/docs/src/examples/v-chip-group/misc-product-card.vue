<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-title class="d-flex">
      <h2 class="text-h4">Shirt Blouse</h2>

      <v-spacer></v-spacer>

      <span class="text-h6">$44.50</span>
    </v-card-title>

    <v-card-text>
      Our blouses are available in 8 colors. You can custom order a built-in arch support for any of the models.
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select size</span>

      <v-chip-group
        v-model="selection"
        selected-class="text-deep-purple-accent-4"
        mandatory
      >
        <v-chip
          v-for="size in sizes"
          :key="size"
          :text="size"
          :value="size"
          variant="outlined"
        ></v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple-accent-4"
        text="Add to Cart"
        variant="flat"
        block
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const sizes = [
    '04',
    '06',
    '08',
    '10',
    '12',
    '14',
  ]

  const selection = ref('08')
</script>

<script>
  export default {
    data: () => ({
      selection: '08',
      sizes: [
        '04', '06', '08', '10', '12', '14',
      ],
    }),
  }
</script>
