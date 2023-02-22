<template>
  <v-sheet
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
            :comfortable="Number(sponsor.metadata.tier) === 2"
            :compact="Number(sponsor.metadata.tier) > 2"
            :sponsor="sponsor"
            v-bind="$attrs"
          />
        </v-col>
      </v-row>
    </v-responsive>

    <sponsor-link size="large" />
  </v-sheet>
</template>

<script setup>
  // Components
  import SponsorCard from '@/components/sponsor/Card.vue'
  import SponsorLink from '@/components/sponsor/Link.vue'

  // Composables
  import { useSponsorsStore } from '@/store/sponsors'

  // Utilities
  import { computed } from 'vue'

  const sponsorStore = useSponsorsStore()

  const sponsors = computed(() => {
    return Object.values(sponsorStore.byTier)
      .reduce((tiers, tier) => {
        for (const sponsor of tier) {
          if (Number(sponsor.metadata.tier) < 0) continue

          tiers.push(sponsor)
        }

        return tiers
      }, [])
  })
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>
