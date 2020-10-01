<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-title>
      <h2 class="display-1">
        Shirt Blouse
      </h2>
      <v-spacer></v-spacer>
      <span class="title">$44.50</span>
    </v-card-title>

    <v-card-text>
      Our blouses are available in 8 colors. You can custom order a built-in arch support for any of the models.
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select size</span>

      <v-chip-group
        v-model="selection"
        active-class="deep-purple--text text--accent-4"
        mandatory
      >
        <v-chip
          v-for="size in sizes"
          :key="size"
          :value="size"
        >
          {{ size }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        class="white--text"
        color="deep-purple accent-4"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

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
