<template>
  <v-responsive class="pb-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <HomeCommonGradient opacity-class="opacity-40" position="center" />

    <v-container class="pt-10">

      <HomeCommonTitle
        :description="t('home.sponsors.description')"
        :title="t('home.sponsors.title')"
        class="mb-9"
      >
        <template #subtitle>
          <v-icon
            class="mb-5"
            color="red-lighten-2"
            icon="mdi-heart-outline"
            size="60"
          />
        </template>
      </HomeCommonTitle>

      <v-responsive class="mx-auto" max-width="800">
        <v-row
          class="justify-center"
          density="comfortable"
        >
          <v-col
            v-for="sponsor in sponsors"
            :key="sponsor.slug"
            class="d-flex align-center justify-center ma-1"
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

      <v-hover v-slot="{ props: hoverProps, isHovering }">
        <v-btn
          v-bind="hoverProps"
          :append-icon="isHovering ? 'mdi-heart' : 'mdi-heart-outline'"
          :text="t('home.sponsors.become-sponsor')"
          class="text-none mt-9"
          color="primary"
          rounded="lg"
          size="large"
          flat
        />
      </v-hover>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const { t } = useI18n()
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
