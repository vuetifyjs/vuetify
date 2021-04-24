<template>
  <v-row
    v-if="sponsors"
    align="center"
    class="v-sponsors"
    dense
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-col
      v-for="sponsor in sponsors"
      :key="sponsor.slug"
      cols="auto"
    >
      <sponsor
        :comfortable="comfortable || Number(tier) === 2"
        :compact="compact || Number(tier) > 2"
        :sponsor="sponsor"
        v-bind="$attrs"
      />
    </v-col>
  </v-row>
</template>

<script>
  // Mixins
  import Density from '@/mixins/density'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Sponsors',

    mixins: [Density],

    props: {
      max: Number,
      tier: [Number, String],
    },

    computed: {
      byTier: get('sponsors/byTier'),
      sponsors () {
        return this.byTier[this.tier]
      },
    },
  }
</script>
