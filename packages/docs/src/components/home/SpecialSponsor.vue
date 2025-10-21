<template>
  <div v-if="specialSponsor">
    <div class="d-flex align-center justify-center my-1 px-4">
      <small class="font-weight-bold text-no-wrap">Special Sponsor</small>

      <SponsorCard
        :slug="specialSponsor.slug"
        min-height="64"
        width="200"
      />
    </div>
  </div>
</template>

<script setup>
  const store = useSponsorsStore()

  const specialSponsor = computed(() => store.byTier[-2]?.[0])
</script>
