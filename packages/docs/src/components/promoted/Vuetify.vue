<template>
  <promoted-base
    class="v-vuetify mb-4"
    border
    density="comfortable"
  >
    <v-list-item
      v-if="ad"
      class="rounded px-2"
      style="min-height: inherit; width: 100%"
      v-bind="attrs"
      :prepend-avatar="src"
      :title="ad.title"
    >
      <template #subtitle>
        <app-markdown
          v-if="description"
          class="text-caption text-high-emphasis"
          :content="description"
        />
      </template>
    </v-list-item>
  </promoted-base>
</template>

<script setup>
  // Components
  import PromotedBase from './Base.vue'

  // Composables
  import { createAdProps, useAd } from '@/composables/ad'

  const props = defineProps({
    color: String,

    ...createAdProps(),
  })

  const { ad, attrs, src, description } = useAd(props)
</script>

<style lang="sass">
  .v-vuetify
    .powered-by
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      text-transform: uppercase

    &.theme--dark .powered-by
      color: inherit
</style>
