<template>
  <v-row
    align="center"
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
        :comfortable="tier === 1"
        :compact="tier > 1"
        :sponsor="sponsor"
      />
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Sponsors',

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
