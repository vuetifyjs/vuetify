<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      color="deep-purple-accent-4"
      dark
      flat
    >
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Filter results</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="text-h6 mb-2">
        Choose amenities
      </h2>

      <v-chip-group
        v-model="amenities"
        column
        multiple
      >
        <v-chip
          variant="outlined"
          filter
        >
          Elevator
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Washer / Dryer
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Fireplace
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Wheelchair access
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Dogs ok
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Cats ok
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="text-h6 mb-2">
        Choose neighborhoods
      </h2>

      <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip
          variant="outlined"
          filter
        >
          Snowy Rock Place
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Honeylane Circle
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Donna Drive
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Elaine Street
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Court Street
        </v-chip>
        <v-chip
          variant="outlined"
          filter
        >
          Kennedy Park
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const amenities = ref([1, 4])
  const neighborhoods = ref([1])
</script>

<script>
  export default {
    data: () => ({
      amenities: [1, 4],
      neighborhoods: [1],
    }),
  }
</script>
