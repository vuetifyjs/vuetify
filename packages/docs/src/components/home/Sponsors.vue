
<template>
  <v-sheet
    v-if="sponsors.length"
    id="home-sponsors"
    class="mx-auto pa-3"
    color="transparent"
    max-width="700"
  >
    <v-responsive
      class="mb-12"
      min-height="500"
    >
      <v-row
        dense
        justify="center"
      >
        <v-col
          v-for="sponsor in sponsors"
          :key="sponsor.slug"
          :md="sponsor.metadata.tier > 1 ? 3 : 12"
          class="d-flex align-center justify-center"
          cols="auto"
        >
          <sponsor
            :comfortable="comfortable || Number(sponsor.metadata.tier) === 2"
            :compact="compact || Number(sponsor.metadata.tier) > 2"
            :sponsor="sponsor"
            v-bind="$attrs"
          />
        </v-col>
      </v-row>
    </v-responsive>

    <sponsor-link large />
  </v-sheet>
</template>

<script>
  // Mixins
  import Density from '@/mixins/density'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'HomeSponsors',

    mixins: [Density],

    computed: {
      byTier: get('sponsors/byTier'),
      sponsors () {
        return Object.values(this.byTier)
          .reduce((tiers, tier) => tiers.concat(tier), [])
      },
    },
  }
</script>

<style lang="sass">
  #home-sponsors
    .v-sponsors
      justify-content: space-between
</style>
