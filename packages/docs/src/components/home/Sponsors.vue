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
          :md="sponsor.metadata.tier > 1 ? 3 : 5"
          class="d-flex align-center justify-center"
          cols="auto"
        >
          <sponsor-card
            :comfortable="sponsor.metadata.tier === 2"
            :compact="sponsor.metadata.tier > 2"
            :sponsor="sponsor"
            v-bind="$attrs"
          />
        </v-col>
      </v-row>
    </v-responsive>

    <sponsor-link size="large" />
  </v-sheet>
</template>

<script lang="ts">
  // Utilities
  import { computed, defineComponent, onBeforeMount } from 'vue'
  import { useSponsorsStore } from '../../store/sponsors'

  import SponsorCard from '@/components/sponsor/Card.vue'
  import SponsorLink from '@/components/sponsor/Link.vue'

  export default defineComponent({
    name: 'Sponsors',

    components: {
      SponsorCard,
      SponsorLink,
    },

    setup () {
      const sponsorStore = useSponsorsStore()

      onBeforeMount(async () => sponsorStore.load())

      const sponsors = computed(() => {
        return Object.values(sponsorStore.byTier)
          .reduce((tiers, tier) => tiers.concat(tier), [] as any[])
      })

      return {
        sponsors,
      }
    },

  })
</script>
