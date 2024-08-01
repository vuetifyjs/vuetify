<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar color="deep-purple-accent-4">
      <v-btn icon="i-mdi:close"></v-btn>

      <v-toolbar-title>Filter results</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="text-h6 mb-2">Choose amenities</h2>

      <v-chip-group
        v-model="amenities"
        column
        multiple
      >
        <v-chip
          text="Elevator"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Washer / Dryer"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Fireplace"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Wheelchair access"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Dogs ok"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Cats ok"
          variant="outlined"
          filter
        ></v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="text-h6 mb-2">Choose neighborhoods</h2>

      <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip
          text="Snowy Rock Place"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Honeylane Circle"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Donna Drive"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Elaine Street"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Court Street"
          variant="outlined"
          filter
        ></v-chip>

        <v-chip
          text="Kennedy Park"
          variant="outlined"
          filter
        ></v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const amenities = shallowRef([1, 4])
  const neighborhoods = shallowRef([1])
</script>

<script>
  export default {
    data: () => ({
      amenities: [1, 4],
      neighborhoods: [1],
    }),
  }
</script>
