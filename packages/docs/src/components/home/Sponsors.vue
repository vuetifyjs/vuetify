<template>
  <v-responsive class="pb-16">
    <HomeBgGradient />

    <v-container class="pt-10">
      <v-icon class="mb-5" color="red-lighten-2" size="60">
        mdi-heart-outline
      </v-icon>

      <h4 class="text-h4 font-weight-bold mb-5">
        Sponsors & Backers
      </h4>

      <v-responsive class="mx-auto my-5" max-width="700">
        <h6 class="text-h6 font-weight-regular text-medium-emphasis">
          Vuetify is proudly supported by these amazing companies and individuals. If you'd
          like to join them, please consider sponsoring Vuetify's development.
        </h6>
      </v-responsive>

      <v-btn
        class="text-none"
        color="primary"
        prepend-icon="mdi-heart-outline"
        rounded="lg"
        size="large"
        text="Become a Sponsor"
        flat
      />

      <div class="mt-16">
        <HomeMarquee :items="sponsors">
          <template #default="{ item }">
            <SponsorCard
              :comfortable="Number(item.metadata.tier) === 2"
              :compact="Number(item.metadata.tier) > 2"
              :sponsor="item"
              v-bind="$attrs"
              :width="Number(item.metadata.tier) > 1 && smAndDown ? 90 : undefined"
            />
          </template>
        </HomeMarquee>
      </div>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
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
