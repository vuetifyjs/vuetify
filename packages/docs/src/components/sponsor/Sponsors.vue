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
      <SponsorCard
        :comfortable="Number(tier) === 2"
        :compact="Number(tier) > 2"
        :sponsor="sponsor"
        v-bind="$attrs"
      />
    </v-col>
  </v-row>

  <div v-else class="mb-4">
    <AppBtn
      append-icon="mdi-open-in-new"
      href="https://github.com/sponsors/johnleider"
      rel="noopener"
      target="_blank"
      text="become-a-sponsor"
      border
    />
  </div>
</template>

<script setup lang="ts">
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
