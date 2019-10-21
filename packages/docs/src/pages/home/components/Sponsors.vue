<template>
  <v-card
    flat
    color="grey lighten-4"
    class="pa-12 text-center"
  >
    <h3 class="font-weight-medium grey--text text--darken-2">
      Project Sponsors
    </h3>

    <supporters-sponsors
      :tier="[0, 1, 2, 3]"
      class="mb-12"
      dense
      hide-titles
    />

    <h3 class="font-weight-medium grey--text text--darken-2 mb-12">
      Open Collective Sponsors
    </h3>

    <supporters-sponsor-btn
      append
      to="getting-started/sponsors-and-backers"
      large
    />
  </v-card>
</template>
