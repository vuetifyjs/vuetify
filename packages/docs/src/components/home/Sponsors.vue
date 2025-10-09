<template>
  <v-responsive class="pb-16">
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
        <div class="sponsor-marquee">
          <div class="sponsor-marquee-content">
            <div
              v-for="sponsor in sponsors"
              :key="sponsor.slug"
              class="sponsor-marquee-item"
            >
              <SponsorCard
                :comfortable="Number(sponsor.metadata.tier) === 2"
                :compact="Number(sponsor.metadata.tier) > 2"
                :sponsor="sponsor"
                v-bind="$attrs"
                :width="Number(sponsor.metadata.tier) > 1 && smAndDown ? 90 : undefined"
              />
            </div>
            <!-- Duplicate sponsors for seamless loop -->
            <div
              v-for="sponsor in sponsors"
              :key="`duplicate-${sponsor.slug}`"
              class="sponsor-marquee-item"
            >
              <SponsorCard
                :comfortable="Number(sponsor.metadata.tier) === 2"
                :compact="Number(sponsor.metadata.tier) > 2"
                :sponsor="sponsor"
                v-bind="$attrs"
                :width="Number(sponsor.metadata.tier) > 1 && smAndDown ? 90 : undefined"
              />
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-responsive>
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

<style scoped>
.sponsor-marquee {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
}

.sponsor-marquee::before,
.sponsor-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 2;
  pointer-events: none;
}

.sponsor-marquee::before {
  left: 0;
  background: linear-gradient(to right, rgb(var(--v-theme-background)), transparent);
}

.sponsor-marquee::after {
  right: 0;
  background: linear-gradient(to left, rgb(var(--v-theme-background)), transparent);
}

.sponsor-marquee-content {
  display: inline-flex;
  align-items: center;
  animation: scroll 100s linear infinite;
  gap: 2rem;
}

.sponsor-marquee-item {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes scroll {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
