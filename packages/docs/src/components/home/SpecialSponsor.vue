<template>
  <v-responsive v-if="specialSponsor">
    <v-divider color="primary" />

    <HomeCommonGradient
      :opacity-class="isDark ? 'opacity-40' : 'opacity-20'"
      color="primary"
    />

    <div class="d-flex align-center justify-center my-1 px-4">
      <small class="font-weight-bold text-no-wrap">{{ t('home.special-sponsor') }}</small>

      <SponsorCard
        :slug="specialSponsor.slug"
        min-height="64"
        width="200"
      />
    </div>

    <v-divider color="primary" />
  </v-responsive>
</template>

<script setup>
  const { t } = useI18n()
  const theme = useTheme()
  const store = useSponsorsStore()

  const isDark = computed(() => theme.current.value.dark)
  const specialSponsor = computed(() => store.byTier[-2]?.[0])
</script>
