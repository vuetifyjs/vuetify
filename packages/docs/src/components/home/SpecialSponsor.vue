<template>
  <div v-if="specialSponsor" class="mb-8">
    <v-divider class="mx-auto" />

    <div class="d-flex align-center justify-center my-1 px-4">
      <small class="font-weight-bold me-4 text-no-wrap">Special Sponsor</small>

      <SponsorCard
        :slug="specialSponsor.slug"
        min-height="64"
        width="240"
      />
    </div>

    <v-divider class="mx-auto" />
  </div>
</template>

<script setup>
  const store = useSponsorsStore()

  const specialSponsor = computed(() => store.byTier[-2]?.[0])
</script>
