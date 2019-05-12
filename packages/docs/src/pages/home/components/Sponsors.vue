<template>
  <v-card flat color="grey lighten-4 pa-5 text-xs-center">
    <h4 class="font-weight-medium grey--text">
      Premiere Sponsor
    </h4>

    <supporters-patrons
      :tier="[0]"
      class="mb-5"
      dense
      hide-titles
    />

    <h4 class="font-weight-medium grey--text">
      Patreon Sponsors
    </h4>

    <supporters-patrons
      :tier="[1, 2, 3]"
      class="mb-5"
      dense
      hide-titles
    />

    <h4 class="font-weight-medium grey--text mb-5">
      Open Collective Sponsors
    </h4>

    <supporters-sponsor-btn
      append
      to="getting-started/sponsors-and-backers"
      large
    />
  </v-card>
</template>
