<template>
  <v-card flat color="grey lighten-4 pa-5 text-xs-center">
    <v-subtitle-1 class="title font-weight-regular">
      Patreon Sponsors
    </v-subtitle-1>

    <supporters-patrons
      :tier="3"
      dense
      hide-titles
    />

    <v-subtitle-1 class="title font-weight-regular mb-5">
      Open Collective Sponsors
    </v-subtitle-1>

    <sponsor-btn
      append
      to="getting-started/sponsors-and-backers"
      large
      round
    />
  </v-card>
</template>

<script>
  // Utilities
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters('app', ['supporters']),
      tiers () {
        return [
          {
            name: 'Diamond',
            supporters: [...this.supporters.diamond]
          },
          {
            name: 'Palladium',
            supporters: [...this.supporters.palladium]
          },
          {
            name: 'Special',
            supporters: [...this.supporters.special]
          }
        ]
      }
    }
  }
</script>
