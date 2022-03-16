<template>
  <div class="pt-3 px-2">
    <app-caption
      class="ml-2 mb-2"
      path="premiere-sponsors"
    />

    <sponsor-card
      v-for="sponsor of sponsors"
      :key="sponsor.slug"
      :sponsor="sponsor"
      width="164"
      max-height="48"
    />
  </div>
</template>

<script lang="ts">
  // Components
  import SponsorCard from '@/components/sponsor/Card.vue'

  // Store
  import { useSponsorsStore } from '@/store/sponsors'

  // Utilities
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppDrawerPrepend',

    components: { SponsorCard },

    setup () {
      const store = useSponsorsStore()

      return {
        sponsors: computed(() => store.sponsors.filter(sponsor => sponsor.metadata.tier === 0)),
      }
    },
  })
</script>
