<template>
  <v-card flat color="grey lighten-4 pa-5 text-xs-center">
    <h3 class="font-weight-medium grey--text text--darken-2">
      Patreon Sponsors
    </h3>

    <supporters-patrons
      :tier="[1, 2, 3]"
      class="mb-5"
      dense
      hide-titles
    />

    <h3 class="font-weight-medium grey--text text--darken-2 mb-5">
      Open Collective Sponsors
    </h3>

    <supporters-sponsor-btn
      append
      to="getting-started/sponsors-and-backers"
      large
    />
  </v-card>
</template>
