<template>
  <v-row
    v-if="sponsors?.length"
    align="center"
    class="v-sponsors mb-0"
    justify="start"
  >
    <v-col
      v-for="sponsor in sponsors"
      :key="sponsor.slug"
      cols="auto"
    >
      <sponsor-card
        :comfortable="Number(tier) === 2"
        :compact="Number(tier) > 2"
        :sponsor="sponsor"
        v-bind="$attrs"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  // Components
  import SponsorCard from '@/components/sponsor/Card.vue'

  // Composables
  import { useSponsorsStore } from '@/store/sponsors'

  // Utilities
  import { computed } from 'vue'

  const props = defineProps({
    tier: {
      type: [Number, String],
      required: true,
    },
  })

  const sponsorStore = useSponsorsStore()

  const sponsors = computed(() => {
    return sponsorStore.byTier[props.tier]
  })
</script>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
