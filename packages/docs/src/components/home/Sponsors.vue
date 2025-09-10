<template>
  <v-sheet
    id="home-sponsors"
    class="mx-auto pa-3"
    color="transparent"
    max-width="700"
  >
    <v-responsive min-height="500">
      <v-row
        density="comfortable"
        justify="center"
      >
        <v-col
          v-for="sponsor in sponsors"
          :key="sponsor.slug"
          class="d-flex align-center justify-center"
          cols="auto"
        >
          <SponsorCard
            :comfortable="Number(sponsor.metadata.tier) === 2"
            :compact="Number(sponsor.metadata.tier) > 2"
            :sponsor="sponsor"
            v-bind="$attrs"
            :width="Number(sponsor.metadata.tier) > 1 && smAndDown ? 90 : undefined"
          />
        </v-col>
      </v-row>
    </v-responsive>

    <br>
    <br>

    <SponsorLink append-icon="mdi-page-next" size="large" />
  </v-sheet>
</template>

<script setup>
  const { smAndDown } = useDisplay()
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
