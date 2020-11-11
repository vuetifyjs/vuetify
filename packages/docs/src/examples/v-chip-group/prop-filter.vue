<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      flat
      color="deep-purple accent-4"
      dark
    >
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Filter results</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="title mb-2">
        Choose amenities
      </h2>

      <v-chip-group
        v-model="amenities"
        column
        multiple
      >
        <v-chip
          filter
          outlined
        >
          Elevator
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Washer / Dryer
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Fireplace
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Wheelchair access
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Dogs ok
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Cats ok
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-text>
      <h2 class="title mb-2">
        Choose neighborhoods
      </h2>

      <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip
          filter
          outlined
        >
          Snowy Rock Place
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Honeylane Circle
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Donna Drive
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Elaine Street
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Court Street
        </v-chip>
        <v-chip
          filter
          outlined
        >
          Kennedy Park
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      amenities: [1, 4],
      neighborhoods: [1],
    }),
  }
</script>
