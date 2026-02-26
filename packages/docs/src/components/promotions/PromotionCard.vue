<template>
  <PromotedBase
    v-if="promotion"
    class="v-promotion-card"
    max-width="360"
    border
  >
    <a
      :href="promotion.metadata.url"
      class="d-inline-block text-medium-emphasis"
      rel="noopener"
      target="_blank"
    >
      <v-container class="pa-2">
        <v-row density="comfortable">
          <v-col cols="auto">
            <v-img
              :src="promotion.metadata.images.default.url"
              class="rounded-s"
              width="130"
            />
          </v-col>

          <v-col>
            <div class="px-2">
              <AppMarkdown :content="promotion.metadata.text" />
            </div>
          </v-col>
        </v-row>
      </v-container>

      <span class="v-promotion-card__via text-medium-emphasis">
        ADS VIA VUETIFY
      </span>
    </a>
  </PromotedBase>
</template>

<script setup>
  const props = defineProps({
    color: String,
    slug: String,
  })

  const store = usePromotionsStore()

  const promotions = computed(() => {
    return store.promotions.filter(promotion => promotion.metadata?.discoverable)
  })

  const promotion = computed(() => {
    if (props.slug) return store.promotions?.find(ad => ad.slug === props.slug)

    return promotions.value[Math.floor(Math.random() * promotions.value.length)]
  })
</script>

<style lang="sass">
  .v-promotion-card
    font-size: 0.75rem
    position: relative

    &__via
      position: absolute
      display: inline-block
      bottom: .5rem
      right: .5rem
      font-size: 0.625rem
      letter-spacing: 0.09375rem
      font-weight: 400
</style>
