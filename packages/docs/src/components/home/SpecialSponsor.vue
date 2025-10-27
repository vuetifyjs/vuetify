<template>
  <v-responsive v-if="specialSponsor">
    <v-divider :opacity="isDark ? 0.2 : 0.1" color="primary" />

    <HomeBgGradient
      :opacity-class="isDark ? 'opacity-40' : 'opacity-20'"
      color="primary"
    />

    <div class="d-flex align-center justify-center my-1 px-4">
      <small class="font-weight-bold text-no-wrap">Special Sponsor</small>

      <SponsorCard
        :slug="specialSponsor.slug"
        min-height="64"
        width="200"
      />
    </div>

    <v-divider :opacity="isDark ? 0.2 : 0.1" color="primary" />
  </v-responsive>
</template>

<script setup>
  const theme = useTheme()
  const store = useSponsorsStore()

  const isDark = computed(() => theme.current.value.dark)
  const specialSponsor = computed(() => store.byTier[-2]?.[0])
</script>
