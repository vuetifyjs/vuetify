<template>
  <div v-if="ad" class="mb-5">
    <a
      v-if="hasPromoted"
      class="d-block"
      style="max-width: 640px;"
      v-bind="attrs"
      @click="onClick"
    >
      <PromotedBase
        v-bind="$attrs"
        class="v-vuetify--promoted"
        density="compact"
        max-width="640"
        outlined
      >
        <v-img
          :src="background"
          class="flex-1-1-auto rounded"
          max-height="56"
          cover
        >
          <div class="d-flex align-center fill-height pe-3">
            <v-img
              :alt="`Link to ${ad.title}`"
              :src="logo"
              class="mx-1 mx-md-2"
              height="56"
              max-width="56"
              contain
            />

            <AppMarkdown
              v-if="description"
              :content="description"
              class="text-subtitle-2 text-sm-h6 font-weight-light text-white"
            />
          </div>
        </v-img>
      </PromotedBase>
    </a>

    <PromotedVuetify v-else />
  </div>
</template>

<script setup>
  const props = defineProps({
    ...createAdProps(),

    medium: {
      type: String,
      default: 'promoted',
    },
  })

  const { ad, attrs } = useAd(props)
  const { event } = useGtag()
  const { name } = useRoute()

  const background = computed(() => ad.value?.metadata?.images?.background?.url)
  const hasPromoted = computed(() => {
    return (
      ad.value?.metadata?.description_short &&
      background.value
    )
  })

  const description = computed(() => ad.value?.metadata?.description_short || ad.value?.metadata?.description)
  const logo = computed(() => {
    if (props.medium === 'promoted') {
      return ad.value?.metadata?.images?.preview?.url || ad.value?.metadata?.images?.logo?.url
    }

    return ad.value?.metadata?.images?.logo?.url
  })

  function onClick () {
    const slug = ad.value?.slug

    if (!slug) return

    event('click', {
      event_category: 'promoted',
      event_label: slug,
      value: name?.toString().toLowerCase(),
    })
  }
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-vuetify--promoted
    p
      line-height: 1.1

    .v-markdown p strong
      font-weight: 700
</style>
