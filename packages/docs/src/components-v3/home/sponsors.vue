
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

<script lant="ts">
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { usePathify } from '@/utils/pathify'

  // Mixins
  // import Density from '@/mixins/density'

  export default defineComponent({
    name: 'HomeSponsors',

    // mixins: [Density],

    setup () {
      const { get } = usePathify()

      // data
      const byTier = get('sponsors/byTier')
      const sponsors = computed(() => {
        return Object.values(this.byTier)
          .reduce((tiers, tier) => tiers.concat(tier), [])
      })

      return {
        byTier,
        sponsors,
      }
    },

  })
</script>
