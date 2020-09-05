
<template>
  <v-sheet
    id="home-sponsors"
    class="mx-auto"
    max-width="700"
  >
    <v-row
      dense
      justify="center"
    >
      <v-col
        v-for="sponsor in sponsors"
        :key="sponsor.slug"
        cols="auto"
        md="3"
      >
        <sponsor
          :comfortable="comfortable || Number(sponsor.metadata.tier) === 2"
          :compact="compact || Number(sponsor.metadata.tier) > 2"
          :sponsor="sponsor"
          v-bind="$attrs"
        />
      </v-col>
    </v-row>
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
      tiers () {
        return this.$vuetify.breakpoint.smAndUp
          ? [1, 2, 3, 4, 5]
          : [1, 2, 3]
      },
    },
  }
</script>

<style lang="sass">
  #home-sponsors
    .v-sponsors
      justify-content: space-between
</style>
