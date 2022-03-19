<template>
  <v-row
    v-if="sponsors.length"
    align="center"
    class="v-sponsors"
    justify="start"
  >
    <v-col
      v-for="sponsor in sponsors"
      :key="sponsor.slug"
      cols="auto"
    >
      <sponsor-card
        :comfortable="Number() === 2"
        :compact="Number(tier) > 2"
        :sponsor="sponsor"
        v-bind="$attrs"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  // Utilities
  import { computed, defineComponent, onBeforeMount } from 'vue'
  import { useSponsorsStore } from '../../store/sponsors'

  import SponsorCard from '@/components/sponsor/Card.vue'

  export default defineComponent({
    name: 'Sponsors',

    components: {
      SponsorCard,
    },

    props: {
      tier: {
        type: [Number, String],
        required: true,
      },
    },

    setup (props) {
      const sponsorStore = useSponsorsStore()

      onBeforeMount(async () => sponsorStore.load())

      const sponsors = computed(() => {
        return sponsorStore.byTier[props.tier]
      })

      return {
        sponsors,
      }
    },
  })
</script>
