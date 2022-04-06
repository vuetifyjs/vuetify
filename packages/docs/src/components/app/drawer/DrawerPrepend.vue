<template>
  <div class="pt-2 px-2">
    <app-caption
      class="ml-2"
      path="premiere-sponsors"
    />

    <sponsor-card
      v-for="sponsor of sponsors"
      :key="sponsor.slug"
      :sponsor="sponsor"
      class="mb-n2"
      width="146"
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
        sponsors: computed(() => {
          return store.sponsors
            .filter(sponsor => sponsor.metadata.tier <= 0)
            .sort((a, b) => {
              const aTier = a.metadata.tier
              const bTier = b.metadata.tier

              return aTier === bTier ? 0 : aTier > bTier ? 1 : -1
            })
        }),
      }
    },
  })
</script>
