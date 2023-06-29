<template>
  <v-divider class="mx-auto" />

  <div class="d-flex align-center justify-center my-1 px-4">
    <small class="font-weight-bold me-4 text-no-wrap">Special Sponsor</small>

    <sponsor-card
      min-height="64"
      slug="teamwork"
      width="240"
    />
  </div>

  <v-divider class="mx-auto" />
</template>

<script setup>
  import SponsorCard from '@/components/sponsor/Card.vue'
</script>
