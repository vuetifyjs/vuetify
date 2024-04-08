<template>
  <PromotedBase
    v-if="ad"
    class="v-vuetify"
    density="comfortable"
    border
  >
    <v-list-item
      :append-icon="smAndUp ? 'mdi-open-in-new' : undefined"
      :prepend-avatar="src"
      :title="ad.title"
      style="min-height: inherit; width: 100%"
      v-bind="attrs"
    >
      <template #subtitle>
        <AppMarkdown
          v-if="description"
          :content="description"
          class="text-caption"
        />
      </template>
    </v-list-item>
  </PromotedBase>
</template>

<script setup>
  const props = defineProps({
    color: String,

    ...createAdProps(),
  })

  const { ad, attrs, src, description } = useAd(props)
  const { smAndUp } = useDisplay()
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
